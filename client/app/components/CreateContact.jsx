import React from 'react';
import Modal from 'react-modal';
import {Button} from 'react-bootstrap';

export default class CreateContact extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			open: props.open
		};
	}

	componentWillReceiveProps( next ) {
		let open = ( next.open == "true" )? true: false;
		if( this.state.open != open ) {
			this.setState( {open: open} );
		}
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
			</Modal>
		);
	}
}