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

export async function createPost({ title, body, owner, __community }) {
	const ref = db.ref('/communities');
	ref
		.once('value')
		.then((communities) => {
			let i = 0;
			communities.forEach((_community) => {
				const community = _community.val();
				if (community.name == __community) {
					let posts;
					try {
						posts = community.posts;
						posts.push({ title, body, owner });
					} catch {
						posts = [{ title, body, owner }];
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
