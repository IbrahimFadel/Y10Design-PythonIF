import React from 'react';

import Login from './Login';
import { auth } from '../../utils/firebase/firebase';
import { login } from '../../utils/firebase/auth';

export default class LoginContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: undefined,
			loaded: false,
		};
	}

	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					user,
					loaded: true,
				});
			} else {
				this.setState({
					user: undefined,
					loaded: true,
				});
			}
		});
	}

	logout = () => {
		auth.signOut().then(() => {
			this.setState({
				user: null,
			});
		});
	};

	login = async ({ usernameOrEmail, password }) => {
		const user = await login({ usernameOrEmail, password });
		this.setState({
			user,
		});
	};

	render() {
		if (this.state.loaded) {
			return (
				<Login
					login={this.login}
					logout={this.logout}
					user={this.state.user}
				></Login>
			);
		} else {
			return <h1>Loading</h1>;
		}
	}
}
