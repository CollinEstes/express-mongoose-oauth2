// twitter.js - the oauth2 strategy implmentation for twitter logins
'use strict';
var TwitterStrategy = require('passport-twitter').Strategy;

// load up the user model
var User = require('../../models/User');

module.exports = function (passport, configAuth) {

	passport.use(new TwitterStrategy({
				consumerKey: configAuth.twitter.consumerKey,
				consumerSecret: configAuth.twitter.consumerSecret,
				callbackURL: configAuth.twitter.callbackURL,
				passReqToCallback : true 
			},
			function(req, token, tokenSecret, profile, done) {

				// asynchronous
				process.nextTick(function() {

					// check if the user is already logged in
					if (!req.user) {

						User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
							if (err) {
								return done(err);
							}
							if (user) {
								// user found, return that user
								return done(null, user);
							} else {
								// if there is no user, create them
								var newUser = new User();

								newUser.twitter.id = profile.id;
								newUser.twitter.token = token;
								newUser.twitter.username = profile.username;
								newUser.twitter.displayName = profile.displayName;

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
						if (!req.user.twitter) {
							req.user.twitter.id = profile.id;
							req.user.twitter.token = token;
							req.user.twitter.username = profile.username;
							req.user.twitter.displayName = profile.displayName;

							return req.user.save(done);
						} else {
							// the logged in user already has this provider defined.
							return done(null, req.user);
						}
					}

				});
			}));
};