import axios from 'axios';
import API_BASE_URL from './apiConfig';

const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

// instance.interceptors.request.use(
//     config => {
//         console.log("Request:", config)
//         return config;
//     },
//     error => {
//         console.log("Error", error)
//     }
// )

// instance.interceptors.response.use(
//     response => {
//         console.log("Response:", response)
//     },
//     error => {
//         console.log("Response Error:", error)
//     }
// )

export default instance;