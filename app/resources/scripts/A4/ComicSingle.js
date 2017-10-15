'use strict'

var async = require("async");
var AWS = require("aws-sdk");
var http = require("http");
var CryptoJS = require('crypto-js');
require("string_format");

var lambda = new AWS.Lambda({"region": "us-east-1"});
var PUBLIC_KEY = "d1564853e3dc86f867683dd4aa487b0f";
var PRIV_KEY = "970b013dcecd64caf7eb14383d377d3fb2ea02c3";
var ts = new Date().getTime();
var HASH = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
var getComicsTemplateUrl = "http://gateway.marvel.com/v1/public/characters/{0}/comics?limit=100&offset={1}&ts={2}&apikey={3}&hash={4}";

module.exports.get = (event, context, callback) => {
    var getComicsUrl = getComicsTemplateUrl.format(event.characterId, event.offset, ts, PUBLIC_KEY, HASH);
    var comicTotal = event.max;
    var comicTitles = [];

    http.get(getComicsUrl, (res) => {
            res.setEncoding('utf8'); 
            var totalData = "";

            res.on("data", (data) => { 
                totalData += data; 
            });
            res.on("end", (data) => {   
                var comics = JSON.parse(totalData);
                
                comics["data"]["results"].map(
                    function(evt){    
                        comicTitles.push(evt.title);
                });
                if(comicTitles.length == comics["data"]["count"]){
                    callback(null, comicTitles);
                };            
                
            });
        });
};

