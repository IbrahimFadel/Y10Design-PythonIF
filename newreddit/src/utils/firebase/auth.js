import firebase from './firebase';
import Swal from 'sweetalert2';

export function createUser({ username, email, password, type }) {
	let newUser = undefined;
	let ableToCreateUser = true;

	firebase
		.database()
		.ref('/users/')
		.once('value')
		.then(snapshot => {
			snapshot.forEach(childsnapshot => {
				const user = childsnapshot.val();
				if (user.username === username) {
					ableToCreateUser = false;
					Swal.fire('Oops...', 'Another user is using that name!', 'error');
					return;
				}
			});
		})
		.then(() => {
			if (ableToCreateUser) {
				firebase
					.auth()
					.createUserWithEmailAndPassword(email, password)
					.catch(err => {
						Swal.fire('Oops...', err.message, 'error');
						ableToCreateUser = false;
					})
					.then(user => {
						if (ableToCreateUser) {
							newUser = {
								email,
								uid: user.user.uid,
								username,
								type,
							};
						}
					})
					.then(() => {
						if (ableToCreateUser) {
							pushNewUserToDB(newUser);
						}
					});
			}
		});
}

function pushNewUserToDB(user) {
	firebase
		.database()
		.ref('/users/')
		.push(user)
		.then(() => {
			Swal.fire('Success!', 'Your account has been created!', 'success');
		});
}

export async function login({ usernameOrEmail, password }) {
	const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const isEmail = emailRe.test(String(usernameOrEmail).toLowerCase());
	let user;
	if (isEmail) {
		user = await loginWithEmailAndPassword({
			email: usernameOrEmail,
			password,
		});
	} else {
		user = await loginWithUsernameAndPassword({
			username: usernameOrEmail,
			password,
		});
	}
	return user;
}

async function loginWithUsernameAndPassword({ username, password }) {
	const email = await firebase
		.database()
		.ref('/users')
		.once('value')
		.then(users => {
			let email;
			users.forEach(_user => {
				const user = _user.val();
				if (user.username === username) {
					email = user.email;
				}
			});
			return email;
		});
	return await loginWithEmailAndPassword({ email, password });
}

async function loginWithEmailAndPassword({ email, password }) {
	const user = await firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(result => {
			const user = result.user;
			return user;
		})
		.catch(err => {
			Swal.fire('Oops...', err.message, 'error');
		});
	return user;
}
