require('dotenv').config();
const { db } = require('./config/firebase');
const { COLLECTIONS } = require('./utils/constants');

async function checkAndSeedDriver() {
    const driverId = 'driver_001';

    try {
        const driverRef = db.collection(COLLECTIONS.DRIVERS).doc(driverId);
        const doc = await driverRef.get();

        if (!doc.exists) {
            console.log(`Driver ${driverId} not found. Creating test driver...`);
            await driverRef.set({
                name: "Test Driver",
                vanId: "van_001",
                contactNumber: "1234567890",
                associatedParentIds: [], // Empty for now, or add a test parent ID if we have one
                stops: [],
                homeLocation: { latitude: 6.9271, longitude: 79.8612 }
            });
            console.log(`Created test driver: ${driverId}`);
        } else {
            console.log(`Driver ${driverId} exists.`);
            // console.log('Data:', doc.data());
        }

    } catch (error) {
        console.error("Error checking/seeding driver:", error);
    }
}

checkAndSeedDriver();
