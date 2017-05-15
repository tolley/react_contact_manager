var passport = require( 'passport' )
	,LocalStrategy = require( 'passport-local' ).Strategy
	,Users = require( '../app/models/Users' )
	,Sha1 = require( '../app/modules/sha1.js' );

module.exports = function( passport ) {
	// Used to serialize the user for the session
	passport.serializeUser( function( user, done ) {
		done( null, user.id );
	} );

	// Used to deserialize the user
	passport.deserializeUser( function( id, done ) {
		Users.findOne( { 
			where: { id: id }
		} )
		.then( function( user ) {
			return done( null, user.dataValues );
		} );
	} );

	// Configure the local strategy
	passport.use( 'local-login', new LocalStrategy( {
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, function( req, email, password, done ) {
		process.nextTick( function() {
			Users.findOne( { where: {
				password: Sha1.hash( req.body.password ),
				username: req.body.username
			} } )
			.then( function( result ) {
				if( result && result.dataValues ) {
					return done( null, result.dataValues );
				}
				else {
					return done( null, false );
				}

				// Not calling done here on purpose because it was sending
				// the success and failure page in the ajax response.  Those
				// are configured in AuthController
			} );
		} );
	} ) );
};
