import axios from "axios";

const axiosModule = axios.create({
    headers: {
        'Access-Control-Allow-Origin': "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    },
    baseURL: "http://115.85.182.57:8080",
});

export default axiosModule;