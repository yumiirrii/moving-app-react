// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB-NGowLspjaawBOL4HJwNJqIJ3jurZ-mo",
//   authDomain: "moving-app-react.firebaseapp.com",
//   projectId: "moving-app-react",
//   storageBucket: "moving-app-react.appspot.com",
//   messagingSenderId: "112348962966",
//   appId: "1:112348962966:web:d25dcabe00b81a2457a2b7"
// };

const firebaseConfig = {
  apiKey: 'AIzaSyBsPNooUEBysKKkGm4UIXEMX-aKXP3yKa8',
  authDomain: 'moving-app-2023.firebaseapp.com',
  projectId: 'moving-app-2023',
  storageBucket: 'moving-app-2023.appspot.com',
  messagingSenderId: '747821745888',
  appId: '1:747821745888:web:f0fd0719a693c54b68f285',
  measurementId: 'G-QZ2H1J6X39'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db
}