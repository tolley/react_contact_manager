var passport = require( 'passport' )
	,isLoggedIn = require( '../modules/isLoggedIn' )
	,config = require( '../../config' );

module.exports.controller = function( app ) {
	const urlPrefix = config.urlPrefix;

	//////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////// Begin local login ////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////

	// Handles the submission of the login form
	app.post( urlPrefix + '/auth/locallogin', passport.authenticate( 'local-login', {
		successRedirect: '/#dashboard',
		failureRedirect: '/#?status=fail',
	} ) );

	app.get( urlPrefix + '/auth/logout', function( req, res ) {
		req.logout();
		res.redirect( '/#/login?' );
	} );

	app.post( urlPrefix + '/auth/signup', function( req, res ) {
		console.log( req.body );
		res.end();
	} );

	//////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////// End local login ////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////


	//////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////// Test methods //////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////

	// A method to test the isLoggedIn middleware
/*	app.get( urlPrefix + '/auth/testmiddleware', isLoggedIn, function( req, res ) {
		res.send( 'You should only see this if you are logged in' );
		console.log( 'req.user = ', req.user );
	} );
*/

	app.get( urlPrefix + '/auth/verify', function( req, res ) {
		if( req && req.user ) {
			res.send( {'logged_in': true } );
		} else {
			res.send( {'logged_in': false } );
		}
	} );
};
