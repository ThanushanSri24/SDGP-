// config/firebase.js - Firebase Admin SDK & Firestore initialization
const admin = require('firebase-admin');

<<<<<<< HEAD
=======
// Use environment variables for security (loaded from .env file)
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

<<<<<<< HEAD
=======
// Initialize the Firebase Admin SDK with the service account details
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

<<<<<<< HEAD
=======
// Get a reference to the Firestore database
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
const db = admin.firestore();

module.exports = { admin, db };
