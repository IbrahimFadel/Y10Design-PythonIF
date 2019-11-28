import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

export default class HoverableLink extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const link = document.getElementById(styles.container);
		link.addEventListener("mouseenter", () => {
			// document
			// .getElementById(styles.underline)
			// .classList.add(styles.underlineActive);
			console.log(link.clientWidth);
			document.getElementById(styles.underline).style.width =
				String(link.clientWidth) + "px";
		});
		link.addEventListener("mouseleave", () => {
			// document
			// .getElementById(styles.underline)
			// .classList.remove(styles.underlineActive);
			document.getElementById(styles.underline).style.width = "0px";
		});
	}

	render() {
		return (
			<div id={styles.container}>
				<Link to={this.props.to} id={styles.link}>
					{this.props.text}
				</Link>
				<div id={styles.underline}></div>
			</div>
		);
	}
}
