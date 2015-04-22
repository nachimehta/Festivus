var cheerio = require('cheerio');
var request = require('request');

var url = process.argv[2]
var artists = []

request({ "url": url},
        function(err, resp, body){
            var $ = cheerio.load(body)
            var strContent = ""
            $('.festival').find('li').each(function(index, elem) {
                if(index !== 0)
                    artists.push($(this).text())
            })

        for(var i = 0; i < artists.length; i++) {
            console.log(artists[i])
        }

        })

