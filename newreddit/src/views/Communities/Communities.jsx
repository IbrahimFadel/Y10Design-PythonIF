import React from 'react';

import Navbar from '../../components/Navbar/Navbar';
import Searchbar from '../../components/Searchbar/Searchbar';
import styles from './styles.module.scss';
import { Light } from '../../components/Button/Buttons';

export default class Communities extends React.Component {
	changed = () => {
		const search = document.getElementById('search').value;
		this.props.searchChanged(search);
	};

	render() {
		return (
			<div>
				<Navbar></Navbar>
				<h1 id={styles.title}>Communities</h1>
				<div id={styles.searchbar}>
					<Searchbar onChange={this.changed} id="search"></Searchbar>
				</div>
				<div id={styles.communitiesContainer}>
					{this.props.results.map((community, i) => {
						return (
							<div key={i} className={styles.community}>
								<div className={styles.communityInfo}>
									<h1>{community.name}</h1>
									<div>
										<p>{community.description}</p>
									</div>
								</div>
								<div className={styles.communityInfo}>
									<div id={styles.communityButtons}>
										<div>
											<Light text="Join"></Light>
										</div>
										<div>
											<Light text="View"></Light>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
