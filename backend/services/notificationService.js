// services/notificationService.js - Push notification service
const { expo, Expo } = require('../config/expo');

const sendPushNotifications = async (tokens, title, body, data = {}) => {
    const messages = tokens
        .filter(token => token && Expo.isExpoPushToken(token))
        .map(token => ({ to: token, sound: 'default', title, body, data }));

    if (messages.length === 0) return { success: 0, errors: 0, results: [] };

    let ticketErrors = 0, ticketSuccesses = 0, ticketResults = [];

    const chunks = expo.chunkPushNotifications(messages);
    for (const chunk of chunks) {
        try {
            const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            ticketResults.push(...ticketChunk);
            ticketSuccesses += ticketChunk.length;
        } catch (error) {
            console.error('Error sending notifications:', error);
            ticketErrors += chunk.length;
        }
    }
    return { success: ticketSuccesses, errors: ticketErrors, results: ticketResults };
};

const sendProximityNotification = async (token, childName, locationType, estimatedMinutes) => {
    return sendPushNotifications([token], `🚐 Van Approaching`, `${childName}'s van arrives in ~${estimatedMinutes} min`, { type: 'PROXIMITY', locationType, estimatedMinutes });
};

const sendTripStatusNotification = async (tokens, status, driverName) => {
    const title = status === 'started' ? '🚐 Trip Started' : '🏁 Trip Ended';
    const body = status === 'started' ? `${driverName} started the trip.` : `${driverName} ended the trip.`;
    return sendPushNotifications(tokens, title, body, { type: status === 'started' ? 'TRIP_START' : 'TRIP_END' });
};

const sendChildStatusNotification = async (token, childName, action) => {
    const title = action === 'picked' ? '✅ Child Picked Up' : '🏠 Child Dropped Off';
    const body = action === 'picked' ? `${childName} picked up` : `${childName} safely dropped off`;
    return sendPushNotifications([token], title, body, { type: action === 'picked' ? 'CHILD_PICKED' : 'CHILD_DROPPED' });
};

module.exports = { sendPushNotifications, sendProximityNotification, sendTripStatusNotification, sendChildStatusNotification };
