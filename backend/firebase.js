
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDJOtHU6FY4WosW_exH1q-CN6JyU0OmXZI",
    authDomain: "navi-kid-school-van-tracker.firebaseapp.com",
    projectId: "navi-kid-school-van-tracker",
    storageBucket: "navi-kid-school-van-tracker.firebasestorage.app",
    messagingSenderId: "997311667098",
    appId: "1:997311667098:web:8074b1381220c37cbe7823",
    measurementId: "G-8MP3BEFT1C"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
