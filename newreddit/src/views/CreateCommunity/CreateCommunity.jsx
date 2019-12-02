import React from 'react';

import Navbar from '../../components/Navbar/Navbar';
import styles from './styles.module.scss';
import { Light } from '../../components/Button/Buttons';

export default class CreateCommunity extends React.Component {
	communityTypeChanged = () => {
		const type = document.getElementById(styles.select).value.toLowerCase();
		this.props.typeChanged(type);
	};

	nameChanged = () => {
		const name = document.getElementById('name').value;
		this.props.nameChanged(name);
	};

	descriptionChanged = () => {
		const description = document.getElementById('description').value;
		this.props.descriptionChanged(description);
	};

	render() {
		return (
			<div>
				<Navbar></Navbar>

				<h1 id={styles.title}>Create a Community</h1>

				<form id={styles.form}>
					<div id={styles.inputs}>
						<label>Name</label>
						<input
							type="text"
							placeholder="The name of your new community..."
							className={styles.input}
							onChange={this.nameChanged}
							id="name"
						></input>
						<label>Description</label>
						<textarea
							placeholder="A small description of this community"
							className={styles.textarea}
							maxLength="250"
							onChange={this.descriptionChanged}
							id="description"
						></textarea>
						<label>Type</label>

						<select id={styles.select} onChange={this.communityTypeChanged}>
							<option>Private</option>
							<option>Public</option>
						</select>
					</div>
					<div>
						<Light text="Create" onClick={this.props.create}></Light>
					</div>
				</form>
			</div>
		);
	}
}
