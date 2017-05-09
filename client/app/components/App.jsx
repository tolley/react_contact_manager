import React from 'react';
import Button from  'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

export default class App extends React.Component {
	constructor( props ) {
		// Call the parent constructor with the properties so they'll be set
		// across this component's lifetime
		super( props );
	}

	render() {
		return (
			<div>
				<ButtonGroup>
					<Button onClick={() => { this.buttonClick() }}>
						Default
					</Button>
				</ButtonGroup>
			</div>
		);
	}

	buttonClick() {
		alert( 'button was clicked' );
		console.log( this );
	}
}