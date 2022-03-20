// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbGcgvJl9TAeIz2LKjR4Eirl3_aykUvKc",
  authDomain: "learn-react-dee58.firebaseapp.com",
  projectId: "learn-react-dee58",
  storageBucket: "learn-react-dee58.appspot.com",
  messagingSenderId: "170060178764",
  appId: "1:170060178764:web:1032bb3e0ae3f012329be9",
  measurementId: "G-2KE62J9YLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export {
    app,
    analytics,
    firebaseConfig
}