import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export default class Navbar extends React.Component {
	componentDidMount() {
		this.handleUnderlines();
	}

	handleUnderlines() {
		const listItems = document.getElementsByClassName(styles.listItemContainer);
		for (let item of listItems) {
			item.addEventListener('mouseenter', (e) => {
				item.children[1].classList.add(styles.listItemUnderlineActive);
			});
			item.addEventListener('mouseleave', () => {
				item.children[1].classList.remove(styles.listItemUnderlineActive);
			});
		}
	}

	render() {
		return (
			<div>
				<nav id={styles.nav}>
					<Link to="/" className={styles.link}>
						<h1 id={styles.title}>bluelook</h1>
					</Link>
					<ul className={styles.list}>
						<div className={styles.listItemContainer}>
							<Link to="/communities" className={styles.link}>
								<li>Communities</li>
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
					<div>
						<ul className={styles.list}>
							<div className={styles.listItemContainer}>
								<Link to="/create" className={styles.link}>
									<li>Create</li>
								</Link>
								<div className={styles.listItemUnderline}></div>
							</div>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}
