// google.spec.js - the google oauth2 provider tests to make sure configuration is setup correctly


var User = require('../../models/User');

module.exports = function () {

	describe('google oAuth2 processing', function () {

		it('should create user session for google user', function (done) {
			expect(googleReq.isAuthenticated()).to.be.true;
			done();
		});

		it('should have only one user record in the database corresponding to this google user', function (done) {
			User.find({ 'google.id': googleReq.user.google.id}, function (err, r) {
				expect(err).to.be.null;
				expect(r).to.have.length(1);
				expect(r.google).to.not.be.null;
				done();
			});
		});

	});
}();
