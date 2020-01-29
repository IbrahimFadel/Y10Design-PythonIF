import React from 'react';

import Post from './Post';
import {
	isUserPublic,
	getUsernameWithUid,
	postComment,
} from '../../utils/firebase/db';

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
		}
	}

	postComment = ({ comment, owner }) => {
		console.log('container');
		postComment({ comment, owner, community: this.props.location.state.name });
	};

	render() {
		if (this.state.ready) {
			return (
				<Post
					post={this.props.location.state}
					username={this.state.username}
					postComment={this.postComment}
				></Post>
			);
		} else {
			return <h1>Loading...</h1>;
		}
	}
}
