// phantom-coinbase.spec.js - the phantomjs execution of a login to kick off integration test

var phantom = require('node-phantom-simple');
module.exports = function () {

	console.log('STARTING COINBASE INTEGRATION TEST (4sec)')
	phantom.create(function(err,ph) {
	  return ph.createPage(function(err,page) {
	    return page.open('http://localhost:9090/connect/coinbase', function(err,status) {
	      console.log("opened site? ", status);


					page.onError = function(msg, trace) {
						console.log(msg);
					};
					setTimeout(function() {
						return page.evaluate(function() {
		          document.getElementById('email').value = '';   // ENTER USERID HERE
		          document.getElementById('password').value = '';		// ENTER PASSWORD HERE
		          document.getElementById('signin_button').click();
		        }, function(err,result) {
		        	setTimeout(function () {
	        			ph.exit();	
		          }, 4500);
		        });


					}, 4000);
	    });
	  });
	});

};