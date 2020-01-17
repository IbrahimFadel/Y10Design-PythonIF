import Swal from 'sweetalert2';
import { db } from './firebase';

export async function communityExists(name) {
	const exists = await db
		.ref('/communities')
		.once('value')
		.then((communities) => {
			const amntCommunities = communities.numChildren();
			if (amntCommunities === 0) {
				return false;
			}
			let i = 0;
			let exists = true;
			communities.forEach((_community) => {
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
		.catch((err) => {
			error(err);
		});
}

export async function getCommunitiesByName(name) {
	if (name === '') return [];
	return await db
		.ref('/communities')
		.once('value')
		.then((communities) => {
			let matchingCommunities = [];
			communities.forEach((_community) => {
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
		.then((communities) => {
			let i = 0;
			communities.forEach((_community) => {
				const community = _community.val();
				if (community.name == __community) {
					let posts;
					console.log(owner, title);
					try {
						posts = community.posts;
						posts.push({ title, body, owner, url });
					} catch {
						posts = [{ title, body, owner, url }];
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
		.then((_users) => {
			_users.forEach((_user) => {
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
		.then((_users) => {
			_users.forEach((_user) => {
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
