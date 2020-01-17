import React from 'react';

import Post from './Post';
import { isUserPublic, getUsernameWithUid } from '../../utils/firebase/db';

export default class PostContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: null,
		};
	}

	async componentDidMount() {
		const isPublic = await isUserPublic(this.props.location.state.owner);
		if (isPublic) {
			const username = await getUsernameWithUid(
				this.props.location.state.owner,
			);
			console.log(username);
			this.setState({
				username,
			});
		}
	}
	render() {
		return (
			<Post
				post={this.props.location.state}
				username={this.state.username}
			></Post>
		);
	}
}
