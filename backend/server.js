// server.js - Updated with your specific Firebase project details

// Import required modules
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// --- Firebase Admin SDK Initialization ---
// Use environment variables for security (loaded from .env file)
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

// Initialize the Firebase Admin SDK with the service account details
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Get a reference to the Firestore database
const db = admin.firestore();

// --- API Endpoints ---

// Endpoint 1: Register FCM Token (Updated for your schema)
app.post('/api/register-token', async (req, res) => {
  const { userId, role, fcmToken, name, email, phone, assignedVehicleId, associatedDriverId, associatedParentIds } = req.body;

  console.log('Received token registration request:', { userId, role, fcmToken });

  if (!userId || !role || !fcmToken) {
    return res.status(400).json({ error: 'Missing required fields: userId, role, fcmToken' });
  }

  try {
    let collectionName;
    let documentData = {
      userId: userId,
      fcmToken: fcmToken,
      name: name || null,
      email: email || null,
      phone: phone || null,
      // Add other common fields here if needed
    };

    if (role === 'driver') {
      collectionName = 'drivers';
      documentData.assignedVehicleId = assignedVehicleId || null;
      documentData.associatedParentIds = associatedParentIds || [];
      // Add other driver-specific fields as needed based on your schema
    } else if (role === 'parent') {
      collectionName = 'parents';
      documentData.associatedDriverId = associatedDriverId || null;
      // Add other parent-specific fields as needed based on your schema
    } else {
      return res.status(400).json({ error: 'Invalid role. Must be "driver" or "parent".' });
    }

    const userRef = db.collection(collectionName).doc(userId);
    await userRef.set(documentData, { merge: true });

    console.log(`Token registered successfully for ${role}: ${userId} in collection ${collectionName}`);

    res.status(200).json({ success: true, message: `${role.charAt(0).toUpperCase() + role.slice(1)} token registered successfully` });

  } catch (error) {
    console.error('Error registering FCM token:', error);
    res.status(500).json({ error: 'Failed to register FCM token', details: error.message });
  }
});

// Endpoint 2: Trigger Emergency Alert (Updated for your schema)
app.post('/api/sos', async (req, res) => {
  const { driverId, message, location } = req.body;

  console.log('Received SOS request:', { driverId, message });

  if (!driverId) {
    return res.status(400).json({ error: 'Missing required field: driverId' });
  }

  try {
    const driverDoc = await db.collection('drivers').doc(driverId).get();

    if (!driverDoc.exists) {
      console.error(`Driver document not found for ID: ${driverId}`);
      return res.status(404).json({ error: 'Driver not found' });
    }

    const driverData = driverDoc.data();
    console.log('Driver data found:', driverData);

    const associatedParentIds = driverData.associatedParentIds || [];

    if (associatedParentIds.length === 0) {
      console.warn(`No parents associated with driver ID: ${driverId}`);
      return res.status(404).json({ error: 'No parents associated with this driver' });
    }

    console.log(`Found ${associatedParentIds.length} associated parents for driver ${driverId}`);

    const parentDocs = await Promise.all(
      associatedParentIds.map(parentId => db.collection('parents').doc(parentId).get())
    );

    const parentTokens = parentDocs
      .filter(doc => doc.exists)
      .map(doc => doc.data().fcmToken)
      .filter(token => token && token.trim() !== '');

    console.log(`Found ${parentTokens.length} valid parent tokens:`, parentTokens);

    if (parentTokens.length === 0) {
      console.warn(`No valid FCM tokens found for parents associated with driver ID: ${driverId}`);
      return res.status(404).json({ error: 'No valid parent FCM tokens found' });
    }

    const messages = parentTokens.map(token => ({
      token: token,
      notification: {
        title: '🚨 EMERGENCY ALERT!',
        body: message || 'Driver has triggered an emergency alert.',
      },
      data: {
        type: 'EMERGENCY',
        driverId: driverId,
        timestamp: new Date().toISOString(),
        location: location ? JSON.stringify(location) : null,
      },
    }));

    const results = await Promise.allSettled(
      messages.map(msg => admin.messaging().send(msg))
    );

    const successes = results.filter(r => r.status === 'fulfilled').length;
    const failures = results.filter(r => r.status === 'rejected').length;

    console.log(`SOS notification sent: ${successes} successful, ${failures} failed.`);

    const alertRef = db.collection('emergencyAlerts').doc();
    await alertRef.set({
      alertId: alertRef.id,
      driverId: driverId,
      parentIds: associatedParentIds, // Store ALL parent IDs affected
      message: message || 'Emergency triggered by driver.',
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      status: failures === 0 ? 'sent' : (successes > 0 ? 'partially_sent' : 'failed'),
    });

    console.log(`Emergency alert logged in Firestore with ID: ${alertRef.id}`);

    res.status(200).json({
      success: true,
      message: 'SOS alert sent successfully',
      sentToCount: successes,
      failedCount: failures,
      loggedAlertId: alertRef.id,
    });

  } catch (error) {
    console.error('Error processing SOS request:', error);
    res.status(500).json({ error: 'Internal server error while processing SOS', details: error.message });
  }
});

// Endpoint 3: Example - Get Driver Info (Optional utility endpoint)
app.get('/api/driver/:driverId', async (req, res) => {
  const { driverId } = req.params;

  try {
    const driverDoc = await db.collection('drivers').doc(driverId).get();

    if (!driverDoc.exists) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    res.status(200).json(driverDoc.data());
  } catch (error) {
    console.error('Error fetching driver:', error);
    res.status(500).json({ error: 'Failed to fetch driver', details: error.message });
  }
});

// Endpoint 4: Example - Get Parent Info (Optional utility endpoint)
app.get('/api/parent/:parentId', async (req, res) => {
  const { parentId } = req.params;

  try {
    const parentDoc = await db.collection('parents').doc(parentId).get();

    if (!parentDoc.exists) {
      return res.status(404).json({ error: 'Parent not found' });
    }

    res.status(200).json(parentDoc.data());
  } catch (error) {
    console.error('Error fetching parent:', error);
    res.status(500).json({ error: 'Failed to fetch parent', details: error.message });
  }
});

// Optional: Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// --- Start the Server ---
const PORT = process.env.PORT || 3000; // Use PORT from environment variable or default to 3000
app.listen(PORT, () => {
  console.log(`\n--- Server is running ---`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Port: ${PORT}`);
  console.log(`Firestore Project: navi-kid-school-van-tracker`); // Using the hardcoded project ID
  console.log(`------------------------\n`);
});