import { useState, useEffect } from "react";
import axios from "axios";
import Auth from "./Pages/Auth";

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

// Get a single user from the database
export async function getUser(username) {
    const endpoint = BASE_URL + "/api/users/" + username;
    const res = await axios.get(endpoint, {
        withCredentials: true,
    });
    return res.data;
}

// Get the list of users from the database
async function getUsers() {
    const endpoint = BASE_URL + "/api/users";
    const res = await axios.get(endpoint, { withCredentials: true });
    return res.data;
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
export async function getStages() {
    const endpoint = BASE_URL + "/api/stages";
    const res = await axios.get(endpoint, { withCredentials: true });
    let stagesData = res.data;
    stagesData.stages.sort((a, b) => a.position - b.position);
    return stagesData;
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

// Get the list of clients from the database
async function getClients() {
    const endpoint = BASE_URL + "/api/clients";
    const res = await axios.post(endpoint, {
        userReference: Auth.getUsername(),
        withCredentials: true,
    });
    return res.data;
}

// Use loading, normal, and error states with the returned data
export function useClients() {
    const [loading, setLoading] = useState(true);
    const [clientsData, setClients] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getClients()
            .then((clientsData) => {
                setClients(clientsData);
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
        clientsData,
        error,
    };
}

export async function postUser(registerBody) {
    const endpoint = BASE_URL + "/api/users/create";
    const res = await axios.post(endpoint, registerBody, {
        withCredentials: true,
    });
    var message = res.data.message;
    if (message === "User already exists!") {
        alert(res.data.message);
        return false;
    } else {
        // Created new user!
        alert(res.data.message);
        window.location.href = "/admin/users/create";
    }
}

export async function postEditUser(registerBody, uid) {
    const endpoint = BASE_URL + "/api/users/" + uid + "/edit";
    const res = await axios.post(endpoint, registerBody, {
        withCredentials: true,
    });
    if (res.data.message === "Edit user successful!") {
        alert(res.data.message);
        window.location.href = "/admin/users";
    } else {
        alert(res.data.message);
        return false;
    }
}

export async function deleteUser(uid) {
    const endpoint = BASE_URL + "/api/users/" + uid + "/remove";
    const res = await axios.get(endpoint, { withCredentials: true });
    console.log("deleteUser res");
    if (res.data.message === "User removal successful!") {
        alert(res.data.message);
        window.location.href = "/admin/users";
    } else {
        alert(res.data.message);
        return false;
    }
}

// Get the client from the database
async function getClient(cid) {
    const endpoint = BASE_URL + "/api/clients/" + cid;
    const res = await axios.get(endpoint, {
        withCredentials: true,
    });
    return res.data;
}

// Use loading, normal, and error states with the returned data
export function useClient(cid) {
    const [loading, setLoading] = useState(true);
    const [clientData, setClient] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getClient(cid)
            .then((clientData) => {
                setClient(clientData);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setError(e);
                setLoading(false);
            });
    }, [cid]);
    return {
        loading,
        clientData,
        error,
    };
}

// Get the list of activities from the database
async function getActivities(cid) {
    const endpoint = BASE_URL + "/api/activities";
    const res = await axios.post(endpoint, {
        userReference: Auth.getUsername(),
        clientReference: cid,
        withCredentials: true,
    });
    return res.data;
}

// Use loading, normal, and error states with the returned data
export function useActivities(cid) {
    const [loading, setLoading] = useState(true);
    const [activitiesData, setActivities] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getActivities(cid)
            .then((activitiesData) => {
                // Convert Strings to Dates (JSON returns Strings)
                activitiesData.activities.forEach((act) => {
                    act.timeStart = new Date(act.timeStart);
                    act.timeEnd = new Date(act.timeEnd);
                });
                setActivities(activitiesData);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setError(e);
                setLoading(false);
            });
    }, [cid]);
    return {
        loading,
        activitiesData,
        error,
    };
}

// Get the list of orders from the database
async function getOrders(cid) {
    const endpoint = BASE_URL + "/api/orders";
    const res = await axios.post(endpoint, {
        userReference: Auth.getUsername(),
        clientReference: cid,
        withCredentials: true,
    });
    return res.data;
}

// Use loading, normal, and error states with the returned data
export function useOrders(cid) {
    const [loading, setLoading] = useState(true);
    const [ordersData, setOrders] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getOrders(cid)
            .then((ordersData) => {
                setOrders(ordersData);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setError(e);
                setLoading(false);
            });
    }, [cid]);
    return {
        loading,
        ordersData,
        error,
    };
}

export async function postNewNote(noteBody) {
    const endpoint = BASE_URL + "/api/clients/" + noteBody.cid + "/addNote";
    return axios
        .post(endpoint, { note: noteBody.note, withCredentials: true })
        .then((res) => res.data.client);
}

export async function deleteNote(noteBody) {
    const endpoint = BASE_URL + "/api/clients/" + noteBody.cid + "/removeNote";
    const res = await axios.post(endpoint, {
        nid: noteBody.nid,
        withCredentials: true,
    });
    return res.data;
}

export async function postMeeting(meetingBody) {
    const endpoint = BASE_URL + "/api/activities/create";
    await axios.post(endpoint, {
        clientReference: meetingBody.cid,
        userReference: Auth.getUsername(),
        timeStart: meetingBody.start,
        timeEnd: meetingBody.end,
        type: meetingBody.name,
        withCredentials: true,
    });
    window.location.href = "/clients/" + meetingBody.cid;
}
export async function postStage(newStage) {
    const endpoint = BASE_URL + "/api/stages/create";
    try {
        const response = await axios.post(endpoint, newStage, {
            withCredentials: true,
        });
        var message = response.data.message;
        if (response.status === 200) {
            alert(message);
        }
    } catch (e) {}
}

export async function editStage(currStage, stageID) {
    const endpoint = BASE_URL + "/api/stages/" + stageID + "/edit";
    try {
        const response = await axios.post(endpoint, currStage, {
            withCredentials: true,
        });
        var message = response.data.message;
        if (response.status === 200) {
            alert(message);
        } else {
            console.log(response.data);
        }
    } catch (e) {}
}

export async function deleteStage(stageID) {
    const endpoint = BASE_URL + "/api/stages/" + stageID + "/remove";
    try {
        const response = await axios.get(endpoint, { withCredentials: true });
        var message = response.data.message;
        if (response.status === 200) {
            alert(message);
            window.location.reload();
        } else {
            console.log(response.data);
        }
    } catch (e) {}
}

export async function postStagePosUpdate(payload) {
    const endpoint = BASE_URL + "/api/stages/editStages";
    const res = await axios.post(endpoint, payload, { withCredentials: true });
    if (res.status !== 200) {
        alert("Failed to save new stage order! ");
        return false;
    } else {
        alert("Successfully saved new stage order!");
        window.location.href = "/admin/stages";
    }
}
