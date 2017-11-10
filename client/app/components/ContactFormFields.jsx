import React from 'react';

/*
 * Expected props:
 * handleChange: function, fieldName and newValue (strings)
 * fields: object, contains all of the contact's fields
**/

export default class ContactFormFields extends React.Component {
	constructor( props ) {
		super( props );
	}

	handleChange( e ) {
		console.log( '1, e = ', e );

		// Get the field name and it's value from the event object and
		// pass it back up to the parent object to save
		var fieldName = e.currentTarget.name;
		var fieldValue = e.currentTarget.value;

		console.log( 'name = ', fieldName, ' value = ', fieldValue );

		this.props.handleChange( fieldName, fieldValue );
	}

	render() {
		return (<span>
			<div className="form_field">
				<span>First Name</span>
				<input type="text" name="first_name"
					value={this.props.fields.first_name}
					onChange={(e)=>{this.handleChange(e)}} />
			</div>
			<br />
			<div className="form_field">
				<span>Last Name</span>
				<input type="text" name="last_name"
					value={this.props.fields.last_name}
					onChange={(e)=>{this.handleChange(e)}} />
			</div>
			<br />
			<div className="form_field">
				<span>Email Address</span>
				<input type="text" name="email_address"
					value={this.props.fields.email_address}
					onChange={(e)=>{this.handleChange(e)}} />
			</div>
			<br />
			<div className="form_field">
				<span>Phone</span>
				<input type="text" name="phone"
					value={this.props.fields.phone}
					onChange={(e)=>{this.handleChange(e)}} />
			</div>
			<br />
			<div className="form_field">
				<span>Street Address</span>
				<input type="text" name="street_address"
					value={this.props.fields.street_address}
					onChange={(e)=>{this.handleChange(e)}} />
			</div>
			<br />
			<div className="form_field">
				<span>Address 2</span>
				<input type="text" name="street_address2"
					value={this.props.fields.street_address2}
					onChange={(e)=>{this.handleChange(e)}} />
			</div>
			<br />
			<div className="form_field">
				<span>City</span>
				<input type="text" name="city"
					value={this.props.fields.city}
					onChange={(e)=>{this.handleChange(e)}} />
			</div>
			<br />
			<div className="form_field">
				<span>State</span>
				<input type="text" name="state"
					value={this.props.fields.state}
					onChange={(e)=>{this.handleChange(e)}} />
			</div>
			<br />
			<div className="form_field">
				<span>Zip Code</span>
				<input type="text" name="zip"
					value={this.props.fields.zip}
					onChange={(e)=>{this.handleChange(e)}} />
			</div>
			<br />
		</span>)
	}
}