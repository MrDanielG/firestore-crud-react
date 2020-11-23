import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: 'AIzaSyB4_57zdUZqelgLHr_nR7cwib1dMqYg67k',
    authDomain: 'fb-crud-react-99190.firebaseapp.com',
    databaseURL: 'https://fb-crud-react-99190.firebaseio.com',
    projectId: 'fb-crud-react-99190',
    storageBucket: 'fb-crud-react-99190.appspot.com',
    messagingSenderId: '282538758884',
    appId: '1:282538758884:web:de8322c658af4c8ff3d2f1',
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
