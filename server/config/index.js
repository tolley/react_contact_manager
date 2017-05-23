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

	urlPrefix: '/api'
}