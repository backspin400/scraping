var request = require('request');
var cheerio = require('cheerio');

var url = 'http://espn.go.com/nfl/statistics/player/_/stat/receiving/sort/receivingYardsAfterCatch/year/2012/qualified/false';


request(url, function(err, resp, body) {
        if (err)
            throw err;
        $ = cheerio.load(body);
     $('.oddrow').each(function() {
      var name= $(this).find('a').parent().text();
      var position= name.substring(name.length-2,name.length);
    console.log(name.substring(0,name.length-4));
    console.log(name.substring(name.length-2,name.length));
    console.log($(this).find('a').parent().next().text());
    console.log($(this).find('td.sortcell').text());
});
  /*  $('.evenrow').each(function() {
    console.log($(this).find('a').text());
    console.log($(this).find('td.sortcell').text());
});*/
   });

