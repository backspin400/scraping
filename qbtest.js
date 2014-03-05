var request = require('request');
var cheerio = require('cheerio');
var count=0;
var position=process.argv[2];
var testToRun= process.argv[3];
var year=process.argv[4];
var url;
var stats=[];
var allplayers=[];
var playerCount=0;
var minTargets=50;


function receiverStats(callback){
  for (page=0;page<10;page++){
    url='http://espn.go.com/nfl/statistics/player/_/stat/receiving/sort/receivingYards/year/'+year+'/qualified/false/count/'+(page*40+1);
    recReq(url,callback);
  }
}

function qbStats(callback){
  url='http://espn.go.com/nfl/statistics/player/_/stat/passing/year/'+year+'/qualified/false';
  qbReq(url,callback);
}


function receiver(array){
  this.called=array[0];
  this.position=array[1];
  this.team=array[2];
  this.receptions=array[3];
  this.targets=(array[4]);
  this.totalyards=array[5];
  this.average=(array[6]);
  this.touchdowns=(array[7]);
  this.longest=(array[8]);
  this.over20=(array[9]);
  this.yardspgame=(array[10]);
  this.fumbles=(array[11]);
  this.yardsaftercatch=(array[12]);
  this.recievingfirstdowns=(array[13]);
}

function qb(array){
  this.called=array[0];
  this.position='QB';
  this.team=array[1];
  this.completions=array[2];
  this.attempts=array[3];
  this.percentage=(array[4]);
  this.totalyards=array[5];
  this.yardsPerAttemp=(array[6]);
  this.touchdowns=(array[8]);
  this.longest=(array[7]);
  this.interceptions=(array[9]);
  this.sacks=(array[10]);
  this.rating=(array[11]);
  this.yardspgame=array[12];
}

function recReq(url, callback){
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

    allplayers[playerCount]=new receiver(stats);
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
    allplayers[playerCount]=new receiver(stats);
    playerCount++;
  });

  count--;
  if (count==0)
    callback();
   });

}

function qbReq(url,callback){
  request(url, function(err, resp, body){
  if (err)
    throw err;
  $ = cheerio.load(body);

  $('.oddrow').each(function(){
    stats[0]=$(this).find('a');
    stats[1]=stats[0].parent().next();
    for (i=2;i<13;i++){
      stats[i]=stats[i-1].next();
    }
    for (i=0;i<13;i++){
      stats[i]=stats[i].text();
    }

    allplayers[playerCount]=new qb(stats);
    playerCount++;
  });

    $('.evenrow').each(function(){
    stats[0]=$(this).find('a');
    stats[1]=stats[0].parent().next();
    for (i=2;i<13;i++){
      stats[i]=stats[i-1].next();
    }
    for (i=0;i<13;i++){
      stats[i]=stats[i].text();
    }

    allplayers[playerCount]=new qb(stats);
    playerCount++;
  });
  callback();
  });

}

//recStats
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

  console.log("In "+ year + ", of "+playerCount+ ' recievers, the average reception percentage was '+catchpercent.toFixed(2)*100+'%')
  console.log(name+' had the best recieving percentage (minimum 50 receptions) with '+(winner*100).toFixed(2)+'% receiving on '+winnertargets+' targets')

  
}

function recYardsPerAttempt(){
  var player;
  var winningrypa=0;
  var winner;
  for (i=0; i<allplayers.length;i++){
    player=allplayers[i];


    if (player.totalyards/player.targets>winningrypa&& player.position=='WR'&&player.receptions>=50)
      {
        winner=player;
        winningrypa=(player.totalyards)/player.targets;}
  }

  console.log("In "+ year + ", "+winner.called+ ' had the most yards per targets (min 50 receptions)  with ' +(winningrypa).toFixed(2)+ ' yards per target')
}


function distanceDownfield(){
  var player;
  var furthest=0;
  var winner;
  var curfur;
  for (i=0; i<allplayers.length;i++){
    player=allplayers[i];
    curfur=(player.totalyards-player.yardsaftercatch)/player.receptions;

    if (curfur>furthest&& player.position=='WR'&&player.receptions>=50)
      {
        winner=player;
        furthest=(curfur);}
  }
  console.log("In "+ year + ", "+winner.called+ ' catches furthest downfield (min  50 receptions)  with catches an average of ' +(furthest).toFixed(2)+ ' yards downfield')
}
  


 //qbStats 
function yardsPerInt(){
  var player;
  var sacks;
  var ints;
  var tot=0;
  var winner;
  var curcount;
  for (i=0;i<allplayers.length;i++){
    player=allplayers[i];
    curcount=(parseInt(player.totalyards.replace(',','')))/(parseInt(player.interceptions));
    if (curcount>tot){
      winner=player;
      tot=curcount;
    }
  }
console.log("In "+ year + ", "+winner.called + ' gains about ' +tot.toFixed(0) +' yards for every interception he throws.')
}

function attemptsForTD(){
  var player;
  var tds;
  var attempts;
  var tot=1000;
  var winner;
  var curcount;
  for(i=0;i<allplayers.length;i++){
    player=allplayers[i];
    curcount=(parseInt(player.attempts)/parseInt(player.touchdowns));
    if (curcount<tot&& parseInt(player.touchdowns)>0){
      winner=player;
      tot=curcount;
      tds=player.touchdowns;
      attempts=player.attempts;
    }
  }
  console.log("In "+ year + ", "+winner.called + ' passes for a touchdown once for every '+ tot.toFixed(2)+ ' he throws the ball.')
}




eval(position+'Stats('+testToRun+')');
