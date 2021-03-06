var express = require('express');
var request = require('request');
var bodyParser = require('body-parser'); //takes form data and makes it into a usable type
var ejsLayouts = require('express-ejs-layouts');
var db = require("./models");
var app = express();
app.use(express.static(__dirname + '/public'));

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

//seddup them routes
app.get('/', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';
    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body).results;
        res.render('index', {pokemon: pokemon});
    });
});

app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
