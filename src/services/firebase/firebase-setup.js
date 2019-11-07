import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBt30olC0O_2PTrSa9JnYQmzunGwKTSfc",
  authDomain: "firka-apidra.firebaseapp.com",
  databaseURL: "https://firka-apidra.firebaseio.com",
  projectId: "firka-apidra",
  storageBucket: "firka-apidra.appspot.com",
  messagingSenderId: "196778106731",
  appId: "1:196778106731:web:698568b14a10875a97f62e"
};

firebase.initializeApp(firebaseConfig);
const firestoreDB = firebase.firestore().collection('test');

export default firestoreDB;
