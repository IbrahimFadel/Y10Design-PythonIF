import React from 'react';

import Create from './Create';

export default class CreateContainer extends React.Component {
	createCommunity = () => {
		this.props.history.push('/create/community');
	};

	render() {
		return <Create createCommunity={this.createCommunity}></Create>;
	}
}
