var request = require('request');
var cheerio = require('cheerio');

var url = 'http://espn.go.com/nfl/statistics/player/_/stat/receiving/sort/receivingYards/year/2012/qualified/false/count/1';

function player(name, position, team, rec, targets, aypr, tds, longest, over20, ypg, fubmle, yac, rfds){
  this.name=name;
  this.position=position.text();
  this.team=team.text();
  this.receptions=parseInt(rec.text());
  this.targets=parseInt(targets.text());
  this.avgyardspr=parseInt(aypr.text());
  this.touchdowns=parseInt(tds.text());
  this.longest=parseInt(longest.text());
  this.over20=parseInt(over20.text());
  this.yardspgame=parseInt(ypg.text());
  this.fumbles=parseInt(fubmle.text());
  this.yardsaftercatch=parseInt(yac.text());
  this.recievingfirstdowns=parseInt(rfds.text());

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
      var averageypr=recievingtargets.next();
      var touchdowns=averageypr.next();
      var longest= touchdowns.next();
      var over20 =longest.next();
      var yardspg=over20.next();
      var fumbles = yardspg.next( );
      var yardsaftercatch= fumbles.next();
      var recfirstdowns= yardsaftercatch.next();
      var name=new player(name,position,team, receptions,recievingtargets,averageypr,touchdowns,longest,over20,yardspg,fumbles,yardsaftercatch,recfirstdowns);
      //var receivingYardsAfterCatch=$(this).find('td.sortcell').text();
      console.log(name);
});

  /*  $('.evenrow').each(function() {
    console.log($(this).find('a').text());
    console.log($(this).find('td.sortcell').text());
});*/
   });

