import React from 'react';

import Navbar from '../../components/Navbar/Navbar';
import style from './styles.module.scss';

export default class Post extends React.Component {
	render() {
		return (
			<div>
				<Navbar></Navbar>

				<h1 id={style.title}></h1>
			</div>
		);
	}
}
