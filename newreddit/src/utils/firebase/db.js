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
