const API_URL = 'http://192.168.1.4:3000';

export default API_URL;

export const API_ENDPOINTS = {
  REGISTER_TOKEN: `${API_URL}/api/register-token`,
  SOS: `${API_URL}/api/sos`,
  GET_DRIVER: (driverId: string) => `${API_URL}/api/driver/${driverId}`,
  GET_PARENT: (parentId: string) => `${API_URL}/api/parent/${parentId}`,
  HEALTH: `${API_URL}/health`,
};