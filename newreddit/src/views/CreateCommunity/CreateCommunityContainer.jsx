import React from 'react';

import CreateCommunity from './CreateCommunity';
import { auth } from '../../utils/firebase/firebase';
import Swal from 'sweetalert2';
import { communityExists, createCommunity } from '../../utils/firebase/db';

export default class CreateCommunityContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: undefined,
			type: 'private',
			name: undefined,
			description: undefined,
		};
	}

	componentDidMount() {
		auth.onAuthStateChanged(user => {
			if (user) {
				this.setState({
					user,
				});
			} else {
				this.setState({
					user: undefined,
				});
			}
		});
	}

	typeChanged = type => {
		this.setState({
			type: type,
		});
	};

	nameChanged = name => {
		this.setState({
			name,
		});
	};

	descriptionChanged = description => {
		this.setState({
			description,
		});
	};

	handleCreateErrors = () => {
		if (!this.state.user) {
			Swal.fire(
				'Error',
				'You must be logged in to create a community',
				'error',
			);
			return;
		}

		try {
			const _name = this.state.name.length;
		} catch {
			Swal.fire(
				'Error',
				'The name is too short(must be 5 characters or more)',
				'error',
			);
			return;
		}

		try {
			const _description = this.state.description.length;
		} catch {
			Swal.fire(
				'Error',
				'The description is too short(must be 5 characters or more)',
				'error',
			);
			return;
		}

		if (this.state.name.length < 5) {
			Swal.fire(
				'Error',
				'The name is too short(must be 5 characters or more)',
				'error',
			);
			return;
		} else if (this.state.name.length > 24) {
			Swal.fire(
				'Error',
				'The name is too long(must be 24 characters or shorter)',
				'error',
			);
			return;
		}

		if (this.state.description.length < 5) {
			Swal.fire(
				'Error',
				'The description is too short(must be 5 characters or more)',
				'error',
			);
			return;
		} else if (this.state.description.length > 250) {
			Swal.fire(
				'Error',
				'The description is too long(must be 250 characters or shorter)',
				'error',
			);
			return;
		}
	};

	checkIfCommunityExists = async () => {
		const exists = await communityExists(this.state.name);
		return exists;
	};

	createCommunityInDatabase = () => {
		createCommunity(
			{
				name: this.state.name,
				description: this.state.description,
				type: this.state.type,
			},
			() => {
				Swal.fire(
					'Success',
					"You're community was successfully created",
					'success',
				);
			},
			err => {
				Swal.fire('Error', `${err.code} ${err.message}`, 'error');
				return;
			},
		);
	};

	create = async () => {
		this.handleCreateErrors();
		const exists = await this.checkIfCommunityExists();
		if (exists) {
			Swal.fire(
				'Error',
				'A community with the same name already exists',
				'error',
			);
			return;
		}
		this.createCommunityInDatabase();
		Swal.fire('Success', 'Successfully created community!', 'success');
		this.props.history.push('/communities');
	};

	render() {
		return (
			<CreateCommunity
				typeChanged={type => {
					this.typeChanged(type);
				}}
				nameChanged={name => {
					this.nameChanged(name);
				}}
				descriptionChanged={description => {
					this.descriptionChanged(description);
				}}
				create={this.create}
			></CreateCommunity>
		);
	}
}
