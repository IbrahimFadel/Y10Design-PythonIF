import React from 'react';

import styles from './styles.module.scss';

export default class Button extends React.Component {
	componentDidMount() {
		const type = this.props.type;
		this.classNames = `${styles.button}`;
		switch (type) {
			case 'dark':
				this.classNames += `${styles.dark}`;
			case 'light':
				this.classNames += `${styles.light}`;
		}
	}
	render() {
		return <button className={this.classNames}>{this.props.text}</button>;
	}
}
