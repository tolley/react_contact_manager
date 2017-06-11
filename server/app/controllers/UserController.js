var config = require( '../../config' )
	,Users = require( '../models/Users' );

module.exports.controller = function( app ) {
	const urlPrefix = config.urlPrefix;

	app.post( urlPrefix + '/user/signup', function( req, res ) {
		// Make sure the user entered all the required data
		if( ! req.body || 
			! req.body.username || req.body.username.length == 0 ||
			! req.body.password || req.body.password.length == 0 ||
			! req.body.repeat_password || req.body.repeat_password.length == 0 ||
			req.body.password != req.body.repeat_password ) {
				res.send( { 'status': 'failure' } );
				res.end();
				return;
		} else {
			var userData = {
				username: req.body.username,
				password: req.body.password,
				source: 'local'
			};

			Users.build( userData )
				.save()
				.then( function( user ) {
					res.redirect( 301, '/#/main' );
					console.log( 'Here in users.save.then with user = ', user );
					res.end();
				} )
				.catch( function( err ) {
					res.redirect( 301, '/#/signup?please=tryagain' );
					console.log( 'here in users.save.error with err = ', err.errors[0].message );
					res.end();
				} );
		}
	} );
} 