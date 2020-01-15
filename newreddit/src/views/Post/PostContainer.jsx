import React from 'react';
import { useParams } from 'react-router-dom';

import Post from './Post';

export default class PostContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		let { id } = useParams();
		console.log(id);
		// console.log(this.props.location.state);
	}
	render() {
		return <Post></Post>;
	}
}
