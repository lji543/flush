import fire from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyA9M7aEW1gggW6v4TtlGFGasMsatUEyhwA",
  authDomain: "flushseattle.firebaseapp.com",
  databaseURL: "https://flushseattle.firebaseio.com",
  projectId: "flushseattle",
  storageBucket: "flushseattle.appspot.com",
  messagingSenderId: "624767308695"
};
const firebase = fire.initializeApp(config);
export default firebase;
