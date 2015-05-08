var cheerio = require('cheerio');
var request = require('request');
var orientdb = require('orientdb');

var dbConfig = {
    user_name: "vandana",
    user_password: "nachi"
};

var serverConfig = {
    host: "localhost",
    port: 2480
};

var server = new orientdb.Server(serverConfig);
var db = new orientdb.GraphDb("festivus", server, dbConfig);

db.open(function(err) {
    if (err) {
        throw err;
    } console.log("succesffuly connected to OrienDB");
});

var url = process.argv[2]
var festival = process.argv[3]
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

        });

var addFestival(artists, festival) {
    

}


