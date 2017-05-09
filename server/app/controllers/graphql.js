// Handles the setup for express-graphql
var		graphqlHTTP	= require( 'express-graphql' )
		,schema		= require( '../../schema' );

module.exports = function( app ) {
	// Attached the graphql express object to the app to plug into the requests
	app.use( '/graphql', graphqlHTTP( function( req ) {
		return {
			schema,
			graphiql: true,
			pretty: true
		};
	} ) );


};