
//First you have to load the sdk package into our application. This provides us support for all current services.
var AWS = require('aws-sdk');


//now you can create service objects like so (Eample of creating a S3 service object):
var s3 = new AWS.S3();

//after you create a service object you're ready to use it with one of the aws documented operations, like so:

s3.listBuckets(function(err,data){// this command lists us the buckets we own
  if(err)console.log(err); // if theres an error: log the error
  else console.log(data); // if theres no error: show us tour list buckets data
});
