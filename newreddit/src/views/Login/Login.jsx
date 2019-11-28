import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import styles from "./styles.module.scss";

export default class Login extends React.Component {
	componentDidMount() {
		const signup = document.getElementById(styles.link);
		signup.addEventListener("mouseenter", () => {
			document
				.getElementById(styles.underline)
				.classList.add(styles.underlineActive);
		});
		signup.addEventListener("mouseleave", () => {
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
						<Link to="/signup" id={styles.link}>
							Signup
						</Link>
						<div id={styles.underline}></div>
					</div>
					<div id={styles.inputs}>
						<label>Username, or Email</label>
						<input type="text" className={styles.input}></input>
						<label>Password</label>
						<input type="password" className={styles.input}></input>
					</div>
				</form>
			</div>
		);
	}
}
