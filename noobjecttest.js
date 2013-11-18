	var request = require('request');
var cheerio = require('cheerio');
var count=0;

var url = 'http://espn.go.com/nfl/statistics/player/_/stat/receiving/sort/receivingYards/year/2012/qualified/false/count/1';
var stats=[];
var allplayers=[];
var playerCount=0;

function receiverStats(callback){
for (page=0;page<10;page++){
url='http://espn.go.com/nfl/statistics/player/_/stat/receiving/sort/receivingYards/year/2012/qualified/false/count/'+(page*40+1);
req(url,callback)}
}



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
    callback();
   });

}

function receiverPercentage(){
  var totalreceptions=0;
  var totaltargets=0;
  var personalcatchpercentage;
  var winner=0;
  var name;
  var winnertargets;
  var player;
  var receptions;
  var targets;
  for (i=0;i<allplayers.length;i++)
  {
    player=allplayers[i];
    receptions=parseInt(player.receptions);
    targets=parseInt(player.targets);
    if(receptions/targets>winner&&receptions>=50 && player.position=='WR'){
      winner=receptions/targets;
      name=player.called;
      winnertargets=targets;
    }
    totalreceptions+=parseInt(player.receptions);
    totaltargets+=parseInt(player.targets);

  }
  var catchpercent=totalreceptions/totaltargets*100;

  console.log('of '+playerCount+ ' recievers, the average reception percentage was '+catchpercent.toFixed(2)+'%')
  console.log(name+' had the best recieving percentage (minimum 50 attempts) with '+(winner*100).toFixed(2)+'% receiving on '+winnertargets+' targets')

  
}

function recYardsPerAttempt(){
  var player;
  var winningrypa=0;
  var winner;
  for (i=0; i<allplayers.length;i++){
    player=allplayers[i];


    if (player.totalyards/player.targets>winningrypa&& player.position=='WR'&&player.targets>=50)
      {
        winner=player;
        winningrypa=(player.totalyards)/player.targets;}
  }

  console.log(winner.called+ ' had the most yards per targets (min 50 targets)  with ' +(winningrypa).toFixed(2)+ ' yards per target')
}


function distanceDownfield(){
  var player;
  var furthest=0;
  var winner;
  var curfur;
  for (i=0; i<allplayers.length;i++){
    player=allplayers[i];
    curfur=(player.totalyards-player.yardsaftercatch)/player.receptions;

    if (curfur>furthest&& player.position=='WR'&&player.targets>=50)
      {
        winner=player;
        furthest=(curfur);}
  }

  console.log(winner.called+ ' catches furthest downfield (min 50 targets)  with catches an average of ' +(furthest).toFixed(2)+ ' yards downfield')
}
  



receiverStats(distanceDownfield)

