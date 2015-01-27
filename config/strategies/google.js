// google.js - the oauth2 strategy implmentation for google logins
'use strict';
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User = require('../../models/User');

module.exports = function (passport, configAuth) {
		passport.use(new GoogleStrategy({
			clientID: configAuth.google.clientID,
			clientSecret: configAuth.google.clientSecret,
			callbackURL: configAuth.google.callbackURL,
			passReqToCallback: true 
		},
		function(req, token, refreshToken, profile, done) {
			// asynchronous
			process.nextTick(function() {
				// check if the user is already logged in
				if (!req.user) {

					User.findOne({ 'google.id' : profile.id }, function(err, user) {
						if (err) {
							return done(err);
						}

						if (user) {
							// user found, return that user
							return done(null, user);
						} else {
							var newUser = new User();

							newUser.google.id  = profile.id;
							newUser.google.token = token;
							newUser.google.name = profile.displayName;
							newUser.google.email = (profile.emails[0].value || '').toLowerCase();

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
					if (!req.user.google) {
						req.user.google.id  = profile.id;
						req.user.google.token = token;
						req.user.google.name = profile.displayName;
						req.user.google.email = (profile.emails[0].value || '').toLowerCase();

						return req.user.save(done);
					} else {
						// the logged in user already has this provider defined.
						return done(null, req.user);
					}
				}
			});
		}));
};
