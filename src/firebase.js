import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBPg075j35a9MV97iKfWyDyafHGOnAciLg",
  authDomain: "netflix-clone-1c043.firebaseapp.com",
  projectId: "netflix-clone-1c043",
  storageBucket: "netflix-clone-1c043.firebasestorage.app",
  messagingSenderId: "653933181165",
  appId: "1:653933181165:web:d5a131a422b7f29bfab4e4",
  measurementId: "G-7HKL7TZNKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) =>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    }catch(err){
        console.log(err);
        toast.error(err.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password);
    } catch(err){
        console.log(err);
        toast.error(err.code.split('/')[1].split('-').join(' '));
    }
}

const logout = async () => {
    signOut(auth);
}

export { auth, db, login, signup, logout };