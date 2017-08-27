// A list of fields for a contact
var gql = require( 'graphql' );

module.exports = {
	all: {
		id: {
			type: gql.GraphQLString,
			description: 'The primary key identifying a contact'
		},
		first_name: {
			type: gql.GraphQLString,
			description: 'The contact\'s first name'
		},
		last_name: {
			type: gql.GraphQLString,
			description: 'The contact\'s last name'
		},
		email_address: {
			type: gql.GraphQLString,
			description: '' 
		},
		phone: {
			type: gql.GraphQLString,
			description: 'The contact\'s phone number'
		},
		street_address: {
			type: gql.GraphQLString,
			description: 'The contact\'s street address'
		},
		street_address2: {
			type: gql.GraphQLString,
			description: 'The second line of the contact\'s street address'
		},
		city: {
			type: gql.GraphQLString,
			description: 'The contact\'s city'
		},
		state: {
			type: gql.GraphQLString,
			description: 'The contact\'s state'
		},
		zip: {
			type: gql.GraphQLString,
			description: 'The contact\'s zip code'
		}
	},
	insertable: {
		first_name: {
			type: gql.GraphQLString,
			description: 'The contact\'s first name'
		},
		last_name: {
			type: gql.GraphQLString,
			description: 'The contact\'s last name'
		},
		email_address: {
			type: gql.GraphQLString,
			description: '' 
		},
		phone: {
			type: gql.GraphQLString,
			description: 'The contact\'s phone number'
		},
		street_address: {
			type: gql.GraphQLString,
			description: 'The contact\'s street address'
		},
		street_address2: {
			type: gql.GraphQLString,
			description: 'The second line of the contact\'s street address'
		},
		city: {
			type: gql.GraphQLString,
			description: 'The contact\'s city'
		},
		state: {
			type: gql.GraphQLString,
			description: 'The contact\'s state'
		},
		zip: {
			type: gql.GraphQLString,
			description: 'The contact\'s zip code'
		}
	}
}