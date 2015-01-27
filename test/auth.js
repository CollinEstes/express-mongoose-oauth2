// example config

module.exports = {
	'facebook' : {
		'clientID' 		: 'ID_HERE', // your App ID
		'clientSecret' 	: 'SECRET_HERE', // your App Secret
		'callbackURL' 	: 'http://localhost:9090/connect/facebook/callback',
		'successCallback'	: '/testing/facebook',
		'failureCallback' : '/testing/error',
		'scope':  "email"
	},

	'twitter' : {
		'consumerKey' 		: 'ID_HERE',
		'consumerSecret' 	: 'SECRET_HERE',
		'callbackURL' 		: 'http://localhost:9090/connect/twitter/callback',
		'successCallback'	: '/testing/twitter',
		'failureCallback' : '/testing/error'
	},

	'google' : {
		'clientID' 		: 'ID_HERE-79ibsb669hakd114cspl7tg4n46rem0m.apps.googleusercontent.com',
		'clientSecret' 	: 'SECRET_HERE',
		'callbackURL' 	: 'http://localhost:9090/connect/google/callback',
		'successCallback'	: '/testing/google',
		'failureCallback' : '/testing/error',
		'scope':  'https://www.googleapis.com/auth/userinfo.email'
	},

	'github'	: {
		'clientID' 		: 'ID_HERE',
		'clientSecret' 	: 'SECRET_HERE',
		'callbackURL' 	: 'http://localhost:9090/connect/github/callback',
		'successCallback'	: '/testing/github',
		'failureCallback' : '/testing/error'
	},

	'coinbase' : {
		'clientID'	: 'ID_HERE',
		'clientSecret'	: 'SECRET_HERE',
		'callbackURL' 	: 'http://localhost:9090/connect/coinbase/callback',
		'successCallback'	: '/testing/coinbase',
		'failureCallback' : '/testing/error',
	}
}

