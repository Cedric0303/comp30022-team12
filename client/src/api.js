import { useState, useEffect } from "react";
import axios from "axios";

// Get the list of users from the database
function getUsers() {
	const endpoint =
		process.env.REACT_APP_BACKEND_API_URL +
		"/users";
	return axios
		.get(endpoint)
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