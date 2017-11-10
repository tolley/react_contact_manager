import React from 'react';
import Modal from 'react-modal';
import {Button} from 'react-bootstrap';
import Input from './Inputs/Input';
import reqwest from 'reqwest';

import ContactModel from './ContactModel';
import ContactFormFields from './ContactFormFields';

export default class CreateContact extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			open: props.open,
			fields: {
				first_name: "",
				last_name: "",
				email_address: "",
				phone: "",
				street_address: "",
				street_address2: "",
				city: "",
				state: "",
				zip: ""
			}
		};
	}

	componentWillReceiveProps( next ) {
		let open = ( next.open == "true" )? true: false;
		if( this.state.open != open ) {
			this.setState( {open: open} );
		}
	}

	handleChange( fieldName, newValue ) {
		var fields = this.state.fields;

		if( fieldName in fields ) {
			fields[fieldName] = newValue
			this.setState({fields: fields});
		}
	}

	handleSubmit( e ) {
		e.preventDefault();
		ContactModel.insert( this.state.fields, this.props.onNewContact );
		
		this.setState( {
			fields: {}
		} );

		if( this.props.closeMethod && 
			typeof this.props.closeMethod == 'function' ) {
				this.props.closeMethod();
		}

		return false;
	}

	render() {
		return (
			<Modal isOpen={this.state.open}
					contentLabel="Create Contact">
				<form onSubmit={(e)=>{this.handleSubmit(e)}}>
					<input type="submit" value="Submit" />
					<button onClick={() => {this.props.closeMethod(); return false;}}>
						Cancel
					</button>
					<br />
					
					<ContactFormFields handleChange={(name, value) => {
											this.handleChange(name, value)}
										}
										fields={(fieldName, newValue) => {
											this.handleChange(fieldName, newValue)}
										} />
				</form>
			</Modal>
		);
	}
}