import React from 'react';

import Navbar from '../../components/Navbar/Navbar';
import Searchbar from '../../components/Searchbar/Searchbar';
import styles from './styles.module.scss';

export default class Communities extends React.Component {
	render() {
		return (
			<div>
				<Navbar></Navbar>
				<h1 id={styles.title}>Communities</h1>
				<div id={styles.searchbar}>
					<Searchbar></Searchbar>
				</div>
			</div>
		);
	}
}
