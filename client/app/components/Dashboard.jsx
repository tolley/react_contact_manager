import React from 'react';

import $ from 'jquery';

export default class Dashboard extends React.Component {
	constructor( props ) {
		super( props );

		$.get( '/api/auth/verify', '{user(id: 6){username id}}', 
			(data) => {
				if( ! data || ! data.logged_in ) {
					console.log( 'need to redirect to /#login' );
				}

				$.post({
					url: '/api/gql',
					data: JSON.stringify( { query: "{ contacts(first_name: \"chris\") {first_name, last_name} }" } ),
					contentType: 'application/json'
				}).done( (response) => {
					console.log( 'gql returned ', response.data );
				} );
			}, 'json' );
	}

	render() {
		return (
			<h1>
				Dashboard loaded!1
			</h1>
		)
	}
}