
//First you have to load the sdk package into our application. This provides us support for all current services.
  var AWS = require('aws-sdk');

//now you can create service objects like so (Eample of creating a S3 service object):
var s3 = new AWS.S3();


var params={
  Bucket: 'cc414-images',
  Key:'scientist.png'
};


s3.getObject(params,function(err,data){// this command gets information about the object with the key that matches the one specified in params
  console.log("Fetching data on: "+params.Key);
  if(err)console.log(err); // if theres an error: log the error
  else {
    //console.log(data); // if theres no error: show us tour list buckets data
    if(data.Metadata.move){
      params.Key = '23408/scientist.png';
      s3.putObject(params, function(err, data){
        if(err) console.log(err);
        else{
          console.log("upload succesful", data);
        }
      });
    }
    console.log("Last modification: ");
  }
});
