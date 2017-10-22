var AWS=  require('aws-sdk')
var dynamodb = new AWS.DynamoDB({"region":"us-east-1"})
var cloudWatch = new AWS.CloudWatchLogs({"region":"us-east-1"})
var Guid = require('guid');

module.exports.get = (event, context, callback) => {
    console.log("originalInfo");
    console.log(event);
    setTimeout(function(){writeToDynamo(event.id1, event.id2, event.lambdaTotal, event.streamName, event.isSeries)}, 5000);//Para que los logs si se actualizen
    
}



var cloudWatchInfo = function(lambdaStream, isSeries, callback){
    var params = { 
        logGroupName: '/aws/lambda/mannpe-service-dev-SeriesManager', 
        filterPattern: 'REPORT', 
        interleaved: true 
      }; 
      if(!isSeries){
          params.logGroupName = '/aws/lambda/mannpe-service-dev-ComicManager';
      }
    
      cloudWatch.filterLogEvents(params, function(err, data) { 
        if (err) console.log(err, err.stack); 
        else { 
          let logStreams = data.events;    
          var latestLogInfo = ("latestLog\n", data.events[data.events.length-1]);
          var latestLog = data.events[data.events.length-1].message;
          
          var memIndex  = latestLog.indexOf("ze:")+3;
          var memIndexend = latestLog.indexOf('MB', memIndex);
          var logMem = latestLog.substring(memIndex, memIndexend );
          var logResIndex = latestLog.indexOf("ed:")+3;
          var logresend = latestLog.indexOf('MB', logResIndex);
          var logUsed = latestLog.substring(logResIndex, logresend);
         var durationIndex = latestLog.indexOf("on:")+3;
         var durationIndexEnd = latestLog.indexOf('ms', durationIndex);
         var duration = latestLog.substring(durationIndex, durationIndexEnd);
         var startTime = -Number(duration)*100 + latestLogInfo.timestamp;
          console.log(logMem);
          
          //console.log(logStreams)
          callback ({"Max":logMem, "Used":logUsed,"Start":startTime,  "End":latestLogInfo.timestamp}); 
        } 
      }); 

}

function writeToDynamo(id1, id2, lambdaTotal, streamName, isSeries){
    console.log("LOG STREAM:", streamName)
    cloudWatchInfo(streamName, isSeries, function(response){
        var dynamoEntry = { 
            'Id': {S:'Series-'+Guid.create().value}, 
            'StartTime': {S: ""+response.Start}, 
            'EndTime': {S: ""+response.End},
            'SingleQuantity': {N: lambdaTotal+""}, 
            'Character1': {N: id1}, 
            'Character2': {N: id2}, 
            'MemoryReserved':{S:response.Max+""},
            'MemoryUsed':{S: response.Used+""}
            }; 
            console.log(dynamoEntry)
            var params = { 
                TableName: 'mann-marvel-log', 
                Item: dynamoEntry
            }
        
            dynamodb.putItem(params, function(err, data) { 
                if (err){
                    console.log("error with dynamo")
                    console.log(err); 
                }
        
                else{
                    console.log("successWithDynamo")
                    console.log(data); 
                }
        
            });
    })
  
}
