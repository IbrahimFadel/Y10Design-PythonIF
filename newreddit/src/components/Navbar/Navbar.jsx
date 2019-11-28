import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

export default class Navbar extends React.Component {
	componentDidMount() {
		this.handleUnderlines();
	}

	handleUnderlines() {
		const listItems = document.getElementsByClassName(styles.listItemContainer);
		for (let item of listItems) {
			item.addEventListener("mouseenter", e => {
				item.children[1].classList.add(styles.listItemUnderlineActive);
			});
			item.addEventListener("mouseleave", () => {
				item.children[1].classList.remove(styles.listItemUnderlineActive);
			});
		}
	}

	render() {
		return (
			<div>
				<nav id={styles.nav}>
					<h1 id={styles.title}>bluelook</h1>
					<ul id={styles.list}>
						<div className={styles.listItemContainer}>
							<Link to="/" className={styles.link}>
								<li>test</li>
							</Link>
							<div className={styles.listItemUnderline}></div>
						</div>
						<div className={styles.listItemContainer}>
							<li>test</li>
							<div className={styles.listItemUnderline}></div>
						</div>
						<div className={styles.listItemContainer}>
							<li>test</li>
							<div className={styles.listItemUnderline}></div>
						</div>
						<div className={styles.listItemContainer}>
							<Link to="/login" className={styles.link}>
								<li>Login/Signup</li>
							</Link>
							<div className={styles.listItemUnderline}></div>
						</div>
					</ul>
				</nav>
			</div>
		);
	}
}
