import axios from "axios";
import { BASE_URL_API_ENDPOINT } from "../utils/constants";

const axiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    baseURL: BASE_URL_API_ENDPOINT,
});

export default axiosInstance;