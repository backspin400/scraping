var request = require('request');
var cheerio = require('cheerio');
var count=0;

var url = 'http://espn.go.com/nfl/statistics/player/_/stat/receiving/sort/receivingYards/year/2012/qualified/false/count/1';
var stats=[];
var allplayers=[];
var playerCount=0;
function player(array){
  this.called=array[0];
  this.position=array[1];
  this.team=array[2];
  this.receptions=array[3];
  this.targets=(array[4]);
  this.totalyards=array[5];
  this.avgyardspr=(array[6]);
  this.touchdowns=(array[7]);
  this.longest=(array[8]);
  this.over20=(array[9]);
  this.yardspgame=(array[10]);
  this.fumbles=(array[11]);
  this.yardsaftercatch=(array[12]);
  this.recievingfirstdowns=(array[13]);
}



function req(url, callback){
  count++;
  request(url, function(err, resp, body) {
  if (err)
    throw err;
  $ = cheerio.load(body);

  $('.oddrow').each(function() {
    var name= $(this).find('a').parent().text();
    stats[1]= name.substring(name.length-2,name.length);
    stats[0]=name.substring(0,name.length-4);
    stats[2]= $(this).find('a').parent().next();
    for (i=3; i<14; i++)
      stats[i]=stats[i-1].next();
    for (i=2; i<14; i++)
      stats[i]=stats[i].text();
    allplayers[playerCount]=new player(stats);
    playerCount++;
  });

  $('.evenrow').each(function() {      
    var name= $(this).find('a').parent().text();
    stats[1]= name.substring(name.length-2,name.length);
    stats[0]=name.substring(0,name.length-4);
    stats[2]= $(this).find('a').parent().next();
    for (i=3; i<14; i++)
      stats[i]=stats[i-1].next();
    for (i=2; i<14; i++)
      stats[i]=stats[i].text();
    allplayers[playerCount]=new player(stats);
    playerCount++;
  });
  count--;
  if (count==0)
    parseData();
   });

}

function parseData(){
  console.log(playerCount)
  console.log(allplayers[playerCount-1])
}


for (page=0;page<10;page++){
url='http://espn.go.com/nfl/statistics/player/_/stat/receiving/sort/receivingYards/year/2012/qualified/false/count/'+(page*40+1);
req(url);
}
  //console.log(allplayers[playerCount-1].called);