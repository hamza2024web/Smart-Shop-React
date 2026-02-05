import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8084/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach the JWT token to every request if it exists in localStorage
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status } = error.response;

            if (status === 401) {
                localStorage.removeItem('user');
                window.location.href = '/login';
            }

            if (status === 403) {
                console.error('Access Denied: You do not have permission.');
                window.location.href = '/403'
            }
        }

        return Promise.reject(error);
    }
);

export default api;
