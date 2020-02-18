import React from 'react';
import Swal from 'sweetalert2';

import Navbar from '../../components/Navbar/Navbar';
import styles from './styles.module.scss';
import { Light } from '../../components/Button/Buttons';

export default class Post extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			community: this.props.community,
		};
	}

	postTypeChanged = () => {
		const postType = document.getElementById(styles.select).value;
		this.props.postTypeChanged(postType);
	};

	post = async () => {
		const title = document.getElementById('title').value;
		let body;
		let image;
		if (this.props.postType === 'text') {
			body = document.getElementById('body').value;
		} else {
			image = document.getElementById('image-selector').files[0];
		}
		const post = {
			title,
			body,
			image,
			owner: this.props.uid,
			type: this.props.postType,
		};

		this.props.createPost({
			title: post.title,
			body: post.body,
			owner: post.owner,
			community: this.state.community.name,
			type: post.type,
			image: post.image,
		});
	};

	render() {
		if (this.props.uid) {
			return (
				<div>
					<Navbar></Navbar>

					<h1 id={styles.title}>Post</h1>

					<form id={styles.form}>
						<div id={styles.typeContainer}>
							<label>Type of Post</label>
							<select id={styles.select} onChange={this.postTypeChanged}>
								<option value="text">Text</option>
								<option value="image">Image</option>
							</select>
						</div>

						<div id={styles.inputs}>
							<div className={styles.postBodyContainer}>
								<label>Title</label>
								<input
									type="text"
									placeholder="The title of your new post..."
									className={styles.input}
									id="title"
								></input>
							</div>

							{this.props.postType === 'text' ? (
								<div
									className={styles.postBodyContainer}
									id={styles.descriptionContainer}
								>
									<label>Description</label>
									<textarea
										placeholder="The body"
										className={styles.textarea}
										maxLength="5000"
										id="body"
									></textarea>
								</div>
							) : (
								<div>
									<label>Image</label>
									<input type="file" id="image-selector"></input>
								</div>
							)}
						</div>
						<div>
							<Light text="Post" onClick={this.post}></Light>
						</div>
					</form>
				</div>
			);
		} else {
			return (
				<div>
					<Navbar></Navbar>
					<h1>Login to Create Posts</h1>
				</div>
			);
		}
	}
}
