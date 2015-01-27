// github.js - the oauth2 strategy implmentation for github logins
'use strict';
var GitHubStrategy = require('passport-github').Strategy;

// load up the user model
var User = require('../../models/User');

module.exports = function (passport, configAuth) {
		passport.use(new GitHubStrategy({
			clientID: configAuth.github.clientID,
			clientSecret: configAuth.github.clientSecret,
			callbackURL: configAuth.github.callbackURL,
			passReqToCallback: true 
		},
		function(req, token, refreshToken, profile, done) {
			// asynchronous
			process.nextTick(function() {
				// check if the user is already logged in
				if (!req.user) {

					User.findOne({ 'github.id' : profile.id }, function(err, user) {
						if (err) {
							return done(err);
						}

						if (user) {
							// user found, return that user
							return done(null, user);
						} else {
							var newUser = new User();

							newUser.github.id  = profile.id;

							newUser.save(function(err) {
								if (err) {
									return done(err);
								}

								return done(null, newUser);
							});
						}
					});
				} else {
					// if this user does not have this provider already, add it to their profile (linking accounts)
					if (!req.user.github) {
						req.user.github.id  = profile.id;

						return req.user.save(done);
					} else {
						// the logged in user already has this provider defined.
						return done(null, req.user);
					}
				}
			});
		}));
};
