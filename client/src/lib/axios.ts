import axios from "axios";

const peertopeerapi = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5002/api" : "/api",
    withCredentials: true
});

export default peertopeerapi;