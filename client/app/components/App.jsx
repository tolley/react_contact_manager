import React from 'react';
import Button from  'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

import Login from './Login';

export default class App extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<Login />
		);
	}
}