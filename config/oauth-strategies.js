// oauth-strategies - used to create establish all the strategies necessary for oauth login
'use strict';


module.exports = function(passport, configAuth) {
	if (configAuth.facebook) {
		require('./strategies/facebook')(passport, configAuth);
	}

	if (configAuth.twitter) {
		require('./strategies/twitter')(passport, configAuth);
	}

	if (configAuth.google) {
		require('./strategies/google')(passport, configAuth);
	}

	if (configAuth.coinbase) {
		require('./strategies/coinbase')(passport, configAuth);
	}

	if (configAuth.github) {
		require('./strategies/github')(passport, configAuth);
	}

};
