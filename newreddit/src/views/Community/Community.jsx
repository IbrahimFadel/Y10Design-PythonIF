import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import styles from './styles.module.scss';
import { Dark } from '../../components/Button/Buttons';

let commentSectionLink;

export default class Community extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: this.props.community.name,
			description: this.props.community.description,
			type: this.props.community.type,
			posts:
				this.props.community.posts === undefined
					? []
					: this.props.community.posts,
			user: this.props.user,
		};
	}

	componentDidMount() {
		commentSectionLink = `/communities/${this.state.name}/post/`;
	}

	render() {
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
								<p>{post.body}</p>
								<br></br>
								<Link
									to={{
										pathname: `${commentSectionLink}${post.url}`,
										state: this.state.posts[i],
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
	}
}
