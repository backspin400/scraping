teamnames=['DEN','NO/','CIN','DET','SD/','DAL','ATL','PIT','WSH','IND','NYG','BAL','NE/','GB/','MIA','ARI','SEA','CAR','KC/','CHI','STL','SF/','JAX','OAK','HOU','TB/','TEN','PHI','MIN','CLE','BUF','NYJ'];
allteams=[];
var request = require('request');
var cheerio = require('cheerio');
var count=0;var stats=[];
var allplayers=[];
var playerCount=0;

function league(){
	this.called='NFL';
	this.getTeam=getTeam;
	function getTeam(name){
	  for (var teamlength=0;teamlength<allteams.length;teamlength++)
	    if (allteams[teamlength].called==name)
	    	return teamlength;
	} 
		
}



function team(name){
  this.called=name;
  this.stat1=0;
  this.stat2=0;
  this.stat3=0;
  this.answer=0;
  this.addstats=addstats;
  function addstats(){
  	this.stat1+=parseInt(arguments[0]);
  	this.stat2+=parseInt(arguments[1]);
  	this.stat3+=parseInt(arguments[2]);
  }
  this.retrievestats=retrievestats;
  function retrievestats(){
  	return [this.stat1, this.stat2, this.stat3]
  }
}


	function createTeams(array){
  for (i=0;i<array.length;i++){

      allteams[i]= new team(array[i])

       }}


function compare(a,b){
  if (a.answer>b.answer)
    return 1;

  if (a.answer<b.answer)
    return -1;

  return 0;

}


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
  var teamwinner;
  var teampercent;
  var winnerpercent=0;
  for (i=0;i<allplayers.length;i++)
  {
    player=allplayers[i];
    feed=(player.team+'/').substring(0,3);
    receptions=parseInt(player.receptions);
    targets=parseInt(player.targets);
    if (player.position=='WR'){
      allteams[NFL.getTeam(feed)].addstats(receptions,targets);
    }
    if(receptions/targets>winner&&receptions>=50 && player.position=='WR'){
      winner=receptions/targets;
      name=player.called;
      winnertargets=targets;
    }
    totalreceptions+=parseInt(player.receptions);
    totaltargets+=parseInt(player.targets);
  }
  for (i=0;i<allteams.length;i++){
    var teamtotals=allteams[i].retrievestats();
    teampercent=(teamtotals[0]/teamtotals[1]);
    if (teampercent>winnerpercent){
        teamwinner=allteams[i];
        winnerpercent=(teampercent);
    }
  }


  var catchpercent=totalreceptions/totaltargets*100;


  console.log('of '+playerCount+ ' recievers, the average reception percentage was '+catchpercent.toFixed(2)+'%')
  console.log(name+' had the best recieving percentage (minimum 50 attempts) with '+(winner*100).toFixed(2)+'% receiving on '+winnertargets+' targets')
  console.log(teamwinner.called+ ' is the team with highest receiver percentage with their wide receivers catching an ' +(winnerpercent*100).toFixed(2)+ '% of targets.')
  
}

function recYardsPerAttempt(){
  var player;
  var winningrypa=0;
  var winner;
  var teamwinner;
  var teamrypa=0;
  var feed;var rypa;
  for (i=0; i<allplayers.length;i++){
    player=allplayers[i];
    feed=(player.team+'/').substring(0,3);
    if (player.position=='WR'){
      allteams[NFL.getTeam(feed)].addstats(player.totalyards,player.targets);
    }
    if (player.totalyards/player.targets>winningrypa&& player.position=='WR'&&player.targets>=50){
        winner=player;
        winningrypa=(player.totalyards)/player.targets;
    }
  }
  for (i=0;i<allteams.length;i++){
    var teamtotals=allteams[i].retrievestats();
    rypa=(teamtotals[0]/teamtotals[1]);
    if (rypa>teamrypa){
        teamwinner=allteams[i];
        teamrypa=(rypa);
    }
  }

  console.log('the ' +teamwinner.called+ ' wide recievers have the most yards per attempt gaining an average '+teamrypa.toFixed(2)+ ' yards every throw')
  console.log(winner.called+ ' had the most yards per targets (min 50 targets)  with ' +(winningrypa).toFixed(2)+ ' yards per target')
}


function distanceDownfield(){
  var player;
  var furthest=0;
  var winner;
  var curfur;
  var feed;
  var teamwinner;
  for (i=0; i<allplayers.length;i++){
    player=allplayers[i];
    feed=(player.team+'/').substring(0,3);
    if (player.position=='WR'){
      allteams[NFL.getTeam(feed)].addstats(player.totalyards,player.yardsaftercatch,player.receptions);
    }
    curfur=(player.totalyards-player.yardsaftercatch)/player.receptions;
    if (curfur>furthest&& player.position=='WR'&&player.targets>=50){
        winner=player;
        furthest=(curfur);
    }
  }
  teamfurthest=0;
  for (i=0;i<allteams.length;i++){
  	var teamtotals=allteams[i].retrievestats();
  	curfur=(teamtotals[0]-teamtotals[1])/teamtotals[2];
    if (curfur>teamfurthest){
        teamwinner=allteams[i];
        teamfurthest=(curfur);
    }
  }
 console.log('the ' +teamwinner.called+ ' wide recievers catch furthest downfield w/ catches an average '+teamfurthest.toFixed(2)+' yards downfield');
 console.log(winner.called+ ' catches furthest downfield (min 50 targets)  with catches an average of ' +(furthest).toFixed(2)+ ' yards downfield')
}
  

NFL=new league();

createTeams(teamnames);


receiverStats(receiverPercentage)

