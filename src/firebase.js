import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyCnCa2EG3v9RoX4WBlztlvkdKw2poZtMgI',
	authDomain: 'test-631a5.firebaseapp.com',
	projectId: 'test-631a5',
	storageBucket: 'test-631a5.firebasestorage.app',
	messagingSenderId: '223962676004',
	appId: '1:223962676004:web:09237aff522601c5fb11b1',
	databaseURL: 'https://test-631a5-default-rtdb.firebaseio.com/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
