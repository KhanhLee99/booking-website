import firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
    // Project Settings => Add Firebase to your web app
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: "client-330913",
    storageBucket: "client-330913.appspot.com",
    messagingSenderId: "819926568297",
    appId: "1:819926568297:web:489257cd02a4dccc47c1f8",
    measurementId: "G-RH4P1MDW10"
});
const messaging = initializedFirebaseApp.messaging();

export { messaging };