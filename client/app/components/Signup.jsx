import React from 'react';

export default class Signup extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return <form method="post" action="/api/user/signup">
			<h3>Signup</h3>
			<label for="username">
				Desired User Name:
			</label>
			<input type="text" name="username" />
			<br />

			<label for="password">
				Password
			</label>
			<input type="password" name="password" />
			<br />

			<label for="password">
				Repeat Password
			</label>
			<input type="password" name="repeat_password" />
			<br />			

			<input type="submit" value="Signup" />
		</form>
	}
}