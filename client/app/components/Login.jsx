import React from 'react';

export default class Login extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return <form method="post" action="/api/auth/locallogin">
			<h3>Login</h3>
			<label for="username">
				User Name:
			</label>
			<input type="text" name="username" />
			<br />

			<label for="password">
				Password
			</label>
			<input type="password" name="password" />
			<br />

			<input type="submit" value="Login" />
		</form>
	}
}