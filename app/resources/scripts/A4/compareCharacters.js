
var http = require('http');
var dictionary={};
var Vdictionary={};
var doubles = [];
var Vdoubles = [];
var counter=0;
var Vcounter=0;
var finalMessage={};
function main(){

  //callback(null, 'Hello from Lambda');
  var url1="http://demo5292390.mockable.io/character/deadpool"
  var url2="http://demo5292390.mockable.io/character/batroc"

  function getCharacter(url){
    http.get(url, (res) =>{
      res.setEncoding('utf8');
    var output="";
    res.on("data",(data) => {
      output+=data;

  })
    res.on('end', function() {
      var obj = JSON.parse(output);
      obj=obj.results;
      //console.log(obj);
      compareEnemies(obj);
      compareVolumes(obj);

    });
  });
  }


  function compareVolumes(obj){
    for(var i=0;i<obj.volume_credits.length;i++){
      Vdictionary[obj.volume_credits[i].id] ==null?
        Vdictionary[obj.volume_credits[i].id] = obj.volume_credits[i].name :
        Vdoubles.push({name:obj.volume_credits[i].name, id:obj.volume_credits[i].id});
    }
    Vcounter++;
    if(Vcounter==2)
    {
      finalMessage.volumes=Vdoubles;
      //console.log(Vdoubles);
      if(Vcounter==2)
        console.log(finalMessage);

    }
  }

  function compareEnemies(obj){
    for(var i=0;i<obj.character_enemies.length;i++){
      dictionary[obj.character_enemies[i].id] ==null?
        dictionary[obj.character_enemies[i].id] = obj.character_enemies[i].name :
        doubles.push(obj.character_enemies[i].name);
    }
    counter++;
    if(counter==2)
    {
      finalMessage.enemies=doubles;
      if(Vcounter==2)
        console.log(finalMessage);
    }
  }


  getCharacter(url1);

  getCharacter(url2);

};



main();
