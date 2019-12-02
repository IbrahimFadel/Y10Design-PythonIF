import React from 'react';

import Communities from './Communities';
import { getCommunitiesByName } from '../../utils/firebase/db';

export default class CommunitiesContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			search: '',
			results: [],
		};
	}

	searchChanged = (search) => {
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
		return (
			<Communities
				searchChanged={(search) => this.searchChanged(search)}
				results={this.state.results}
			></Communities>
		);
	}
}
