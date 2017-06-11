const sessionCookieName = 'sid';
const sessionSecret = 'n10aWY@j02skj-229-72jfaj';

module.exports = {
	// The config for the actual server
	server: {
		port: 8000
	},

	// The key for signed cookies
	signedCookieSecret: 'whynot',

	// The env (dev or prod)
	env: 'prod',

	// The secret key used in hashing user passwords
	hashKey: 'l0v3s3xs3cr3tg0d',

	urlPrefix: '/api',

	// The session config, minus the store object
	sessionConfig: { 
		name: sessionCookieName,
		cookie: {
			maxAge: 60 * 60 * 24 * 1000 * 2, // 2 days
			httpOnly: true
		},
		secret: sessionSecret,
		proxy: true,
		resave: true,
		saveUninitialized: false
	},

	redisStoreOptions: {
		ttl: 60 * 60 * 12, // 12 hours
		logErrors: function( err ) {
			console.log( 'Session Error: ', err )
		}
	}
}