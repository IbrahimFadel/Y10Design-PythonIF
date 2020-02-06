import React from 'react';

import Communities from './Communities';
import { getCommunitiesByName } from '../../utils/firebase/db';
import { auth } from '../../utils/firebase/firebase';

export default class CommunitiesContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			search: '',
			results: [],
			user: null,
			ready: false,
		};
	}

	componentDidMount() {
		auth.onAuthStateChanged(user => {
			if (user) {
				console.log('hi');
				this.setState({
					user,
					response: true,
				});
			} else {
				this.setState({
					user: null,
					response: true,
				});
			}
		});
	}

	searchChanged = search => {
		this.setState(
			{
				search,
			},
			() => {
				this.updateResults();
			},
		);
	};

	updateResults = async () => {
		const communities = await getCommunitiesByName(this.state.search);
		this.setState({
			results: communities,
		});
	};

	render() {
		if (this.state.response) {
			return (
				<Communities
					searchChanged={search => this.searchChanged(search)}
					results={this.state.results}
					user={this.state.user}
				></Communities>
			);
		} else {
			return <h1>Loading...</h1>;
		}
	}
}
