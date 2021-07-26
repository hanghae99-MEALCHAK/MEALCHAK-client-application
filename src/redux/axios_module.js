import axios from "axios";

const axiosModule = axios.create({
    headers: {
        'Access-Control-Allow-Origin': "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    },
    baseURL: "http://localhost:4000",
});

export default axiosModule;