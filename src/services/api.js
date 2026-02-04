import axios from "axios";

// As long, I work with Http session in the backend i need to configurate the axios to tell him to include the cookies
const api = axios.create({
    baseUrl: 'http://localhost:8080/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status } = error.response;

            if (status === 401) {
                // Clear local Storage and redirect to login in if session expires
                localStorage.removeItem('user');
                window.location.href = '/login';
            }

            if (status === 403) {
                console.error('Access Denied: You do not have permission.');
                window.location.href = '/403'
            }
        }

        // this throws the error back to the component that called the API
        return Promise.reject(error);
    }
);
export default api;
