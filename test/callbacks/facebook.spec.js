// facebook.spec.js - the facebook oauth2 provider tests to make sure configuration is setup correctly


var User = require('../../models/User');

module.exports = function () {

	describe('facebook oAuth2 processing', function () {

		it('should create user session for facebook user', function (done) {
			expect(facebookReq.isAuthenticated()).to.be.true;
			done();
		});

		it('should have only one user record in the database corresponding to this facebook user', function (done) {
			User.find({ 'facebook.name': facebookReq.user.facebook.name}, function (err, r) {
				expect(err).to.be.null;
				expect(r).to.have.length(1);
				expect(r.google).to.not.be.null;
				done();
			});
		});

	});
}();
