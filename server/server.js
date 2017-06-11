// Requires
var express			= require( 'express' )
	,session 		= require( 'express-session' )
	,redisStore		= require( 'connect-redis' )( session )
	,bodyParser		= require( 'body-parser' )
	,config			= require( './config')
	,cookieParser	= require( 'cookie-parser' )
	,graphQlSetup	= require( './app/controllers/graphql' )
	,passport		= require( 'passport' )
	,uuid			= require( 'uuid' );

// Create our redis store object here so both express and socket.io can use it
var redisLocalStore = new redisStore( config.redisStoreOptions );

// Create our http server object
var app = express();

// Tell our server to render static files from the public directory
app.use( express.static( './public' ) );

// Plug our middleware into express
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json( {} ) );
app.use( cookieParser( config.signedCookieSecret, {} ) );

// Passport's session piggy backs on express-session
app.use( session( {
	genid:	function( req ) {
		return uuid.v4();
	},
	secret: config.hashKey,
	saveUninitialized: false,
	resave: false
} ) );

// Configure passport for local logins
require( './config/passport' )( passport );
app.use( passport.initialize() );
app.use( passport.session() );

// Setup graphql
graphQlSetup( app );

// Make sure a user is logged in for all /contacts/* routes
// app.use( '/contacts', verifyUser );

// Include/initialize our controllers
require( './app/controllers/AuthController.js' ).controller( app );
require( './app/controllers/UserController.js' ).controller( app );
// require( './controllers/contactController.js' ).controller( app );

// Set up the http server so that it listen for requests
app.listen( config.server.port, function() {
	console.log( 'Webserver running on port ' + config.server.port );
} );

// Test route to make sure this works
app.get( '/api/test', function( req, res ) {
	console.log( 'req.user = ', req.user );
	res.end();
} );

