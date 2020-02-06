import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import styles from './styles.module.scss';
import { Dark } from '../../components/Button/Buttons';
import { auth } from '../../utils/firebase/firebase';

let commentSectionLink;

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

	componentDidMount() {
		console.log(this.props);
		console.log(this.state.posts);
		this.setState({
			response: true,
		});
		// auth.onAuthStateChanged(user => {
		// 	if (user) {
		// 		this.setState({
		// 			user,
		// 			response: true,
		// 		});
		// 	} else {
		// 		this.setState({
		// 			user: null,
		// 			response: true,
		// 		});
		// 	}
		// });
		commentSectionLink = `/communities/${this.state.name}/post/`;
	}

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
							// const data = {
							// 	name: this.state.name,
							// 	description: this.state.description,
							// 	type: this.state.type,
							// 	posts: this.state.posts,
							// 	user: this.state.user,
							// 	community: this.state.name,
							// };
							// console.log(this.state);
							return (
								<div key={i} className={styles.postContainer}>
									<h1>{post.title}</h1>
									<hr className={styles.seperator}></hr>
									<p>{post.body}</p>
									<br></br>
									<Link
										to={{
											pathname: `${commentSectionLink}${post.url}`,
											state: post,
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
