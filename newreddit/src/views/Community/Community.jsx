import React from 'react';

import Navbar from '../../components/Navbar/Navbar';
import styles from './styles.module.scss';
import { Dark } from '../../components/Button/Buttons';

export default class Community extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: this.props.community.name,
			description: this.props.community.description,
			type: this.props.community.type,
			posts: this.props.community.posts,
		};
	}

	render() {
		return (
			<div>
				<Navbar></Navbar>

				<h1 id={styles.title}>{this.state.name}</h1>
				<p id={styles.description}>{this.state.description}</p>

				<div id={styles.postButton}>
					<Dark text="Post"></Dark>
				</div>

				<div>
					{!this.state.posts ? <h1>No Posts!</h1> : <div />}
					{this.state.posts.map((post, i) => {
						return (
							<div>
								<h1>{post.title}</h1>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
