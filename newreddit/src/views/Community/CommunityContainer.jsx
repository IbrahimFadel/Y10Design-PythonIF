import React from 'react';

import Community from './Community';

export default class CommunityContainer extends React.Component {
	render() {
		return <Community community={this.props.location.state}></Community>;
	}
}
