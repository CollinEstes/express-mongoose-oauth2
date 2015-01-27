// facebook.js - the oauth2 strategy implmentation for facebook logins
'use strict';
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var User = require('../../models/User');

module.exports = function (passport, configAuth) {

		passport.use(new FacebookStrategy({
			clientID: configAuth.facebook.clientID,
			clientSecret: configAuth.facebook.clientSecret,
			callbackURL: configAuth.facebook.callbackURL,
			passReqToCallback : true
		},
		function(req, token, refreshToken, profile, done) {
			// asynchronous
			process.nextTick(function() {
				// check if the user is already logged in
				if (!req.user) {
					User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
						if (err) {
							return done(err);
						}

						if (user) {
								// user found, return that user
								return done(null, user); 
						} else {
							// if there is no user, create them
							var newUser = new User();
							newUser.facebook.id = profile.id;
							newUser.facebook.token = token;
							newUser.facebook.name = profile.displayName;
							newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

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
					if (!req.user.facebook) {
						req.user.facebook.id = profile.id;
						req.user.facebook.token = token;
						req.user.facebook.name = profile.displayName;
						req.user.facebook.email = (profile.emails[0].value || '').toLowerCase();

						return req.user.save(done);
					} else {
						// the logged in user already has this provider defined.
						return done(null, req.user);
					}
				}
			});
		}));
};
