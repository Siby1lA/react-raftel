import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};
const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const dbService = getFirestore();
export const storageService = getStorage();

export async function upload(file: any, currentUser: any, setLoading: any) {
  const fileRef = ref(storageService, currentUser.uid + ".png");
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  updateProfile(currentUser, { photoURL });
  setTimeout(() => {
    setLoading(false);
  }, 2000);
}
