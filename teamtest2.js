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
	  for (i=0;i<allteams.length;i++)
	    if (allteams[i].called==name)
	    	return i;
	} 
		
}



function team(name){
  this.called=name;
  this.stat1=0;
  this.stat2=0;
  this.stat3=0;
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
      var teamname= (array[i]);
      allteams[i]= new team(array[i])

       }}



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

allplayers[0 ]=new player(['barry','WR','TEN', 111,123,43234,12.34,3,26,4,115,1,22222, 100]);

console.log(allplayers[0].team)
NFL=new league();

createTeams(teamnames);
console.log(allteams[26].called===allplayers[0].team)
/*
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
     console.log(feed);
     if (typeof feed != 'undefined'){
 		//console.log('team number '+ (eval(feed)).called); 
  }

  //allteams[NFL.getTeam(eval(feed))].addstats(player.totalyards,player.yardsaftercatch,player.receptions);

    curfur=(player.totalyards-player.yardsaftercatch)/player.receptions;

    if (curfur>furthest&& player.position=='WR'&&player.targets>=50)
      {
      	console.log('here1.5')
        winner=player;
        furthest=(curfur);}
  }

  console.log('i made it here2');
  teamfurthest=0;

console.log(allplayers[27])
for (i=0;i<allteams.length;i++){
	var teamtotals=allteams[i].retrievestats();
	curfur=(teamtotals[0]-teamtotals[1])/teamtotals[2];

    if (curfur>teamfurthest)
      {
        teamwinner=allteams[i];
        teamfurthest=(curfur);}

  }

 // console.log(teamwinner.called);




  console.log(winner.called+ ' catches furthest downfield (min 50 targets)  with catches an average of ' +(furthest).toFixed(2)+ ' yards downfield')
}
  




NFL=new league();

createTeams(teamnames);
console.log('NYJ'.called)
//allteams[NFL.getTeam('TEN')].addstats(1,535,10)
//console.log(allteams[NFL.getTeam('TEN')].retrievestats()[1])


//receiverStats(distanceDownfield)

*/