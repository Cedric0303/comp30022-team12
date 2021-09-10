import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { render } from "@testing-library/react";

const Login = (props) => {
    const [state, setState] = useState({
        username: "",
        password: "",
    });

    const [errorMsg, setErrorMsg] = useState('');

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
                .post(
                    process.env.REACT_APP_BACKEND_API_URL + "/account/login",
                    payload
                )
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
                    //redirectToLandingPage();
                    setErrorMsg('The username or password you entered is incorrect. Please try again.');
                });
        }
    };

    // 13 is the recognized number of the Enter key
    const onEnterPress = (e) => {
        if (e.keyCode === 13) {
            handleLogin();
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
            <form onSubmit={handleLogin}>
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
                    onKeyDown={onEnterPress}
                />
                <p />
            </form>
            <p>{errorMsg ? errorMsg : ''}</p>
            <button onClick={handleLogin}>Login</button>
            </div>
    );
};

export default withRouter(Login);
