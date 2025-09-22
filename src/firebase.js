import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZup1FoYyA24AOGAlvV5VvChjr02atjac",
  authDomain: "small-business-9072a.firebaseapp.com",
  projectId: "small-business-9072a",
  storageBucket: "small-business-9072a.firebasestorage.app",
  messagingSenderId: "138824203196",
  appId: "1:138824203196:web:344d6b6f941c44d1fc49b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
