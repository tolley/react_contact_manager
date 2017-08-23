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

var queryType = new gql.GraphQLObjectType( {
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
      resolve: new resolver.resolver( Contacts, {
        before: function( findOptions, args, context ) {
          // Add the id of the logged in user to the where clause so that user's can't 
          // query contacts for other users
          findOptions.where.user_id = context.user.id;
          return findOptions;
        }
      } )
    }
  }
} );

// The add/insert contact mutation
var mutationInsert = {
  type: contactType,
  descripton: "Inserts a new contact to the currently logged in user",
  args: {
    user_id: {
      name: 'The user that owns this contact',
      type: gql.GraphQLString
    },
    first_name: {
      name: 'The contacts first name',
      type: gql.GraphQLString
    },
    last_name: {
      name: 'The contacts last name',
      type: gql.GraphQLString
    }
  },
  resolve: function( root, args ) {
    return Contacts.build( args ).save();
  }
};

// The update/modify contact mutation
var mutationUpdate = {
  type: contactType,
  args: {
    id: {
      name: 'The primary key of the contact',
      type: new gql.GraphQLNonNull( gql.GraphQLString )
    },
    first_name: {
      name: 'The contacts first name',
      type: gql.GraphQLString
    },
    last_name: {
      name: 'The contacts last name',
      type: gql.GraphQLString
    }
  },
  resolve: function( root, args ) {
    // Build the where clause for use in the update and the following query
    const whereClause = {
      user_id: root.id,
      id: args.id
    };

    // Gather the data for the update
    var updateData = {};
    for( var n in args ) {
      if( n !== 'id' ) {
        updateData[n] = args[n];
      }
    };

    // Return a promise chain that will result in update contact data
    return Contacts.update( updateData, { 
      where: whereClause
    } )
    .then( function( numUpdated ) {
      return Contacts.findOne( {
        where: whereClause
      } );
    } );
  }
};

// The delete mutation
var mutationDelete = {
  type: gql.GraphQLString,
  args: {
    id: {
      name: 'The primary key of the contact',
      type: new gql.GraphQLNonNull( gql.GraphQLString )
    }
  },
  resolve: function( root, args ) {
    // Build the where clause for the delete
    const whereClause = {
      user_id: root.id,
      id: args.id
    };

    return Contacts.destroy( { where: whereClause } )
      .then( function( rowsDeleted ) {
        console.log( 'rowsDeleted = ', rowsDeleted );

        let returnVal = "";

        if( rowsDeleted !== 1 ) {
          returnVal = "Contact failed to delete";
        } else {
          returnVal = "Contact was deleted";
        }

        return returnVal;
      } );
  }
};

var mutationType = new gql.GraphQLObjectType( {
  name: 'contacts_mutation',

  fields: {
    add: mutationInsert,
    update: mutationUpdate,
    delete: mutationDelete
  }
} );

module.exports = new gql.GraphQLSchema( {
  query: queryType,
  mutation: mutationType
} );
