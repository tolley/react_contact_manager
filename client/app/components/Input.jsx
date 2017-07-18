import React from 'react';
import {FormControl} from 'react-bootstrap';

export default class Input extends FormControl {
	constructor( props ) {
		super( props );

		this.state = {
			value: ( this.props.value )? this.props.value: ''
		}
	}

	handleChange(e) {
		this.setState( {value: e.target.value} );
	}

	getValue() {
		return this.state.value;
	}

	render() {
		return (
			<FormControl {...this.props}
				onChange={ (e)=>{this.handleChange(e) } }
				value={ this.state.value }  />
		);
	}
}