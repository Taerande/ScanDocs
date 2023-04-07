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
    measurementId: import.meta.env.VITE_FIREBASE_MEASUEREMNT_ID
};

firebase.initializeApp(firebaseConfig);

export const getAuth = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}
export const logout = () => {
    return firebase.auth().signOut();
}
export const registerNewUser = (email, password, displayName) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            user.updateProfile({
                'displayName': displayName
            }).then((res) => {
                console.log(res);
            })
        })
        .catch((error) => {
            console.log(error);
        });
}
export default firebase;