import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCwev_zk7OwOPrmhC5-GAoEw2-ECXlh78s",
    authDomain: "euroasia-logist.firebaseapp.com",
    projectId: "euroasia-logist",
    storageBucket: "euroasia-logist.firebasestorage.app",
    messagingSenderId: "717986925490",
    appId: "1:717986925490:web:775f1af2e10ba843d6b2ab",
    measurementId: "G-YPNS1TZ98X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app; 