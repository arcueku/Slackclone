import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

if (!firebase.apps.length) {
  const config = {
    apiKey: "AIzaSyDt-0NWRfCd7FYfd9huiBFBgQUt06fCoF8",
    authDomain: "slack-clone-app-279f9.firebaseapp.com",
    databaseURL: "https://slack-clone-app-279f9.firebaseio.com",
    projectId: "slack-clone-app-279f9",
    storageBucket: "slack-clone-app-279f9.appspot.com",
    messagingSenderId: "60639874731",
    appId: "1:60639874731:web:11c4fd1c47e4e24bf371ee",
    measurementId: "G-1NJ60RVHTZ"
  };
  firebase.initializeApp(config);
}

const db = firebase.firestore();
export { firebase, db };
