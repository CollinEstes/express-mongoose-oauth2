// phantom-github.spec.js - the phantomjs execution of a login to kick off integration test

var phantom = require('node-phantom-simple');
module.exports = function () {

	console.log('STARTING GITHUB INTEGRATION TEST (4sec)')
	phantom.create(function(err,ph) {
	  return ph.createPage(function(err,page) {
	    return page.open('http://localhost:9090/connect/github', function(err,status) {
	      console.log("opened site? ", status);


					page.onError = function(msg, trace) {
						console.log(msg);
					};
	        return page.evaluate(function() {
	          document.getElementById('login_field').value = '';   // ENTER USERID HERE
	          document.getElementById('password').value = '';		// ENTER PASSWORD HERE
	          document.getElementsByName('commit')[0].click();
	        }, function(err,result) {
	        	setTimeout(function () {
        			ph.exit();	
	          }, 4500);
	        });
	    });
	  });
	});

};