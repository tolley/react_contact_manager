import React from 'react';
import Modal from 'react-modal';
import {Button} from 'react-bootstrap';
import Input from './Inputs/Input'
import reqwest from 'reqwest'

export default class CreateContact extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			open: props.open,
			formFields: {}
		};
	}

	componentWillReceiveProps( next ) {
		let open = ( next.open == "true" )? true: false;
		if( this.state.open != open ) {
			this.setState( {open: open} );
		}
	}

	handleChange( e ) {
		var targetField = e.currentTarget.name;
		var formFields = this.state.formFields;
		formFields[targetField] = e.currentTarget.value
		this.setState({formFields: formFields});
	}

	handleSubmit( e ) {
		e.preventDefault();

		// Send a graphql query to create a new contact
		reqwest( {
			url: '/api/gql?raw',
			method: 'post',
			contentType: 'application/json',
			accept: 'application/json',
			data: JSON.stringify( {
				query: `mutation contacts_mutation($first_name:String, $last_name:String){
						  add( first_name:$first_name,
						       last_name:$last_name ){
						    first_name
						    last_name
						  }
						}`,
				variables: this.state.formFields
			} ),
			success: (res) => {
				this.setState( {formFields: {}, open: false} );
			}
		} );
	}

	render() {
		return (
			<Modal isOpen={this.state.open}
					contentLabel="Create Contact">
				Modal!!
				<br />
				<button onClick={() => {this.props.closeMethod()}}>
					Cancel
				</button>
				<br />
				<form onSubmit={(e)=>{this.handleSubmit(e)}}>
					<div className="form_field">
						<span>First Name</span>
						<input type="text" name="first_name"
							value={this.state.formFields.first_name}
							onChange={(e)=>{this.handleChange(e)}} />
					</div>
					<br />
					<div className="form_field">
						<span>Last Name</span>
						<input type="text" name="last_name"
							value={this.state.formFields.last_name}
							onChange={(e)=>{this.handleChange(e)}} />
					</div>
					<br />
					<div className="form_field">
						<span>Email Address</span>
						<input type="text" name="email_address"
							value={this.state.formFields.email_address}
							onChange={(e)=>{this.handleChange(e)}} />
					</div>
					<br />
					<div className="form_field">
						<span>Phone</span>
						<input type="text" name="phone"
							value={this.state.formFields.phone}
							onChange={(e)=>{this.handleChange(e)}} />
					</div>
					<br />
					<div className="form_field">
						<span>Street Address</span>
						<input type="text" name="street_address"
							value={this.state.formFields.street_address}
							onChange={(e)=>{this.handleChange(e)}} />
					</div>
					<br />
					<div className="form_field">
						<span>Address 2</span>
						<input type="text" name="street_address2"
							value={this.state.formFields.street_address2}
							onChange={(e)=>{this.handleChange(e)}} />
					</div>
					<br />
					<div className="form_field">
						<span>City</span>
						<input type="text" name="city"
							value={this.state.formFields.city}
							onChange={(e)=>{this.handleChange(e)}} />
					</div>
					<br />
					<div className="form_field">
						<span>State</span>
						<input type="text" name="state"
							value={this.state.formFields.state}
							onChange={(e)=>{this.handleChange(e)}} />
					</div>
					<br />
					<div className="form_field">
						<span>Zip Code</span>
						<input type="text" name="zip"
							value={this.state.formFields.zip}
							onChange={(e)=>{this.handleChange(e)}} />
					</div>
					<br />
					<input type="submit" value="submit" />
				</form>
			</Modal>
		);
	}
}