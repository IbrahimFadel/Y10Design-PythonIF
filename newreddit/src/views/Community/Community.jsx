import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import styles from './styles.module.scss';
import { Dark } from '../../components/Button/Buttons';

let commentSectionLink;
let images;

export default class Community extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: this.props.community.community.name,
			description: this.props.community.community.description,
			type: this.props.community.community.type,
			posts:
				this.props.community.community.posts === undefined
					? []
					: this.props.community.community.posts,
			user: null,
			response: false,
		};
	}

	componentDidMount = async () => {
		commentSectionLink = `/communities/${this.state.name}/post/`;
		images = await this.props.getImageUrls(this.state.posts);
		this.setState({
			response: true,
		});
	};

	render() {
		if (this.state.response) {
			return (
				<div>
					<Navbar></Navbar>

					<h1 id={styles.title}>{this.state.name}</h1>
					<p id={styles.description}>{this.state.description}</p>

					<div id={styles.postButton}>
						<Link
							to={{
								pathname: '/post',
								state: this.state,
							}}
						>
							<Dark text="Post"></Dark>
						</Link>
					</div>

					<div id={styles.posts}>
						{this.state.posts.map((post, i) => {
							return (
								<div key={i} className={styles.postContainer}>
									<h1>{post.title}</h1>
									<hr className={styles.seperator}></hr>
									{console.log(post.image, images.get(post.image))}
									{post.type === 'image' ? (
										<img
											src={images.get(post.image)}
											className={styles.postImage}
										></img>
									) : (
										<p>{post.body}</p>
									)}
									<br></br>
									<Link
										to={{
											pathname: `${commentSectionLink}${post.url}`,
											state: {
												post,
												images,
											},
										}}
									>
										<p className={styles.postLink}>Comments</p>
									</Link>
								</div>
							);
						})}
					</div>
				</div>
			);
		} else {
			return <h1>Loading...</h1>;
		}
	}
}
