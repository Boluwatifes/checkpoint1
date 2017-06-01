import Firebase from 'firebase';

 // Firebase Configuration
const config = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: 'https://news-ninja-ed6d3.firebaseio.com',
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESS_ID,
};

// Initialize firebase
Firebase.initializeApp(config);
