import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyAni1yTxYxlI3KAZ5mC04t69ohPCAKVF8w',
	authDomain: 'todoproject-56bbd.firebaseapp.com',
	projectId: 'todoproject-56bbd',
	storageBucket: 'todoproject-56bbd.firebasestorage.app',
	messagingSenderId: '590572798938',
	appId: '1:590572798938:web:574b7bbcb76738510e36e3',
	databaseURL:
		'https://todoproject-56bbd-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
