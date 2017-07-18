import React from 'react';
import $ from 'jquery';

import CreateContact from './CreateContact';

export default class Dashboard extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			showCreateContactDlg: false
		};

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

	closeCreateContactDlg() {
		this.setState( { showCreateContactDlg: "false" } );
	}

	openCreateContactDlg() {
		this.setState( { showCreateContactDlg: "true" } );
	}

	render() {
		return (
			<span>
				<h1>
					Welcome to the Dashboard!
				</h1>
				<br />

				<button onClick={() => {this.openCreateContactDlg()}}>
					Create Contact
				</button>
				<CreateContact
					open={this.state.showCreateContactDlg} 
					closeMethod={() => {this.closeCreateContactDlg()}} />
			</span>
		)
	}
}