// Frontend/admin/firebaseConfig.ts
// Firebase initialization for Expo (web and supported features)
import { initializeApp, getApps, getApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDJOtHU6FY4WosW_exH1q-CN6JyU0OmXZI",
  authDomain: "navi-kid-school-van-tracker.firebaseapp.com",
  projectId: "navi-kid-school-van-tracker",
  storageBucket: "navi-kid-school-van-tracker.firebasestorage.app",
  messagingSenderId: "997311667098",
  appId: "1:997311667098:web:8074b1381220c37cbe7823",
  measurementId: "G-8MP3BEFT1C"
};

//  Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();



export { app };