import React from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import Button from  'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';

import '../scss/main.scss';

export default class App extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<Router history={hashHistory}>
				<span>
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/dashboard" component={Dashboard} />
				</span>
			</Router>
		);
	}
}