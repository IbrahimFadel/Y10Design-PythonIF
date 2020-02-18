import React from 'react';
import { auth, storage } from '../../utils/firebase/firebase';

import Community from './Community';

export default class CommunityContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: null,
		};
	}

	componentDidMount() {
		auth.onAuthStateChanged(user => {
			if (user) {
				this.setState({
					user,
				});
			} else {
				this.setState({
					user: null,
				});
			}
		});
	}

	getUrlWithImageName = async (community, imageName) => {
		return storage
			.ref(`/${community}/posts/${imageName}`)
			.getDownloadURL()
			.then(url => {
				return url;
			});
	};

	getImageUrls = async posts => {
		let images = new Map();
		for (const post of posts) {
			if (post.type === 'image') {
				const url = await this.getUrlWithImageName(post.community, post.image);
				images.set(post.image, url);
				console.log(images);
			}
		}
		return images;
	};

	render() {
		return (
			<Community
				community={this.props.location.state}
				user={this.state.user}
				getImageUrls={this.getImageUrls}
			></Community>
		);
	}
}
