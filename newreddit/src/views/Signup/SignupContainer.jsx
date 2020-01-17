import React from 'react';
import { createUser } from '../../utils/firebase/auth';

import Signup from './Signup';

export default class SignupContainer extends React.Component {
	signup({ username, email, password, type }) {
		createUser({ username, email, password, type });
		this.props.history.push('/');
	}

	render() {
		return (
			<Signup
				signup={({ username, email, password, type }) => {
					this.signup({ username, email, password, type });
				}}
			></Signup>
		);
	}
}
