// Require our modules
var gulp = require( 'gulp' );
var watch = require( 'gulp-watch' );
var nodemon = require( 'gulp-nodemon' );
var jshint = require( 'gulp-jshint' );

// The list of all js files that we care about
var serverJsFiles = [
	'./app/*',
	'./config/*',
	'server.js'
];

gulp.task( 'lint', function() {
	return gulp.src( serverJsFiles )
			.pipe( jshint() );
} );

// Watch the server side js files and restart the server when one
// is modified
gulp.task( 'watch-server', function() {
	return nodemon( {
		script: 'server.js',
		ext: 'js',
		ignore: [ 'public/*', 'gulpfile.js' ]
	} );
} );

// Set up our development task
gulp.task( 'dev', [ 'watch-server' ] );
