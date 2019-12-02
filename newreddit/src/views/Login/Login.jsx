import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../utils/firebase/firebase';

import Navbar from '../../components/Navbar/Navbar';
import styles from './styles.module.scss';
import { Light } from '../../components/Button/Buttons';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.handleSignupLink();
	}

	handleSignupLink = () => {
		if (!this.props.user) {
			const signup = document.getElementById(styles.link);
			signup.addEventListener('mouseenter', () => {
				document
					.getElementById(styles.underline)
					.classList.add(styles.underlineActive);
			});
			signup.addEventListener('mouseleave', () => {
				document
					.getElementById(styles.underline)
					.classList.remove(styles.underlineActive);
			});
		}
	};

	login = async () => {
		const usernameOrEmail = document.getElementsByTagName('input')[0].value;
		const password = document.getElementsByTagName('input')[1].value;
		await this.props.login({ usernameOrEmail, password });
	};

	render() {
		if (this.props.user) {
			return (
				<div>
					<Navbar></Navbar>
					<h1 id={styles.title}>Login</h1>
					<div id={styles.loggedInContainer}>
						<h1 id={styles.loggedInTitle}>Logged In</h1>
						<p id={styles.logOut} onClick={this.props.logout}>
							Log out
						</p>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<Navbar></Navbar>
					<h1 id={styles.title}>Login</h1>
					<form id={styles.form}>
						<div id={styles.linkContainer}>
							<Link to="/signup" id={styles.link}>
								Signup
							</Link>
							<div id={styles.underline}></div>
						</div>
						<div id={styles.inputs}>
							<label>Username, or Email</label>
							<input
								type="text"
								className={styles.input}
								id={styles.usernameOrEmail}
							></input>
							<label>Password</label>
							<input
								type="password"
								className={styles.input}
								id={styles.password}
							></input>
						</div>
						<div>
							<Light text="Login" onClick={this.login}></Light>
						</div>
					</form>
				</div>
			);
		}
	}
}
