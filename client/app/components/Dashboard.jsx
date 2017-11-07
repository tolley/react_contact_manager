import React from 'react';
import reqwest from 'reqwest';

import CreateContact from './CreateContact';
import ContactModel from './ContactModel';
import ContactsList from './ContactsList.jsx';
import ContactsGrid from './ContactsGrid.jsx';

export default class Dashboard extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			showCreateContactDlg: false,
			contactsViewMode: "list",
			contacts: []
		};
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
		if( this.state.contacts && this.state.contacts.length > 0 ) {
			if( this.state.contactsViewMode == "list" ) {
				return <ContactsList contacts={this.state.contacts}
							delete={(cid)=>this.onDeleteContact(cid)} />;
			} else if( this.state.contactsViewMode == "grid" ) {
				return <ContactsGrid contacts={this.state.contacts}
							delete={(cid)=>this.onDeleteContact(cid)} />;
			}
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