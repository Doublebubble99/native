// import firebase from "firebase";
// import "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyBgn8KdKrMrv-pJy17Vaw8o7uArJLxH7gk",
  authDomain: "react-native-storage-cad9a.firebaseapp.com",
  projectId: "react-native-storage-cad9a",
  storageBucket: "react-native-storage-cad9a.appspot.com",
  messagingSenderId: "439320997470",
  appId: "1:439320997470:web:3190f4e83a07f29c5c4ecf",
  measurementId: "G-2WYMM4VY2W",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const storage = getStorage(app);
