// The graphql required schema definition
var resolver = require( 'graphql-sequelize' )
	,sequelize = require( 'sequelize' )
	,gql = require( 'graphql' )
  ,Contacts = require( './app/models/Contacts' )
  contactFields = require( './schema/contact' );

let contactType = new gql.GraphQLObjectType( {
  name: 'Contacts',
  description: 'An individual contact',

  // Define the fields available that are associated to a given contact
  fields: contactFields
} );

module.exports = new gql.GraphQLSchema( {
  query: new gql.GraphQLObjectType( {
    name: 'contacts',

    // The return type for this query
    type: new gql.GraphQLList( contactType ),

    // Define the fields that the front end can send
    fields: {
      contacts: {
        // The type of data this query returns
        type: new gql.GraphQLList( contactType ),

        // Let the user query on all fields for now
        // args will automatically be mapped to `where`
        args: contactFields,

        // Plug in the sequelize Contacts model to use to resolve queries
        resolve: new resolver.resolver(Contacts)
      }
    }
  } ),
  mutation: new gql.GraphQLObjectType( {
    name: 'contacts_mutation',

    // Allow mutations on all fields for now
    fields: contactFields
  } )
} );
