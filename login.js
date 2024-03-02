import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


document.getElementById('login-form').addEventListener('submit', (event)=> {
  event.preventDefault();
  login();
})

const firebaseConfig = {
  apiKey: "AIzaSyBZnn4RPMlAdECe6k4kgJTRUBflgR4hTEA",
  authDomain: "travel-buddy-471e0.firebaseapp.com",
  projectId: "travel-buddy-471e0",
  storageBucket: "travel-buddy-471e0.appspot.com",
  messagingSenderId: "785129601834",
  appId: "1:785129601834:web:4a82e0e7c5fe4668983c53",
  measurementId: "G-PMQWZR7Y8L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.location.assign('/deep-home.html')
  }
  else {
    alert('user is not signed in')
    }
  })


function login(){
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log("User signed in:", user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });
}