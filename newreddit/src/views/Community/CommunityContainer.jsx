import React from 'react';
import { auth } from '../../utils/firebase/firebase';

import Community from './Community';

export default class CommunityContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: null,
		};
	}

	componentDidMount() {
		auth.onAuthStateChanged((user) => {
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

	render() {
		return (
			<Community
				community={this.props.location.state}
				user={this.state.user}
			></Community>
		);
	}
}
