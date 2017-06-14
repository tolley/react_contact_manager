// The graphql required schema definition
var resolver = require( 'graphql-sequelize' )
	,sequelize = require( 'sequelize' )
	,gql = require( 'graphql' )
  ,Contacts = require( './app/models/Contacts' );

let contactType = new gql.GraphQLObjectType( {
  name: 'Contacts',
  description: 'An individual contact',

  // Define the fields available fields that are associated to a given contact
  fields: {
    id: {
      type: gql.GraphQLInt,
      description: 'The primary key of the contact.'
    },
    user_id: {
      type: gql.GraphQLInt,
      description: 'The id of the user that owns this contact'
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
      description: 'The contact\'s email address' 
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
} );

let QueryType = new gql.GraphQLObjectType({
  name: 'Contacts',
  fields: function() {}
});


module.exports = new gql.GraphQLSchema( {
  query: new gql.GraphQLObjectType( {
    name: 'query',

    // Define the fields that the front end can send
    fields: {
      contacts: {
        type: contactType,
        // args will automatically be mapped to `where`
        args: {
          id: {
            type: gql.GraphQLInt,
            description: 'The primary key of the contact.'
          },
          user_id: {
            type: gql.GraphQLInt,
            description: 'The id of the user that owns this contact'
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
        resolve: new resolver.resolver(Contacts)
      }
    }
  } )
} );
