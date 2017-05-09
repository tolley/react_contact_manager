// The graphql required schema definition
var resolver = require( 'graphql-sequelize' )
	,sequelize = require( 'sequelize' )
	,gql = require( 'graphql' );

let User = require( './app/models/Users' );

let userType = new gql.GraphQLObjectType( {
  name: 'User',
  description: 'A user',
  fields: {
    id: {
      type: new gql.GraphQLNonNull( gql.GraphQLInt ),
      description: 'The id of the user.'
    },
    username: {
      type: gql.GraphQLString,
      description: 'The name of the user.'
    },
    password: {
    	type: gql.GraphQLString,
    	description: 'The user\'s password'
    }
  }
} );


module.exports = new gql.GraphQLSchema( {
  query: new gql.GraphQLObjectType( {
    name: 'RootQueryType',
    fields: {
      user: {
        type: userType,
        // args will automatically be mapped to `where`
        args: {
          id: {
            description: 'id of the user',
            type: new gql.GraphQLNonNull(gql.GraphQLInt)
          },
          username: {
          	description: 'the user\'s username',
          	type: gql.GraphQLString
          }
        },
        resolve: new resolver.resolver(User)
      }
    }
  } )
} );
