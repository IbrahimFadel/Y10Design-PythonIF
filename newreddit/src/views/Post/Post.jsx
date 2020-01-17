import React from 'react';

import Navbar from '../../components/Navbar/Navbar';
import style from './styles.module.scss';

export default class Post extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: this.props.post.title,
			body: this.props.post.body,
			owner: this.props.post.owner,
			username: this.props.username,
		};
	}

	render() {
		console.log(this.state);
		const { title, body, owner, username } = this.state;
		return (
			<div>
				<Navbar></Navbar>

				<h1 id={style.title}>{title}</h1>

				{username ? (
					<div>
						<h5>{username}</h5>
					</div>
				) : (
					<div>
						<h5>Anonymous</h5>
					</div>
				)}
			</div>
		);
	}
}
