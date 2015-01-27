/**
	*  ppds_auth: 	passport intergation for our ppds express apps and api's
	*									this module will provide all necessary authorization/authentication protocols needed
	*										including all oauth logins
	*  								expects the express app to be supplied as well as the mongodb conn string
	*									expects all validation of routes to be handled by the parent application
	*									expects the authorization object for the oauth providers (see example_config)
	*			
	*									returns express app					
	*
	*  Author: 				Collin Estes, collin@poppopdevshop.com
	*
	*
	*
	*  Usage: 				To utlize oauth logins provide UI with routes "auth/{{provider-name}}"
	*										ex in jade:  a(href="auth/google")
	*									Successful logins will redirect to 
**/
'use strict';
var url = require('url');

var _ = require('lodash');

var mongoose = require('mongoose'),
	passport = require('passport'),
	session = require('express-session');

var providersNames = require('./config/providers');

var Auth = function (expressApp, dbConnectionInfo, authConfig) {
	if (!expressApp) {
		throw new Error('You forgot to supply ppds_auth the instance of your express app');
	}

	if (!dbConnectionInfo) {
		throw new Error('You forgot to supply ppds_auth the database connection info');
	}

	if (!authConfig) {
		throw new Error('You forgot to supply ppds_auth with auth provider configuration');
	}

	var uri = _.isString(dbConnectionInfo) ? dbConnectionInfo : dbConnectionInfo.uri;

	this.app = expressApp;
	this.connectionString = uri;

};

Auth.prototype.createConnection = function () {
if (mongoose.connection.readyState === 0) {
		mongoose.connect(this.connectionString);
		mongoose.connection.on('error', function () {
			console.log(arguments);
			console.log('There was an error with the mongoose connection');
		});	
	}
};

Auth.prototype.setupUserSerialization = function (User) {
	// passport session setup 
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session
	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
			done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
			User.findById(id, function(err, user) {
					done(err, user);
			});
	});
};

Auth.prototype.addOauthRoutes = function (authConfig) {
	// each provider supplied will be given a standard auth and auth/callback route for handling user logins
	for (var provider in authConfig) {
		// make sure provider name is implmented against config/providers.js
		if (providersNames.indexOf(provider) !== -1) {
			if (authConfig[provider].scope) {
				this.app.get('/connect/' + provider, passport.authenticate(provider, { 
					scope: authConfig[provider].scope
				}));	
			} else {
				this.app.get('/connect/' + provider, passport.authenticate(provider));	
			}
			
			
			// this route establishes the callback using the configuration supplied
			this.app.get(url.parse(authConfig[provider].callbackURL).pathname, 
				passport.authenticate(provider, {
					successRedirect: authConfig[provider].successCallback,
					failureRedirect: authConfig[provider].successCallback,
					failureFlash: true
				}));
		};
	};
};


module.exports = function (expressApp, dbConnectionInfo, authConfig) { 
	var User = require('./models/User');
	var auth = new Auth(expressApp, dbConnectionInfo, authConfig);

	auth.createConnection();

	auth.setupUserSerialization(User);

	// configure passport with oAuth strategies if an authorization object is provided
	require('./config/oauth-strategies')(passport, authConfig);

	// setup session
	expressApp.use(session({ 
		secret: 'poppopdevshop_2015!!!CMR-secret',
		resave: false,
		saveUninitialized: true
	}));
	expressApp.use(passport.initialize());
	expressApp.use(passport.session());

	// add auth routing for supplied providers
	auth.addOauthRoutes(authConfig);

	return auth.expressApp;

};
