// Backend API URL
export const API_URL = 'http://localhost:5000/api';
export const UPLOAD_URL = 'http://localhost:5000';

export const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    const headers: any = {
        ...getAuthHeaders(),
        ...options.headers,
    };

    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        // Handle unauthorized (redirect to login)
        window.location.href = '/admin/login';
        throw new Error('Unauthorized');
    }

    return response;
};
