import React from 'react';

export default class Error extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		if( this.props.message && this.props.message.length > 0 ) {
			return ( 
				<div className="error">
					{this.props.message}
				</div>
			);
		} else {
			return null;
		}
	}
}