import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import style from './styles.module.scss';
import styles from '../Community/styles.module.scss';

export default class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: this.props.user,
			frontPageData: this.props.frontPageData,
		};
	}

	render() {
		const { user, frontPageData } = this.state;
		console.log(frontPageData);
		return (
			<div>
				<header>
					<Navbar></Navbar>
				</header>

				{user ? (
					<div>
						<h1 id={style.title}>Welcome back! Here's your frontpage!</h1>
						<h5 style={{ textAlign: 'center' }}>
							Frontpage consists of posts from communities you're a member of!
						</h5>
						{frontPageData.map((communityPosts, i) => {
							console.log(communityPosts);
							const posts = communityPosts.posts;
							return (
								<div key={i} id={style.frontPageContainer}>
									{posts.map((post, x) => {
										return (
											<div key={x} className={styles.postContainer}>
												<h1>{post.title}</h1>
												<hr className={styles.seperator}></hr>
												<p>{post.body}</p>
												<br></br>
												<Link
													to={{
														pathname: `/communities/${post.community}/post/${post.url}`,
														state: post,
													}}
												>
													<p className={styles.postLink}>Comments</p>
												</Link>
											</div>
										);
									})}
								</div>
							);
						})}
					</div>
				) : (
					<div>
						<h1 id={style.title}>
							You aren't signed in. You can search for communities and view
							posts there!
						</h1>
					</div>
				)}
			</div>
		);
	}
}
