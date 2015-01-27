// github.spec.js - the github oauth2 provider tests to make sure configuration is setup correctly


var User = require('../../models/User');

module.exports = function () {

	describe('github oAuth2 processing', function () {

		it('should create user session for github user', function (done) {
			expect(githubReq.isAuthenticated()).to.be.true;
			done();
		});

		it('should have only one user record in the database corresponding to this github user', function (done) {
			User.find({ 'github.id': githubReq.user.github.id}, function (err, r) {
				expect(err).to.be.null;
				expect(r).to.have.length(1);
				expect(r.github).to.not.be.null;
				done();
			});
		});

	});
}();
