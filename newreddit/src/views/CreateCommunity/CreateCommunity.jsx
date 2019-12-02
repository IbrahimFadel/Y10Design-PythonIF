import React from 'react';

import Navbar from '../../components/Navbar/Navbar';
import styles from './styles.module.scss';

export default class CreateCommunity extends React.Component {
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
						></input>
						<label>Description</label>
						<textarea
							placeholder="A small description of this community"
							className={styles.textarea}
							maxLength="250"
						></textarea>
						<label>Type</label>
						{/* <div id={styles.radiosContainer}> */}
						<form>
							<div id={styles.radiosContainer}>
								<div className={styles.radioContainer}>
									<input
										name="private"
										type="radio"
										id={styles.radio1}
										checked
									></input>
									<label htmlFor={styles.radio1}>Private</label>
								</div>
								<div className={styles.radioContainer}>
									<input name="public" type="radio" id={styles.radio2}></input>
									<label htmlFor={styles.radio2}>Public</label>
								</div>
							</div>
						</form>
						{/* <div className={styles.radioContainer}>
								<p>Private</p>
								<input type="radio" />
							</div>
							<div className={styles.radioContainer}>
								<p>Public</p>
								<input type="radio" />
							</div> */}
						{/* </div> */}
					</div>
				</form>
			</div>
		);
	}
}
