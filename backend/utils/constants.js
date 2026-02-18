// utils/constants.js - Application constants

<<<<<<< HEAD
=======
// User roles
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
const ROLES = {
    DRIVER: 'driver',
    PARENT: 'parent',
};

<<<<<<< HEAD
=======
// Firestore collection names
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
const COLLECTIONS = {
    DRIVERS: 'drivers',
    PARENTS: 'parents',
    CHILDREN: 'children',
    TRIPS: 'trips',
    VANS: 'vans',
    RATINGS: 'ratings',
    EMERGENCY_ALERTS: 'emergencyAlerts',
    ABSENCES: 'absences',
};

<<<<<<< HEAD
=======
// Trip statuses
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
const TRIP_STATUS = {
    NOT_STARTED: 'not_started',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
};

<<<<<<< HEAD
=======
// Alert statuses
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
const ALERT_STATUS = {
    SENT: 'sent',
    PARTIALLY_SENT: 'partially_sent',
    FAILED: 'failed',
};

<<<<<<< HEAD
=======
// Notification types
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
const NOTIFICATION_TYPES = {
    EMERGENCY: 'EMERGENCY',
    PROXIMITY: 'PROXIMITY',
    TRIP_START: 'TRIP_START',
    TRIP_END: 'TRIP_END',
    CHILD_PICKED: 'CHILD_PICKED',
    CHILD_DROPPED: 'CHILD_DROPPED',
    ABSENCE_CONFIRMED: 'ABSENCE_CONFIRMED',
};

<<<<<<< HEAD
=======
// Absence types
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
const ABSENCE_TYPES = {
    FULL_DAY: 'full_day',
    MORNING_ONLY: 'morning_only',
    EVENING_ONLY: 'evening_only',
};

<<<<<<< HEAD
module.exports = { ROLES, COLLECTIONS, TRIP_STATUS, ALERT_STATUS, NOTIFICATION_TYPES, ABSENCE_TYPES };
=======
module.exports = {
    ROLES,
    COLLECTIONS,
    TRIP_STATUS,
    ALERT_STATUS,
    NOTIFICATION_TYPES,
    ABSENCE_TYPES,
};
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
