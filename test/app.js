// app.js - used for testing our auth module only, in production the express application is supplied

module.exports = function () {
	var express = require('express'),
		bodyParser = require('body-parser'),
		logger = require('morgan');

	var app = express();


	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(logger('dev'));

	app.set('view engine', 'jade'); // set up jade for templating
	app.set('views', __dirname + '/views');

	return app;
};
