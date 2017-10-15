'use strict'

var async = require("async");
var AWS = require("aws-sdk");
var http = require("http");
var CryptoJS = require('crypto-js');
require("string_format");

var lambda = new AWS.Lambda({"region": "us-east-1"});
var s3 = new AWS.S3({"region":"us-east-1"});
var s3BucketName = "mannpe-comic-bucket"
var PUBLIC_KEY = "d1564853e3dc86f867683dd4aa487b0f";
var PRIV_KEY = "970b013dcecd64caf7eb14383d377d3fb2ea02c3";
var ts = new Date().getTime();
var HASH = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
var getComicsTemplateUrl = "http://gateway.marvel.com/v1/public/characters/{0}/comics?limit=100&ts={1}&apikey={2}&hash={3}";
var comicTotal;


module.exports.get = (event, context, callback) => {
    //console.log("Log de la clase " + ts);

    if(event.queryStringParameters!=null){
        event.firstCharacterId =event.queryStringParameters.firstCharacterId;
        
        event.secondCharacterId=event.queryStringParameters.secondCharacterId;
    }

    console.log("PARAMS:");
    console.log(event);
    checkIfExistsInS3(event.firstCharacterId,event.secondCharacterId, function(err, data){
        if(data){
            console.log("I'm done");
            var results = {};
            results["results"]=data;
            const response = {
                statusCode: 200,
                body: results
            }
            console.log(results);
            callback(null, results);
            return;
        }
        else{
            console.log("do the rest")
            var firstCharacterGetComicsUrl = getComicsTemplateUrl.format(event.firstCharacterId, ts, PUBLIC_KEY, HASH);
            var secondCharacterGetComicsUrl = getComicsTemplateUrl.format(event.secondCharacterId, ts, PUBLIC_KEY, HASH);
            var firstCharacterComics = [];
            var secondCharacterComics = [];
        
            async.parallel([
                function(callback){
                    async.waterfall([
                            async.apply(getCharacterDataSimple, firstCharacterGetComicsUrl),
                            async.apply(invokeLambdas, event.firstCharacterId)
                        ]
                        , function(error, results){
                            if(error){
                                console.log(error);
                            }
                            else{
                                callback(null, results);
                            }
                        })
                },
                 function(callback){
                    async.waterfall([
                            async.apply(getCharacterDataSimple, secondCharacterGetComicsUrl),
                            async.apply(invokeLambdas, event.secondCharacterId)   
                        ]
                        , function(error, results){
                            if(error){
                                console.log(error);
                            }
                            else{
                                callback(null, results);
                            }
                        })
                }
                ], function(error, data){
                    if(error){
                        callback(error);
                    }
                    else{
                        
                        var result = intersect(data[0], data[1]);
                        var newS3Object = JSON.stringify(result);
                        addToS3(newS3Object, event.firstCharacterId, event.secondCharacterId);
                        
                        var results = {};
                        results["results"]=result;
                        const response = {
                            statusCode: 200,
                            body: results
                        }
                        console.log(results);

                        callback(null, results);
                    }
                    
            });
        }
    });
    
    
}

var getCharacterDataSimple = function(getUrl, callback){
    
    http.get(getUrl, (res) => {
        res.setEncoding('utf8'); 
        var totalData = "";

        res.on("data", (data) => {  
            totalData += data;  
        });

        res.on("end", (data) => {   
            var comics = JSON.parse(totalData);
            if(comics["data"]){
                comicTotal = comics["data"]["total"];
                //console.log(comics["data"])
            };

            callback(null, comicTotal);
        });
    });
};

var invokeLambdas = function(characterId, comicCount, callback){
    var lambdaCount = Math.ceil(comicCount / 100);
    var tasks = [];
    var comics = [];
    var offset;
    for(var index = 0; index < lambdaCount; index++ ){ 
        let lambdaParams = {
                FunctionName: 'mannpe-service-dev-ComicSingle',
                InvocationType: 'RequestResponse',
                Payload: '{ "characterId": "' + characterId + '", "offset": "' + (index*100).toString() + '", "max": "' + comicTotal + '"}'
            };
        tasks.push(function(callback){
            lambda.invoke(lambdaParams, function(error, data){
                if(error){
                    console.log(error);
                    callback(error);
                }
                else{
                    callback(null, data);
                }
            });
        });
    };

    async.parallel(tasks, function(error, data){ 
        if(error){
            console.log(error);
        }
        else{
            for(var index = 0 ; index < data.length ; index++){
                var dataParsed = JSON.parse(data[index].Payload)
                comics = comics.concat(dataParsed);
            };
            callback(null, comics);
        }
    });
};

function intersect(a, b) {
  var setA = new Set(a);
  var setB = new Set(b);
  var intersection = new Set([...setA].filter(x => setB.has(x)));
  //console.log(intersection);
  var result =  Array.from(intersection);
  return result;
}

function checkIfExistsInS3(id1,id2, callback){
    var filename = id1+"_"+id2+".json";
    if(id2<id1){
        filename=id2+"_"+id1+".json";
    }
    const params = { 
        Bucket: s3BucketName, 
        Key: `${filename}`, 
    };
    s3.getObject(params, function(err, data) {
        if (err){
            console.log("whateves just go on");
            callback(null, null);
            //console.log(err, err.stack); // an error occurred
        } 
        else   {
            console.log("Just return the data");
            var fileData = JSON.parse(data.Body.toString('utf-8'));
            callback(null, fileData)
        } 
      });
}


function addToS3(toAddObject, id1, id2){
    var filename = id1+"_"+id2+".json";
    if(id2<id1){
        filename=id2+"_"+id1+".json";
    }

    const params = { 
        Bucket: s3BucketName, 
        Key: `${filename}`, 
        ACL: 'public-read',
        Body:toAddObject
    };
	s3.putObject(params, function (err, data) {
		if (err) {
	    	console.log("Error uploading : ", err);
	    } else {
	    	console.log("Successfully uploaded comics comparison on S3", data);
	    }
	})  
}