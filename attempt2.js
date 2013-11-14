var request = require('request');
var cheerio = require('cheerio');

var url = 'http://espn.go.com/nfl/statistics/player/_/stat/receiving/sort/receivingYards/year/2012/qualified/false/count/1';

function player(name, position, team, rec, targets, total, aypr, tds, longest, over20, ypg, fubmle, yac, rfds){
  this.name=name;
  this.position=position;
  this.team=team;
  this.receptions=(rec);
  this.targets=(targets);
  this.totalyards=total;
  this.avgyardspr=(aypr);
  this.touchdowns=(tds);
  this.longest=(longest);
  this.over20=(over20);
  this.yardspgame=(ypg);
  this.fumbles=(fubmle);
  this.yardsaftercatch=(yac);
  this.recievingfirstdowns=(rfds);

}

request(url, function(err, resp, body) {
        if (err)
            throw err;
        $ = cheerio.load(body);
     $('.oddrow').each(function() {
      var name= $(this).find('a').parent().text();
      var position= name.substring(name.length-2,name.length);
      name=name.substring(0,name.length-4);
      var team= $(this).find('a').parent().next();
      var receptions= (team).next();
      var recievingtargets= receptions.next();
      var totyards=recievingtargets.next();
      var averageypr=totyards.next();
      var touchdowns=averageypr.next();
      var longest= touchdowns.next();
      var over20 =longest.next();
      var yardspg=over20.next();
      var fumbles = yardspg.next( );
      var yardsaftercatch= fumbles.next();
      var recfirstdowns= yardsaftercatch.next();
      team=team.text();
      receptions=parseInt(receptions.text());
      recievingtargets=parseInt(recievingtargets.text());
      totyards=parseInt(totyards.text());
      averageypr=parseInt(averageypr.text());
      touchdowns=parseInt(touchdowns.text());
      longest=parseInt(longest.text());
      over20=parseInt(over20.text());
      yardspg=parseInt(yardspg.text());
      fumbles=parseInt(fumbles.text());
      yardsaftercatch=parseInt(yardsaftercatch.text());
      recfirstdowns=parseInt(recfirstdowns.text());

      var name=new player(name,position,team, receptions,recievingtargets,totyards,averageypr,touchdowns,longest,over20,yardspg,fumbles,yardsaftercatch,recfirstdowns);
      //var receivingYardsAfterCatch=$(this).find('td.sortcell').text();
      console.log(name);
});

  /*  $('.evenrow').each(function() {
    console.log($(this).find('a').text());
    console.log($(this).find('td.sortcell').text());
});*/
   });

