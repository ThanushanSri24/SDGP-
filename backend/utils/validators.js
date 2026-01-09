// utils/validators.js - Input validation helpers
const { ROLES } = require('./constants');

const validateRequiredFields = (body, requiredFields) => {
    const missingFields = requiredFields.filter(field => !body[field]);
    return { isValid: missingFields.length === 0, missingFields };
};

const isValidRole = (role) => Object.values(ROLES).includes(role);

const isValidCoordinates = (lat, lng) => {
    return typeof lat === 'number' && typeof lng === 'number' &&
        lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};

const isValidLocation = (location) => {
    if (!location || typeof location !== 'object') return false;
    return isValidCoordinates(location.latitude, location.longitude);
};

module.exports = { validateRequiredFields, isValidRole, isValidCoordinates, isValidLocation };
