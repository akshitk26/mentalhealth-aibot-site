// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwkyFWnz30TIMQ5u4sqhWvJO5Epe9oWkY",
  authDomain: "mentalhealth-bot-site.firebaseapp.com",
  projectId: "mentalhealth-bot-site",
  storageBucket: "mentalhealth-bot-site.appspot.com",
  messagingSenderId: "1049371335040",
  appId: "1:1049371335040:web:38eefde53405d63f79c965"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)