var http = require("http");

function main(){
  //var url = "http://comicvine.gamespot.com/api/characters/?api_key=3500994b89773681c6f41564eb101166f41caa34&format=json&field_list=id,name,api_detail_url&filter=name:"+event.name;
  var url= "http://demo5292390.mockable.io/getDCBat";
  http.get(url, (res) =>{
    res.setEncoding('utf8');
  var output="";
  res.on("data",(data) => {
    output+=data;

})
  res.on('end', function() {
    var obj = JSON.parse(output);
    callback(null, obj);
  });
});

}

main();
