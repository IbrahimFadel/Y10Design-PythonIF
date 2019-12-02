import React from 'react';

import Navbar from '../../components/Navbar/Navbar';
import styles from './styles.module.scss';
import { Light } from '../../components/Button/Buttons';

export default class Create extends React.Component {
	render() {
		return (
			<div>
				<Navbar></Navbar>
				<h1 id={styles.title}>Create</h1>
				<div id={styles.container}>
					<Light text="Community" onClick={this.props.createCommunity}></Light>
				</div>
			</div>
		);
	}
}
