// Configuración de la API
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? '/proyectoTecnica/public_html/backend/api'
    : '/public_html/backend/api';

export const API_ENDPOINTS = {
    // Auth
    LOGIN: `${API_BASE_URL}/login.php`,
    REGISTER: `${API_BASE_URL}/register.php`,
    
    // Users
    USERS_LIST: `${API_BASE_URL}/users/read.php`,
    USERS_CREATE: `${API_BASE_URL}/users/create.php`,
    USERS_UPDATE: `${API_BASE_URL}/users/update.php`,
    USERS_DELETE: `${API_BASE_URL}/users/delete.php`,
    
    // Appointments
    APPOINTMENTS_LIST: `${API_BASE_URL}/appointments/read.php`,
    
    // Services
    SERVICES_BY_CLIENT: `${API_BASE_URL}/services/read_by_client.php`,
};

export default API_ENDPOINTS; 