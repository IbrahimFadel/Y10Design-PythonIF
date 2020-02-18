import React from 'react';

import Post from './Post';
import {
	isUserPublic,
	getUsernameWithUid,
	postComment,
} from '../../utils/firebase/db';
import Swal from 'sweetalert2';

export default class PostContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			ready: false,
			username: null,
		};
	}

	async componentDidMount() {
		const isPublic = await isUserPublic(this.props.location.state.owner);
		if (isPublic) {
			const username = await getUsernameWithUid(
				this.props.location.state.owner,
			);
			this.setState({
				username,
				ready: true,
			});
		} else {
			this.setState({
				ready: true,
			});
		}
	}

	postComment = ({ comment, owner, postTitle, postOwner }) => {
		console.log(this.props.location.state);
		postComment({
			comment,
			owner,
			community: this.props.location.state.community,
			postTitle,
			postOwner,
		});
		Swal.fire('Success!', 'Thanks for commenting!', 'success');
		this.props.history.push('/');
	};

	render() {
		if (this.state.ready) {
			return (
				<Post
					post={this.props.location.state.post}
					username={this.state.username}
					postComment={this.postComment}
					comments={this.props.location.state.post.comments}
					images={this.props.location.state.images}
				></Post>
			);
		} else {
			return <h1>Loading...</h1>;
		}
	}
}
