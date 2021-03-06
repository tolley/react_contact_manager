const path = require( 'path' );
const webpack = require( 'webpack' );
var merge = require( 'merge' );
const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
	app: path.join( __dirname, 'app' ),
	build: path.join( __dirname, 'build' )
};

const common = {
	// Entry accepts a path or an object of entries.  We'll be using the
	// latter form given it's convenient with more complex configurations
	entry: {
		app: PATHS.app
	},
	// Add resolveextensions.
	// '' is needed to allow imports without an extension
	// Note the .'s before extensions as it will fail to match without
	resolve: {
		extensions: [ '', '.js', '.jsx' ]
	},
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
		{
			test: /\.scss$/,
			loaders: ['style','css','sass'],
			include: PATHS.app
		},
		{
			test: /\.css$/,
			loader: "style-loader!css-loader",
			include: PATHS.app

		},
		{
			test: /\.jsx$/,
			loaders: ['babel'],
			include: PATHS.app
		},
		{
			test: /\.json$/,
			loader: 'json-loader'
		},
		{
			test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
			loader: 'file-loader'
		} ]
		/////////////////////////////////////////////////////////////////////
/*		loaders: [ {
			// Test expects a regex.  Note the slashes
			test: /\.css$/,
			loaders: ['style', 'css'],
			// Include accepts either a path or an array of paths
			include: PATHS.app
		},
		{
			test: /\.jsx?$/,
			// Enable caching for improved performance during development
			// It uses default OS directory by default if you need something
			// more custom, pass a path to it. I.e., bable?cacheDirectory=<path>
			loaders: ['babel'],

			// Parse only app files! Without this it will go through the entire project.
			// In addition to being slow, that will most likely result in an error.
			include: PATHS.app
		} ]
*/
	}
};

// Default configuration.  We will return this if webpack is called outside of npm
if( TARGET === 'start' || ! TARGET ) {
	module.exports = merge( common, {
		devServer: {
			contentBase: PATHS.build,

			// testing
			disableHostCheck: true,
			public: 'rcm.com',

			// Enable history API fallback so HTML5 History API based
			// routing works.  This is a good default that will come in 
			// handy in more complicated setups
			historyApiCallback: true,
			hot: true,
			inline: true,
			progress: true,

			// Display only errors to reduce the amout of output
			stats: 'errors-only',

			// Parse host and port from env so this is easy to customize.
			// If you use Vagrant of Cloud 9 set
			// hosts: Process.env.HOST || '0.0.0.0';

			// 0.0.0.0 is available to all network devices unlikc default

			// local
			host: process.env.HOST,
			port: process.env.PORT
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	} );
}

if( TARGET === 'build' ) {
	module.exports = merge( common, {} );
}