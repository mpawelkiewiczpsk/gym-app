import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `${token}`,
            };
        }

        return config;
    },
    (error) => Promise.reject(error)
);


