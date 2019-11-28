import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Button/Button';

export default class Signup extends React.Component {
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

	render() {
		return (
			<div>
				<Navbar></Navbar>
				<h1 id={styles.title}>Login</h1>
				<form id={styles.form}>
					<div id={styles.linkContainer}>
						<Link to="/login" id={styles.link}>
							Login
						</Link>
						<div id={styles.underline}></div>
					</div>
					<div id={styles.inputs}>
						<label>Username</label>
						<input type="text" className={styles.input}></input>
						<label>Email</label>
						<input type="text" className={styles.input}></input>
						<label>Password</label>
						<input type="password" className={styles.input}></input>
					</div>
					<div>
						<Button type="dark" text="Signup"></Button>
					</div>
				</form>
			</div>
		);
	}
}
