import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import Navbar from '../../components/Navbar/Navbar';
import { Light } from '../../components/Button/Buttons';

export default class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: null,
			email: null,
			password: null,
		};
	}

	componentDidMount() {
		const login = document.getElementById(styles.link);
		login.addEventListener('mouseenter', () => {
			document
				.getElementById(styles.underline)
				.classList.add(styles.underlineActive);
		});
		login.addEventListener('mouseleave', () => {
			document
				.getElementById(styles.underline)
				.classList.remove(styles.underlineActive);
		});
	}

	clearInputs() {
		document.getElementById('usernameInput').value = '';
		document.getElementById('emailInput').value = '';
		document.getElementById('passwordInput').value = '';
	}

	render() {
		return (
			<div>
				<Navbar></Navbar>
				<h1 id={styles.title}>Signup</h1>
				<form id={styles.form}>
					<div id={styles.linkContainer}>
						<Link to="/login" id={styles.link}>
							Login
						</Link>
						<div id={styles.underline}></div>
					</div>
					<div id={styles.inputs}>
						<label>Username</label>
						<input
							type="text"
							className={styles.input}
							id="usernameInput"
						></input>
						<label>Email</label>
						<input type="text" className={styles.input} id="emailInput"></input>
						<label>Password</label>
						<input
							type="password"
							className={styles.input}
							id="passwordInput"
						></input>
						<label>Account type</label>
						<select className={styles.input} id="typeInput">
							<option>Public</option>
							<option>Private</option>
						</select>
					</div>
					<div>
						<Light
							text="Signup"
							onClick={() => {
								this.props.signup({
									username: document.getElementById('usernameInput').value,
									email: document.getElementById('emailInput').value,
									password: document.getElementById('passwordInput').value,
									type: document.getElementById('typeInput').value,
								});
								this.clearInputs();
							}}
						></Light>
					</div>
				</form>
			</div>
		);
	}
}
