import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

// Firebase 초기화

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUEREMNT_ID
};

firebase.initializeApp(firebaseConfig);

export const getAuth = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
        console.log(userCredential);
        // Signed in
        var user = userCredential.user;
            // ...
        })
            .catch((error) => {
            console.log(error);
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}

export default firebase;