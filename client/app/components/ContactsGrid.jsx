import React from 'react';

/*
 * Expected props:
 * delete: function, takes in the id of a contact to delete
 * contacts: array of contacts
**/

export default class ContactsGrid extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		let contactElems = this.props.contacts.map( ( contact ) => {
			return (
				<div className="contact_grid_item" key={contact.id}>
					<span>
						{contact.first_name + " " + contact.last_name}
					</span>
					<a href="javascript:void(0)" 
						onClick={()=>{this.props.delete(contact.id)}}>
						x
					</a>
					<br />
				</div>
			);
		} );

		return <div className="contacts_grid">
					{contactElems}
					<br />
		</div>
	}
}