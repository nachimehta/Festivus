var cheerio = require('cheerio');
var request = require('request');
var oriento = require('oriento');
require('date-utils');

var server = oriento({
    host: 'localhost',
    port: 2424,
    username: 'vandana',
    password: 'nachi'
});

var db = server.use('festivus');

var url = process.argv[2]
var artists = []

request({ "url": url},
        function(err, resp, body){
            var $ = cheerio.load(body)
            $('.festival').find('li').each(function(index, elem) {
                if(index !== 0)
                    artists.push($(this).text())
            })

            var date = $('.date-and-name h5').text();
            date = date.split(' ');
            date = new Date(date[0] +  "  " + date[1] + " " + date[2] + " " + date[3]);
            date = date.toYMD();

            festival = $('.summary span').text();

            db.update('festival').set({name: festival, date: date}).upsert().where({name: festival, date: date}).one()
                .then(function (festival_inserted) {
                    console.log('created', festival_inserted);
            });

            var params = [];
            for(var i = 0; i < artists.length; i++) {
                db.update('artist').set({name: artists[i]}).upsert().where({name: artists[i]}).one()
                    .then(function (artist) {
                        console.log('upserted', artist);
                });

                db.exec('create edge performed_at from (select from artist where name=:artist) to (select from festival where name=:festival)', {
                    params: {
                        artist: artists[i],
                        festival: festival
                    }
                }).then(function (response) {
                    console.log(response);
                });
            }


    })

