
//First you have to load the sdk package into our application. This provides us support for all current services.
  var AWS = require('aws-sdk');

//now you can create service objects like so (Eample of creating a S3 service object):
var s3 = new AWS.S3();

//this is the information we need to download info
var params={
  Bucket: 'cc414-images',
  Key:'scientist.png'
};


s3.getObject(params,function(err,data){// this command gets information about the object with the key that matches the one specified in params
  console.log("Fetching data on: "+params.Key);
  if(err)console.log(err);
  else {

    if(data.Metadata.move){ // this is the same as the key mentioned in the question
      params.Key = '23408/scientist.png'; // we change the key name in order to prepare it to upload
      s3.putObject(params, function(err, data){
        if(err) console.log(err);
        else{
          console.log("upload succesful", data);
        }
      });
    }
  }
});
