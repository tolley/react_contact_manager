// A function to use as middleware to enforce logged in user access
module.exports = function( req, res, next ) {
	if( req && req.user ) {
		console.log( 'isLoggedIn found req.user, calling next' );
		return next();
	}
	else {
		console.log( 'isLoggedIn could not find req.user' );
		res.redirect( '/#/login' );
	}
}