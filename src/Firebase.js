import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8LMyTDhV94bxv4NHtKAWR-wopW8VxJoQ",
  authDomain: "cook-mate-fd587.firebaseapp.com",
  projectId: "cook-mate-fd587",
  storageBucket: "cook-mate-fd587.firebasestorage.app",
  messagingSenderId: "560661170795",
  appId: "1:560661170795:web:47bacce0aff84266a7bf2e",
  measurementId: "G-X62ZVM02L9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
  onAuthStateChanged,
  signOut
};