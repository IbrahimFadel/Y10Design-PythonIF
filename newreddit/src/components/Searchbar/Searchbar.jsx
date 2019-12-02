import React from 'react';

import styles from './styles.module.scss';

export default class Searchbar extends React.Component {
	render() {
		return (
			<input
				type="text"
				placeholder="Search for a community..."
				id={styles.input}
			></input>
		);
	}
}
