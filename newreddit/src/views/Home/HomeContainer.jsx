import React from 'react';

import Home from './Home';
import { auth } from '../../utils/firebase/firebase';
import { getFrontPage } from '../../utils/firebase/db';

export default class HomeContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: null,
			frontPageData: [],
			response: false,
		};
	}

	componentDidMount() {
		auth.onAuthStateChanged(user => {
			if (user) {
				this.setState(
					{
						user,
					},
					() => {
						const frontPage = this.getFrontPage();
					},
				);
			} else {
				this.setState({
					user: null,
					response: true,
				});
			}
		});
	}

	getFrontPage = async () => {
		const uid = this.state.user.uid;
		getFrontPage(uid, frontPageData => {
			this.setState({
				frontPageData,
				response: true,
			});
		});
	};

	render() {
		if (this.state.response) {
			return (
				<Home
					user={this.state.user}
					frontPageData={this.state.frontPageData}
				></Home>
			);
		} else {
			return <h1>Loading...</h1>;
		}
	}
}
