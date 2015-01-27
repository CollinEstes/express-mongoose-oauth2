// index.spec.js - test page for the authorization setup with each oauth provider
// THIS IS RUN FROM GULP YOU DO NOT RUN IT DIRECTLY.
var open = require('open');
var Mocha = require('mocha');

var auth = require('./');
var authConfig = require('./test/auth');

var app = require('./test/app')();

var mongoose = require('mongoose');

// testing globals
global.expect = require('chai').expect;
global.superagent = require('superagent');

// handle the callbacks from Oauth providers to execute corresponding tests
var processTest = function (req, res, next) {
	var mocha = new Mocha(),
		providerName = req.originalUrl.split('/')[2],
		testFile = './test/callbacks/' + providerName + '.spec.js';

	// ADDING GLOBAL HERE SO TESTS HAVE SCOPE TO THE REQ TO VERIFY
	global[providerName + 'Req'] = req;

	// add test files
	mocha.addFile(testFile);
	mocha.run(function(failures) {
		process.on('exit', function () {
			process.exit(failures);
		});
	});

	res.sendStatus(200);
};

module.exports = function() {

	// add auth routing
 auth(app,'mongodb://@localhost:27017/ppds_auth_test', authConfig);

	// set up error handling page
	app.get('/testing/error', function (req, res) {
		console.log('An error occured in the oauth2 authorization');
		res.send(500);
	});

	// oauth callback Routes to process Test
	app.get('/testing/google', processTest);
	app.get('/testing/twitter', processTest);
	app.get('/testing/github', processTest);

	// start server
	app.listen(9090, function (err, result) {

		require('./test/phantom/phantom-google.spec')();
		require('./test/phantom/phantom-twitter.spec')();
		require('./test/phantom/phantom-github.spec')();

	});
}