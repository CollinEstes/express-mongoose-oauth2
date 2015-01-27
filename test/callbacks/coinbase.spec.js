// coinbase.spec.js - the coinbase oauth2 provider tests to make sure configuration is setup correctly


var User = require('../../models/User');

module.exports = function () {

	describe('coinbase oAuth2 processing', function () {

		it('should create user session for coinbase user', function (done) {
			expect(coinbaseReq.isAuthenticated()).to.be.true;
			done();
		});

		it('should have only one user record in the database corresponding to this coinbase user', function (done) {
			User.find({ 'coinbase.name': coinbaseReq.user.coinbase.name}, function (err, r) {
				expect(err).to.be.null;
				expect(r).to.have.length(1);
				expect(r.google).to.not.be.null;
				done();
			});
		});

	});
}();
