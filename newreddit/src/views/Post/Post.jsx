import React from 'react';

import Navbar from '../../components/Navbar/Navbar';
import style from './styles.module.scss';
import { Light } from '../../components/Button/Buttons';

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

	postComment = () => {
		const comment = document.getElementById(style.commentTextarea).value;
		console.log('Post: ', comment);
		this.props.postComment({
			comment,
			owner: this.state.owner,
		});
	};

	render() {
		const { title, body, owner, username } = this.state;
		return (
			<div>
				<Navbar></Navbar>

				<div id={style.container}>
					<div id={style.bodyContainer}>
						<hr id={style.hr}></hr>
						<h1 id={style.title}>{title}</h1>
						<hr id={style.hr}></hr>

						{username ? (
							<div id={style.postOwner}>
								<h5>{username}</h5>
							</div>
						) : (
							<div>
								<h5 id={style.postOwner}>Anonymous</h5>
							</div>
						)}

						<p id={style.body}>{body}</p>
					</div>

					<div id={style.commentContainer}>
						<textarea id={style.commentTextarea}></textarea>
						<Light text="Comment" onclick={this.postComment}></Light>
					</div>
				</div>
			</div>
		);
	}
}
