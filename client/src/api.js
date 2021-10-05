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
export function getStages() {
    const endpoint = BASE_URL + "/api/stages";
    return axios
        .get(endpoint, { withCredentials: true })
        .then((res) => {
            let stagesData = res.data
            stagesData.stages.sort((a,b) => (a.position - b.position));
            return stagesData;
        });
}

// Use loading, normal, and error states with the returned data
export function useStages() {
    const [loading, setLoading] = useState(true);
    const [stagesData, setStages] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getStages()
            .then((stagesData) => {
                setStages(stagesData.stages);
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

export function postStage(newStage) {
    const endpoint = BASE_URL + "/api/stages/create";    
    return axios
        .post(endpoint, newStage)
        .then((response) => {
            var message = response.data.message;
            if(response.status === 200){
                alert(message);
            }
        })
        .catch(() => {    
        });
}

export function editStage(currStage, stageID) {
    const endpoint = BASE_URL + "/api/stages/" + stageID + "/edit";
    return axios
        .post(endpoint, currStage)
        .then((response) => {
            var message = response.data.message;
            if(response.status === 200){
                alert(message);
            }
        })
        .catch(() => {    
        });
}

export function deleteStage(stageID) {
    const endpoint = BASE_URL + "/api/stages/" + stageID + "/remove";
    return axios
        .get(endpoint)
        .then((response) => {
            var message = response.data.message;
            if(response.status === 200){
                alert(message);
                window.location.reload();
            }
        })
        .catch(() => {    
        });
}

export function postStagePosUpdate(payload) {
    const endpoint = BASE_URL + "/api/stages/editStages";
    return axios
        .post(endpoint, payload, { withCredentials: true })
        .then((res) => {
            if (res.status !== 200) {
                alert("Failed to save new stage order! ");
                return false;
            } else {
                alert("Successfully saved new stage order!");
                window.location.href = "/admin/stages";
            }
        });
}