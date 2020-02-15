import Swal from 'sweetalert2';
import { db } from './firebase';

export async function communityExists(name) {
	const exists = await db
		.ref('/communities')
		.once('value')
		.then(communities => {
			const amntCommunities = communities.numChildren();
			if (amntCommunities === 0) {
				return false;
			}
			let i = 0;
			let exists = true;
			communities.forEach(_community => {
				i++;
				const community = _community.val();
				if (community.name === name) return (exists = true);
				if (i === amntCommunities) exists = false;
			});
			return exists;
		});
	return exists;
}

export function createCommunity({ name, description, type }, cb, error) {
	db.ref('/communities')
		.push({
			name,
			description,
			type,
			posts: [],
		})
		.then(() => {
			cb();
		})
		.catch(err => {
			error(err);
		});
}

export async function getCommunitiesByName(name) {
	if (name === '') return [];
	return await db
		.ref('/communities')
		.once('value')
		.then(communities => {
			let matchingCommunities = [];
			communities.forEach(_community => {
				const community = _community.val();
				if (
					community.name.toLowerCase().includes(name.toLowerCase()) &&
					community.type === 'public'
				) {
					matchingCommunities.push(community);
				}
			});
			return matchingCommunities;
		});
}

function d2h(d) {
	return d.toString(16);
}

function h2d(h) {
	return parseInt(h, 16);
}

function stringToHex(tmp) {
	var str = '',
		i = 0,
		tmp_len = tmp.length,
		c;

	for (; i < tmp_len; i += 1) {
		c = tmp.charCodeAt(i);
		str += d2h(c) + ' ';
	}
	return str;
}

function hexToString(tmp) {
	var arr = tmp.split(' '),
		str = '',
		i = 0,
		arr_len = arr.length,
		c;

	for (; i < arr_len; i += 1) {
		c = String.fromCharCode(h2d(arr[i]));
		str += c;
	}

	return str;
}

function ascii_to_hexa(str) {
	var arr1 = [];
	for (var n = 0, l = str.length; n < l; n++) {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	}
	return arr1.join('');
}

export async function createPost({ title, body, owner, __community }) {
	const ref = db.ref('/communities');
	let url = `${ascii_to_hexa(owner)} ${ascii_to_hexa(title)}`;
	console.log(url);
	ref
		.once('value')
		.then(communities => {
			let i = 0;
			communities.forEach(_community => {
				const community = _community.val();
				if (community.name == __community) {
					let posts;
					console.log(owner, title, __community);
					try {
						posts = community.posts;
						posts.push({ title, body, owner, url, community: __community });
					} catch {
						posts = [{ title, body, owner, url, community: __community }];
					}
					db.ref(`/communities/${Object.keys(communities.val())[i]}`).set({
						posts,
						description: community.description,
						name: community.name,
						type: community.type,
					});
					i++;
				}
			});
		})
		.then(() => {
			Swal.fire(
				'Sucess',
				`You successfully posted to ${__community}!`,
				'success',
			);
		});
}

export async function isUserPublic(uid) {
	let isPublic = false;
	return db
		.ref('/users')
		.once('value')
		.then(_users => {
			_users.forEach(_user => {
				const user = _user.val();

				if (user.uid == uid) {
					isPublic = true;
				}
			});
		})
		.then(() => {
			return isPublic;
		});
}

export async function getUsernameWithUid(uid) {
	let username;
	return db
		.ref('/users')
		.once('value')
		.then(_users => {
			_users.forEach(_user => {
				const user = _user.val();

				if (user.uid == uid) {
					username = user.username;
				}
			});
		})
		.then(() => {
			return username;
		});
}

export function postComment({
	comment,
	owner,
	community,
	postTitle,
	postOwner,
}) {
	db.ref('/communities')
		.once('value')
		.then(_communities => {
			let i = 0;
			_communities.forEach(__community => {
				const key = Object.keys(_communities.val())[i];
				const _community = __community.val();
				if (_community.name == community) {
					const _comment = {
						comment,
						owner,
					};
					db.ref(`/communities/${key}/posts`)
						.once('value')
						.then(_posts => {
							let x = 0;
							const posts = _posts.val();
							_posts.forEach(_post => {
								const post = _post.val();
								if (post.title == postTitle && postOwner) {
									try {
										posts[x]['comments'].push(_comment);
									} catch {
										posts[x].comments = [_comment];
									}
									db.ref(`/communities/${key}/posts`).set(posts);
								}
								x++;
							});
						});
				}
				i++;
			});
		});
}

export const joinCommunity = (name, uid) => {
	db.ref('/users')
		.once('value')
		.then(_users => {
			let i = 0;
			_users.forEach(_user => {
				const user = _user.val();
				if (user.uid === uid) {
					let communities;
					try {
						communities = user.communities;
						if (communities.includes(name)) {
							Swal.fire(
								'Oops!',
								'You are already a member of this community!',
								'error',
							);
							return;
						}
						communities.push(name);
					} catch {
						communities = [name];
					}
					const key = Object.keys(_users.val())[i];
					const ref = db.ref(`/users/${key}`).update({ communities });
					Swal.fire('Success', `Successfully joined: ${name}!`, 'success');
				}
				i++;
			});
		});
};

const getJoinedCommunities = uid => {
	let communities;
	return db
		.ref('/users')
		.once('value')
		.then(_users => {
			_users.forEach(_user => {
				const user = _user.val();
				if (user.uid === uid) {
					try {
						communities = [...user.communities];
					} catch {
						communities = [];
					}
				}
			});
		})
		.then(() => {
			return communities;
		});
};

const getPostsFromCommunity = name => {
	let posts;
	return db
		.ref('/communities')
		.once('value')
		.then(_communities => {
			_communities.forEach(_community => {
				const community = _community.val();
				if (community.name === name) {
					posts = community.posts;
				}
			});
		})
		.then(() => {
			return posts;
		});
};

export const getFrontPage = async (uid, callback) => {
	let frontPageData = [];
	let canReturn = false;
	const communities = await getJoinedCommunities(uid);
	return db
		.ref('/communities')
		.once('value')
		.then(_communities => {
			let communitiesFound = 0;
			if (_communities.numChildren() == 0) {
				if (communities.length == 0) {
					canReturn = true;
				}
			}
			_communities.forEach(_community => {
				const community = _community.val();
				for (const name of communities) {
					if (community.name === name) {
						getPostsFromCommunity(community.name).then(posts => {
							const communityPosts = {
								community: community.name,
								posts,
							};
							frontPageData.push(communityPosts);
							if (communitiesFound === communities.length) {
								canReturn = true;
							}
						});
						communitiesFound++;
					}
				}
			});
		})
		.then(() => {
			const canReturnInterval = setInterval(() => {
				if (canReturn) {
					clearInterval(canReturnInterval);
					callback(frontPageData);
				}
			}, 10);
		});
};
