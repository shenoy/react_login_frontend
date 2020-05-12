import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBSmAWix2vWmY9POz3CGCKMgTFLcDToQbU",
  authDomain: "test-ac4a7.firebaseapp.com",
  databaseURL: "https://test-ac4a7.firebaseio.com",
  projectId: "test-ac4a7",
  storageBucket: "test-ac4a7.appspot.com",
  messagingSenderId: "859104869286",
  appId: "1:859104869286:web:5c9dfaaadc6a510f402d67",
  measurementId: "G-VFW0HGWN4H",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
