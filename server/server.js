// Requires
var express			= require( 'express' )
	,bodyParser		= require( 'body-parser' )
	,config			= require( './config')
	,cookieParser	= require( 'cookie-parser' )
	,graphQlSetup	= require( './app/controllers/graphql' );

// Create our http server object
var app = express();

// Tell our server to render static files from the public directory
app.use( express.static( './public' ) );

// Plug our middleware into express
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json( {} ) );
app.use( cookieParser( config.signedCookieSecret, {} ) );

// Setup graphql
graphQlSetup( app );

// Make sure a user is logged in for all /contacts/* routes
// app.use( '/contacts', verifyUser );

// Include/initialize our controllers
// require( './controllers/userController.js' ).controller( app );
// require( './controllers/contactController.js' ).controller( app );

// Set up the http server so that it listen for requests
app.listen( config.server.port, function() {
	console.log( 'Webserver running on port ' + config.server.port );
} );

// Test route to make sure this works
app.get( '/test', function( req, res ) {
	res.send( 'Hello Server!' );
	res.end();
} );

