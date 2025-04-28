import axios from "axios";

const peertopeerapi = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5002/api/v1" : "/api/v1",
    withCredentials: true
});

export default peertopeerapi;