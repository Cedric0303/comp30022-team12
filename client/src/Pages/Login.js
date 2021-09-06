import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { BACKEND_API_URL } from "../Constants/Constants.js";
import axios from "axios";

const Login = (props) => {
    const [state, setState] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleLogin = () => {
        console.log(state);
        if (state.username.length && state.password.length) {
            const payload = {
                username: state.username,
                password: state.password,
            };
            axios
                .post(BACKEND_API_URL + "/account/login", payload)
                .then((response) => {
                    setState((prevState) => ({
                        ...prevState,
                        message: response.data.message,
                    }));
                    if (response.status === 200) {
                        localStorage.setItem(
                            "accessToken",
                            response.data.token
                        );
                        redirectToHome();
                    }
                })
                .catch(() => {
                    redirectToLandingPage();
                });
        }
    };

    const redirectToHome = () => {
        props.history.push("/home");
    };

    const redirectToLandingPage = () => {
        props.history.push("/");
    };

    return (
        <div>
            <h2>Login Page</h2>
            <label>Username: </label>
            <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={state.username}
                onChange={handleChange}
            />
            <p />
            <label>Password: </label>
            <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={state.password}
                onChange={handleChange}
            />
            <p />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default withRouter(Login);
