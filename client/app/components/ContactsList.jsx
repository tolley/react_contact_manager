import React from 'react';

/*
 * Expected props:
 * delete: function, takes in the id of a contact to delete
 * contacts: array of contacts
**/

export default class ContactsList extends React.Component{
	constructor( props ) {
		super( props );
	}

	render() {
		let contactElems = this.props.contacts.map( ( contact ) => {
			return (
				<tr key={contact.id}>
					<td>{contact.first_name}</td>
					<td>{contact.last_name}</td>
					<td>
						<a href="javascript:void(0)" 
							onClick={()=>{this.props.delete(contact.id)}}>
							x
						</a>
					</td>
				</tr>
			);
		} );

		return <table className="contacts_list">
				<tbody>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th></th>
					</tr>
					{contactElems}
				</tbody>
			</table>
	}
}