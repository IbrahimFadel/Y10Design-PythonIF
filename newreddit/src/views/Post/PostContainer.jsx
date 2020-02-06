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
		console.log('hi', this.props.location.state);
		const isPublic = await isUserPublic(this.props.location.state.owner);
		console.log(isPublic);
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

	postComment = ({ comment, owner }) => {
		console.log(this.props.location.state);
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
