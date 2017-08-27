// Handles the setup for express-graphql
var		graphqlHTTP	= require( 'express-graphql' )
		,schema		= require( '../../schema' )
		,config		= require( '../../config' )
		,verifyUser	= require( '../modules/isLoggedIn' );

const urlPrefix = config.urlPrefix;

module.exports = function( app ) {
/*	function verifyUser( req, res, next ) {
		if( req && req.user ) {
			console.log( 'isLoggedIn found req.user, calling next' );
			return next();
		}
		else {
			console.log( 'isLoggedIn could not find req.user' );
			res.redirect( '/#/login' );
		}
	}
*/

	// Make sure a user is logged in for all /contacts/* routes
	// Uncomment this before committing!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	app.use( urlPrefix + '/gql', verifyUser );

	// Attached the graphql express object to the app to plug into the requests
	app.use( urlPrefix + '/gql', graphqlHTTP( function( req ) {
		return {
			schema,
			graphiql: true,
			pretty: true,
			rootValue: req.user,
		};
	} ) );


};