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
			comment: '',
		};
	}

	postComment = () => {
		this.props.postComment({
			comment: this.state.comment,
			owner: this.state.owner,
			postTitle: this.state.title,
			postOwner: this.state.owner,
		});
	};

	commentChanged = () => {
		const comment = document.getElementById('commentTextarea').value;
		this.setState({
			comment,
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
						<textarea
							className={style.commentTextarea}
							id="commentTextarea"
							onChange={this.commentChanged}
						></textarea>
						<Light text="Comment" onClick={this.postComment}></Light>
					</div>
				</div>
			</div>
		);
	}
}
