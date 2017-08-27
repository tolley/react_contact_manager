// Handles the setup for express-graphql
var		graphqlHTTP	= require( 'express-graphql' )
		,schema		= require( '../../schema' )
		,config		= require( '../../config' )
		,verifyUser	= require( '../modules/isLoggedIn' );

const urlPrefix = config.urlPrefix;

module.exports = function( app ) {
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