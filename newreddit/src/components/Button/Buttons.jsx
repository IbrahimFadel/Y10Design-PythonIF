import React from 'react';

import { button, dark, light } from './styles.module.scss';

class Button extends React.Component {
	render() {
		return (
			<button
				type="button"
				className={this.props.className}
				onClick={this.props.onClick}
			>
				{this.props.text}
			</button>
		);
	}
}

export class Dark extends React.Component {
	render() {
		return (
			<Button
				className={`${button} ${dark}`}
				text={this.props.text}
				onClick={this.props.onClick}
			></Button>
		);
	}
}

export class Light extends React.Component {
	render() {
		return (
			<Button
				className={`${button} ${light}`}
				text={this.props.text}
				onClick={this.props.onClick}
			></Button>
		);
	}
}
