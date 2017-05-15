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
	password_hash_key: 'lovesexsecretgod',

	urlPrefix: '/api'
}