import reqwest from 'reqwest'

// A class to perform basic CRUD operations on contacts on the server

export default class ContactModal {
	// Inserts a contact and calls a callback with the new contact data
	// after the async call returns
	static insert( data, callback ) {
		const query = JSON.stringify( {
			query: `mutation contacts_mutation($first_name:String, $last_name:String){
					  add( first_name:$first_name,
					       last_name:$last_name ){
					    first_name
					    last_name
					  }
					}`,
			variables: data
		} );
		doGQLRequest( query, (result) => {
			callback( result.data.add );
		} );
	}


	// Modifies a contact and calls a callback with the new data after 
	// the async call returns
	static update( id, data, callback ) {
		const query = JSON.stringify( {
			query: `mutation contacts_mutation($first_name:String, $last_name:String){
					  update( first_name:$first_name,
					       last_name:$last_name ){
					    first_name
					    last_name
					  }
					}`,
			variables: data
		} );

		doGQLRequest( query, (result) => {
			console.log( "update returned ", result );
			callback( result.data.update );
		} );
	}

	// Deletes a contact and calls a callback after the async call returns
	static delete( id, callback ) {
		const query = JSON.stringify( {
			query: `mutation contacts_mutation{
			  delete (
			    id: "${id}"
			  ) 
			}`
		} );

		doGQLRequest( query, (result) => {
			callback( id );
		} );
	}

	// Pulls back a list of all contacts associated to the logged in user
	static getAll( callback ) {
		const query = JSON.stringify( {
			query: `{ contacts {
				id
			    first_name
			    last_name
			} }`
		} );

		doGQLRequest( query, (result) => {
			callback( result.data.contacts );
		} );
	}

	// Pulls the contact data associated to the contact with id
	static getOneById( id, callback ) {
		const query = JSON.stringify( {
			query: `{ contacts( id: ${id} ){
					{
						id
					    first_name
					    last_name
					    email
					}
				} }`,
			variables: data
		} );

		doGQLRequest( query, (result) => {
			console.log( "update returned ", result );
			callback( result.data.contacts );
		} );
	}
}

// A "private" method to call to send ajax requests to GQL
function doGQLRequest( data, callback ) {
	reqwest( {
		url: '/api/gql?raw',
		method: 'post',
		contentType: 'application/json',
		accept: 'application/json',
		data: data,
		success: (res) => {
			if( typeof callback == 'function' ) {
				callback( res );
			}
		}
	} );
}