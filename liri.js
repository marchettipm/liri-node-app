var fs = require('fs');
var keys = require('./keys.js');
var request = require('request');
var input = process.argv[2];
var input2 = process.argv.slice(3);
var input3 = process.argv[3];

var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});

var params = {
    screen_name: 'steakeyes'
};
if (input === 'my-tweets') {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < 20; i++) {
                console.log(tweets[i].text)
                console.log(tweets[i].created_at);
            }
        }
    });


}
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: keys.spotKeys.client_id,
    secret: keys.spotKeys.client_secret
});
if (input === 'spotify-this-song') {
    if (input3 === undefined) {
        spotify.search({
            type: 'track',
            query: 'Ace Of Base The Sign',
        }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var info = data.tracks.items[0];
            console.log(`Album: ${info.album.name}`);
            console.log(`Artist: ${info.artists[0].name}`);
            console.log(`Track: ${info.name}`);
            console.log(`Song Preview: ${info.preview_url}`);

        });
    } else {
        spotify.search({
            type: 'track',
            query: input2,
        }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var info = data.tracks.items[0];
            console.log(`Album: ${info.album.name}`);
            console.log(`Artist: ${info.artists[0].name}`);
            console.log(`Track: ${info.name}`);
            console.log(`Song Preview: ${info.preview_url}`);

        });
    }

}

var request = require("request");

if (input === 'movie-this') {
    if (input3 === undefined) {
        var queryUrl = "http://www.omdbapi.com/?t=" + 'Mr Nobody' + "&y=&plot=short&apikey=40e9cece";


        request(queryUrl, function(error, response, body) {

            if (!error && response.statusCode === 200) {
                var myObject = JSON.parse(body);
                // console.log(JSON.parse(body));
                console.log("Title: " + myObject.Title);
                console.log("Year: " + myObject.Year);
                console.log("IMDB Rating: " + myObject.imdbRating);
                console.log("Rotten Tomatoes:" + myObject.Ratings[1].Value);
                console.log("Country: " + myObject.Country);
                console.log("Language: " + myObject.Language);
                console.log("Actors: " + myObject.Actors);
                console.log("Plot: " + myObject.Plot);


            }

        });
    } else {


        var movieName = input2;

        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";


        request(queryUrl, function(error, response, body) {

            if (!error && response.statusCode === 200) {
                var myObject = JSON.parse(body);
                // console.log(JSON.parse(body));
                console.log("Title: " + myObject.Title);
                console.log("Year: " + myObject.Year);
                console.log("IMDB Rating: " + myObject.imdbRating);
                console.log("Rotten Tomatoes:" + myObject.Ratings[1].Value);
                console.log("Country: " + myObject.Country);
                console.log("Language: " + myObject.Language);
                console.log("Actors: " + myObject.Actors);
                console.log("Plot: " + myObject.Plot);


            }

        });
    }
}
if ("do-what-it-says" === input) {


    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) {
            return console.log('ERROR!', err);

        }
        console.log(data.split(',')[1]);
        spotify.search({
            type: 'track',
            query: data.split(',')[1],
        }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var info = data.tracks.items[0];
            console.log(`Album: ${info.album.name}`);
            console.log(`Artist: ${info.artists[0].name}`);
            console.log(`Track: ${info.name}`);
            console.log(`Song Preview: ${info.preview_url}`);
        });
    });

}