import axios from 'axios';

const axiosbase = axios.create({
    baseURL: "http://localhost:5200/api/"
});

export default axiosbase;
