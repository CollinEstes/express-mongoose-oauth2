var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	runSequence = require('run-sequence'),
	gUtil = require('gulp-util'),
	exit = require('gulp-exit'),
	watch = require('gulp-watch');


var JS = ['models/*.js', 'config/strategies/*.js'],
	TEST_ENTRY_JS = 'index.spec.js',
	SPEC_JS = 'test/**/*.js';


/********************************
*  Default task
********************************/
gulp.task('default', function () {
	runSequence('lint', 'test');
});


/********************************
*  lint it real good...
********************************/
gulp.task('lint', function () {
	return gulp.src(JS)
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'));
});

/********************************
*  Test yo-self  NOTE:  I COULDN'T GET THESE TO RUN ALL AT ONCE...
********************************/
gulp.task('test', function () {
	require('./index.spec.js')();
});




