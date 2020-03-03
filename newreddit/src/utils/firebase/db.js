import Swal from 'sweetalert2';
import { db, storage } from './firebase';

/**
 * Check if a community has already been created given a name
 * @param {String} name
 */
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

/**
 *
 * @param {Object} details
 * @param {Function} callback
 * @param {Function} errorCallback
 */
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

/**
 * Get all communities that match a search query
 * @param {String} name
 */
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

/**
 * Convert string to base 16 hexadecimal
 * @param {String} d
 */
function d2h(d) {
	return d.toString(16);
}

/**
 * Convert base 16 string to regurlar ascii text
 * @param {String} h
 */
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

/**
 * Create a text post
 * @param {Object} options
 */
const createTextPost = ({ title, body, owner, __community }) => {
	const ref = db.ref('/communities');
	let url = `${ascii_to_hexa(owner)} ${ascii_to_hexa(title)}`;
	ref
		.once('value')
		.then(communities => {
			let i = 0;
			communities.forEach(_community => {
				const community = _community.val();
				if (community.name == __community) {
					let posts;
					try {
						posts = community.posts;
						posts.push({ title, body, owner, url, community: __community });
					} catch {
						posts = [{ title, body, owner, url, community: __community }];
					}
					db.ref(`/communities/${Object.keys(communities.val())[i]}`).update({
						posts,
					});
				}
				i++;
			});
		})
		.then(() => {
			Swal.fire(
				'Sucess',
				`You successfully posted to ${__community}!`,
				'success',
			);
		});
};

/**
 * Create an image post
 * @param {Object} options
 */
const createImagePost = ({ title, image, owner, __community }) => {
	const ref = db.ref('/communities');
	let url = `${ascii_to_hexa(owner)} ${ascii_to_hexa(title)}`;
	ref
		.once('value')
		.then(communities => {
			let i = 0;
			communities.forEach(_community => {
				const community = _community.val();
				if (community.name == __community) {
					let posts;
					try {
						posts = community.posts;
						posts.push({
							title,
							image: image.name,
							owner,
							url,
							community: __community,
							type: 'image',
						});
					} catch {
						posts = [
							{
								title,
								image: image.name,
								owner,
								url,
								community: __community,
								type: 'image',
							},
						];
					}
					db.ref(`/communities/${Object.keys(communities.val())[i]}`).update({
						posts,
					});
					storage.ref(`/${__community}/posts/${image.name}`).put(image);
				}
				i++;
			});
		})
		.then(() => {
			Swal.fire(
				'Success',
				`You successfully posted to ${__community}!`,
				'success',
			);
		});
};

/**
 * Create post
 * @param {Object} options
 */
export async function createPost({
	title,
	body,
	owner,
	__community,
	type,
	image,
}) {
	if (type === 'text') {
		createTextPost({ title, body, owner, __community });
	} else {
		createImagePost({ title, image, owner, __community });
	}
}

/**
 * Check if a user is of type public given its user id
 * @param {String} uid
 */
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

/**
 * Get a user's username given its user id
 * @param {String} uid
 */
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

/**
 * Post a comment
 * @param {Object} options
 */
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

/**
 * Have a user join a community given the user's user id, and the community name
 * @param {String} name
 * @param {String} uid
 */
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

/**
 * Retrieve all of the communities a user has joined
 * @param {String} uid
 */
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

/**
 * Get all of the posts from a community given its name
 * @param {String} name
 */
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

/**
 * Retrieve all of the posts from all communities a user has joined, and return them in a renderable format
 * @param {String} uid
 * @param {Function} callback
 */
export const getFrontPage = async (uid, callback) => {
	let frontPageData = [];
	let canReturn = false;
	const communities = await getJoinedCommunities(uid);
	if (communities.length === 0) {
		return callback([]);
	}
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
