import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyAcGEzhPmFLeUlNJOYaaUp-YZWXvJkfzIo",
  authDomain: "reactnat-78719.firebaseapp.com",
  projectId: "reactnat-78719",
  storageBucket: "reactnat-78719.appspot.com",
  messagingSenderId: "1039459072239",
  appId: "1:1039459072239:web:562298923cc9ba5b90c31a",
  measurementId: "G-WLVY8V8K30"
};

export default firebase.initializeApp(firebaseConfig);
