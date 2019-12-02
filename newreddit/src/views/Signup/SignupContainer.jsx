import React from 'react';
import { createUser } from '../../utils/firebase/auth';

import Signup from './Signup';

export default class SignupContainer extends React.Component {
	signup({ username, email, password }) {
		createUser({ username, email, password });
		this.props.history.push('/');
	}

	render() {
		return (
			<Signup
				signup={({ username, email, password }) => {
					this.signup({ username, email, password });
				}}
			></Signup>
		);
	}
}
