import React from 'react';

import Communities from './Communities';
import { getCommunitiesByName, joinCommunity } from '../../utils/firebase/db';
import { auth } from '../../utils/firebase/firebase';
import Swal from 'sweetalert2';

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

	joinCommunity = name => {
		if (!this.state.user) {
			Swal.fire('Oops!', 'You must be signed in to join a community!', 'error');
			return;
		}
		const uid = this.state.user.uid;
		joinCommunity(name, uid);
	};

	render() {
		if (this.state.response) {
			return (
				<Communities
					searchChanged={search => this.searchChanged(search)}
					results={this.state.results}
					user={this.state.user}
					joinCommunity={this.joinCommunity}
				></Communities>
			);
		} else {
			return <h1>Loading...</h1>;
		}
	}
}
