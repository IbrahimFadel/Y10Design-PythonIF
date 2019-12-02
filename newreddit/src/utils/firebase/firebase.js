import * as firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyBV4uvEpXu1tx6gxspdYpTHfDukbxNNqPU',
	authDomain: 'ucc2019-7cd5c.firebaseapp.com',
	databaseURL: 'https://ucc2019-7cd5c.firebaseio.com',
	projectId: 'ucc2019-7cd5c',
	storageBucket: 'ucc2019-7cd5c.appspot.com',
	messagingSenderId: '818178378478',
	appId: '1:818178378478:web:f4fff678cd5d1f2f4d81ff',
	measurementId: 'G-PMBVQR80WJ',
};

firebase.initializeApp(config);

export default firebase;
export const auth = firebase.auth();
export const db = firebase.database();
