import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

axios.interceptors.request.use(
    (config) => {
        const { origin } = new URL(config.url);
        const allowedOrigins = [BASE_URL];
        const token = localStorage.getItem("accessToken"); // get the token
        if (allowedOrigins.includes(origin)) {
            config.headers.authorization = `JWT ${token}`; // we put our token in the header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Get the list of users from the database
function getUsers() {
    const endpoint = BASE_URL + "/api/users";
    return axios
        .get(endpoint, { withCredentials: true })
        .then((res) => res.data);
}

// Use loading, normal, and error states with the returned data
export function useUsers() {
    const [loading, setLoading] = useState(true);
    const [usersData, setUsers] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getUsers()
            .then((usersData) => {
                setUsers(usersData);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setError(e);
                setLoading(false);
            });
    }, []);
    return {
        loading,
        usersData,
        error,
    };
}

// Get the list of stages from the database
function getStages() {
    const endpoint = BASE_URL + "/api/stages";
    return axios
        .get(endpoint, { withCredentials: true })
        .then((res) => res.data);
}

// Use loading, normal, and error states with the returned data
export function useStages() {
    const [loading, setLoading] = useState(true);
    const [stagesData, setStages] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getStages()
            .then((stagesData) => {
                setStages(stagesData);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setError(e);
                setLoading(false);
            });
    }, []);
    return {
        loading,
        stagesData,
        error,
    };
}