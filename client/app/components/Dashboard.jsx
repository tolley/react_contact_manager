import React from 'react';
import $ from 'jquery';

import CreateContact from './CreateContact';

export default class Dashboard extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			showCreateContactDlg: false,
			contacts: false
		};

		$.get( '/api/auth/verify', '{user(id: 6){username id}}', 
			(data) => {
				if( ! data || ! data.logged_in ) {
					console.log( 'need to redirect to /#login' );
				}
			}, 'json' );
	}

	componentWillMount() {
		// Load the contacts from the server
		$.post({
			url: '/api/gql',
			data: JSON.stringify( { query: "{ contacts {first_name, last_name} }" } ),
			contentType: 'application/json'
		})
		.done( (response) => {
			this.setState( { contacts: response.data.contacts } );
		} );
	}

	closeCreateContactDlg() {
		this.setState( { showCreateContactDlg: "false" } );
	}

	openCreateContactDlg() {
		this.setState( { showCreateContactDlg: "true" } );
	}

	renderContacts() {
		// Make sure there are contacts to render
		if( this.state.contacts || this.state.contacts.length > 0 ) {
			let contactElems = this.state.contacts.map( ( contact ) => {
				return (
					<li key={contact.first_name + ' ' + contact.last_name}>
						{contact.first_name + ' ' + contact.last_name}
					</li>
				);
			} );
			return <ul>{contactElems}</ul>
		} else {
			return (
				<span>
				No Contacts to show
				<br />
				</span>
			);
		}
	}

	render() {
		return (
			<span>
				<h1>
					Welcome to the Dashboard!
				</h1>
				<br />

				{this.renderContacts()}

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