import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCsqj5HNorr4S0i8h325aPuzGa1xLPYPzA",
    authDomain: "signal-clone-app-9a629.firebaseapp.com",
    projectId: "signal-clone-app-9a629",
    storageBucket: "signal-clone-app-9a629.appspot.com",
    messagingSenderId: "251726224634",
    appId: "1:251726224634:web:8f21e93c8b96bcea8b3d43"
  };


let  app ;
// if(firebase.app.length===0){
//   app = firebase.initializeApp(firebaseConfig);
// }else{
//   app = firebase.app();
// }
app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();

export { db, auth};
