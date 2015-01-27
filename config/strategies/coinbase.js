// coinbase.js - the oauth2 strategy implmentation for coinbase logins
'use strict';
var CoinbaseStrategy = require('passport-coinbase').Strategy;

// load up the user model
var User = require('../../models/User');

module.exports = function (passport, configAuth) {

		passport.use(new CoinbaseStrategy({
			clientID: configAuth.coinbase.clientID,
			clientSecret: configAuth.coinbase.clientSecret,
			callbackURL: configAuth.coinbase.callbackURL,
			passReqToCallback : true,
			scope: ['user', 'request']
		},
		function(req, token, refreshToken, profile, done) {
			// asynchronous
			process.nextTick(function() {
				// check if the user is already logged in
				if (!req.user) {
					User.findOne({ 'coinbase.id' : profile.id }, function(err, user) {
						if (err) {
							return done(err);
						}

						if (user) {
								// user found, return that user
								return done(null, user); 
						} else {
							// if there is no user, create them
							var newUser = new User();
							newUser.coinbase.id = profile.id;
							newUser.coinbase.name = profile.name;
							newUser.coinbase.email = profile.email;

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
					if (!req.user.coinbase) {
						req.user.coinbase.id = profile.id;
						req.user.coinbase.name = profile.name;
						req.user.coinbase.email = profile.email;

						return req.user.save(done);
					} else {
						// the logged in user already has this provider defined.
						return done(null, req.user);
					}

				}
			});
		}));
};
