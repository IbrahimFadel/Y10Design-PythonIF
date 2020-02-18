import React from 'react';

import CreatePost from './CreatePost';
import { auth } from '../../utils/firebase/firebase';
import { createPost } from '../../utils/firebase/db';

export default class PostContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			postType: 'text',
			uid: undefined,
		};
	}

	componentDidMount() {
		auth.onAuthStateChanged(user => {
			if (user) {
				this.setState({
					uid: user.uid,
				});
			} else {
				this.setState({
					uid: undefined,
				});
			}
		});
	}

	postTypeChanged = postType => {
		this.setState({
			postType,
		});
	};

	createPost = ({ title, body, owner, community, type, image }) => {
		createPost({
			title,
			body,
			owner,
			__community: community,
			type,
			image,
		}).then(() => {
			this.props.history.push(`/`);
		});
	};

	render() {
		return (
			<CreatePost
				community={this.props.location.state}
				postType={this.state.postType}
				postTypeChanged={this.postTypeChanged}
				uid={this.state.uid}
				createPost={this.createPost}
			></CreatePost>
		);
	}
}
