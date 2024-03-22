import { initializeApp } from "firebase/app";
import { getFirestore } from "firebasefirestore";

const firebaseConfig = {
    apiKey: "AIzaSyCwp15zI6Z2F3K1YJFVoP-_fUiAySq2QQw",
    authDomain: "studyblog-48711.firebaseapp.com",
    projectId: "studyblog-48711",
    storageBucket: "studyblog-48711.appspot.com",
    messagingSenderId: "522813774192",
    appId: "1:522813774192:web:8a0e95222a590bb0f917b5"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };