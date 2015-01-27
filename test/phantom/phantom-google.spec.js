// phantom-google.spec.js - the phantomjs execution of a login to kick off integration test

var phantom = require('node-phantom-simple');
module.exports = function () {

	console.log('STARTING GOOGLE INTEGRATION TEST (8sec)')
	phantom.create(function(err,ph) {
	  return ph.createPage(function(err,page) {
	    return page.open('http://localhost:9090/connect/google', function(err,status) {
	      console.log("opened site? ", status);


					page.onError = function(msg, trace) {
						console.log(msg);
					};
	        return page.evaluate(function() {
	          document.getElementById('Email').value = '';   // ENTER USERID HERE
	          document.getElementById('Passwd').value = '';		// ENTER PASSWORD HERE
	          document.getElementById('signIn').click();
	        }, function(err,result) {
	        	setTimeout(function () {
	          	return page.evaluate(function() {
	          		document.getElementById('submit_approve_access').click();
	          	}, function (err, result) {
	          		setTimeout(function () {
	          			ph.exit();	
	          		}, 4500)
	          	});
	          }, 4500);
	        });
	    });
	  });
	});

};