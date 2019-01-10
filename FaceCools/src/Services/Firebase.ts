import * as  firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBXCDDF938KQ1gkGjVgRbDKHOsfcd1dfOQ",
  authDomain: "facecool-a6f94.firebaseapp.com",
  databaseURL: "https://facecool-a6f94.firebaseio.com",
  projectId: "facecool-a6f94",
  storageBucket: "facecool-a6f94.appspot.com",
  messagingSenderId: "996879978051"
}
firebase.initializeApp(config);
  

const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

export const auth = firebase.auth();
export const db = firestore
export const storage = firebase.storage();