// twitter.spec.js - the twitter oauth2 provider tests to make sure configuration is setup correctly


var User = require('../../models/User');

module.exports = function () {

	describe('twitter oAuth2 processing', function () {

		it('should create user session for twitter user', function (done) {
			expect(twitterReq.isAuthenticated()).to.be.true;
			done();
		});

		it('should have one user record in the database corresponding to this twitter user', function (done) {
			User.find({ 'twitter.id': twitterReq.user.twitter.id}, function (err, r) {
				expect(err).to.be.null;
				expect(r).to.have.length(1);
				done();
			});
		});

	});


}();
