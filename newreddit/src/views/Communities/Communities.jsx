import React from 'react';
import { Link } from 'react-router-dom';

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
								<div
									className={styles.communityInfo}
									id={styles.info}
									style={{ flexGrow: '2' }}
								>
									<h1>{community.name}</h1>
									<div>
										<p>{community.description}</p>
									</div>
								</div>
								<div className={styles.communityInfo} id={styles.buttons}>
									<div id={styles.communityButtons}>
										<div>
											<Light text="Join"></Light>
										</div>
										<div>
											<Link
												to={{
													pathname: `/communities/${community.name}`,
													state: community,
												}}
											>
												<Light text="View"></Light>
											</Link>
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
