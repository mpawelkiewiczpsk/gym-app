import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb);
}

function onRefreshed(token) {
    refreshSubscribers.map((cb) => cb(token));
    refreshSubscribers = [];
}

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const { config, response: { status } } = error;
        const originalRequest = config;

        if (status === 401 && !originalRequest._retry) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    const { data } = await axiosInstance.post('/refresh-token', { refreshToken: refreshToken });
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    axiosInstance.defaults.headers.common['Authorization'] = `${data.accessToken}`;
                    onRefreshed(data.accessToken);
                    isRefreshing = false;
                } catch (err) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                    return Promise.reject(error);
                }
            }

            return new Promise((resolve) => {
                subscribeTokenRefresh((token) => {
                    originalRequest.headers['Authorization'] = token;
                    resolve(axiosInstance(originalRequest));
                });
            });
        }
        return Promise.reject(error);
    }
);


