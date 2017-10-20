import React from 'react';
import reqwest from 'reqwest';

import CreateContact from './CreateContact';
import ContactModel from './ContactModel';

export default class Dashboard extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			showCreateContactDlg: false,
			contacts: []
		};

/*		$.get( '/api/auth/verify', '{user(id: 6){username id}}', 
			(data) => {
				if( ! data || ! data.logged_in ) {
					console.log( 'need to redirect to /#login' );
				}
			}, 'json' );
*/
	}

	componentWillMount() {
		// Pull a list of all contacts
		ContactModel.getAll( (contacts) => {
			var contactsArray = [];
			for( var n in contacts ) {
				contactsArray.push( contacts[n] );
			}
			this.setState( { contacts: contactsArray } );
		} );
	}
 
	closeCreateContactDlg() {
		this.setState( { showCreateContactDlg: "false" } );
	}

	openCreateContactDlg() {
		this.setState( { showCreateContactDlg: "true" } );
	}

	onNewContactAdd( newContact ) {
		// Add the new state to the contacts object
		this.setState( {
			showCreateContactDlg: false,
			contacts: this.state.contacts.push( newContact )
		} );
	}

	onDeleteContact( cid ) {
		ContactModel.delete( cid, (cid) => {
			var contactsArray = this.state.contacts.filter( function( obj ) {
				return obj.id !== cid;
			} );

			this.setState( {
				contacts: contactsArray
			} );
		} );
	}

	renderContacts() {
		// Make sure there are contacts to render
		if( this.state.contacts || this.state.contacts.length > 0 ) {
			let contactElems = this.state.contacts.map( ( contact ) => {
				return (
					<li key={contact.first_name + ' ' + contact.last_name}>
						{contact.first_name + ' ' + contact.last_name}
						<a href="javascript:void(0)" 
							onClick={()=>{this.onDeleteContact(contact.id)}}>
								x
						</a>
					</li>
				);
			} );
			return <ul className="contacts_list">{contactElems}</ul>
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
					closeMethod={() => {this.closeCreateContactDlg()}}
					onNewContact={(newContact) => {
						var allContacts = this.state.contacts;
						allContacts.push( newContact );

						this.setState( {
							contacts: allContacts
						} );
					}} />
			</span>
		)
	}
}