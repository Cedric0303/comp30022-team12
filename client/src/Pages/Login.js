import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import axios from "axios";
import jwt from "jwt-decode";
import Auth from "./Auth.js";
import "./css/login.css";
import { ReactComponent as LogoText } from "./css/bobafish-logo-text.svg";
import { ReactComponent as Logo } from "./css/bobafish-logo.svg";
import ReactLoading from "react-loading";
import "./css/animation.css";

const Login = (props) => {
    useEffect(
        () =>
            axios
                .get(process.env.REACT_APP_BACKEND_API_URL + "/api")
                .then((response) => {
                    if (response.status === 200) {
                        console.log("Backend API server online.");
                    }
                })
                .catch(() => {
                    setErrorMsg(
                        "Backend API server is offline. Please try again at a later time."
                    );
                }),
        []
    );

    const [loading, setLoading] = useState(false);

    const toggleLoading = () => setLoading((loading) => !loading);

    const [user, setState] = useState({
        username: "",
        password: "",
    });

    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleLogin = (event) => {
        setErrorMsg("Loading...");
        toggleLoading();
        if (!user.username.length && !user.password.length) {
            setErrorMsg("Please enter a valid username and password.");
            toggleLoading();
        } else if (!user.username.length) {
            setErrorMsg("Please enter a valid username.");
            toggleLoading();
        } else if (!user.password.length) {
            setErrorMsg("Please enter a valid password.");
            toggleLoading();
        } else {
            setErrorMsg("Connected. Loading...");
            const payload = {
                username: user.username,
                password: user.password,
            };
            axios
                .post(
                    process.env.REACT_APP_BACKEND_API_URL +
                        "/api/account/login",
                    payload
                )
                .then((response) => {
                    if (response.status === 200) {
                        const token = response.data.token;
                        const data = jwt(token);
                        setState((prevState) => ({
                            ...prevState,
                            message: response.data.message,
                        }));
                        localStorage.setItem(
                            "accessToken",
                            response.data.token
                        );
                        Auth.authenticate(data.user);
                        redirectToHome();
                    }
                })
                .catch((e) => {
                    toggleLoading();
                    let errorMessage = e.toJSON().message;
                    if (errorMessage.includes(401)) {
                        setErrorMsg(
                            "The username or password you entered is incorrect. Please try again."
                        );
                    } else if (errorMessage.includes("Network Error")) {
                        setErrorMsg(
                            "Backend API server is offline. Please try again at a later time."
                        );
                    }
                });
        }
        event.preventDefault();
    };

    const redirectToHome = () => {
        props.history.push("/home");
    };

    return (
        <div>
            <Helmet>
                <style type="text/css">{`
                    html {
                        background-color: #5e779d;
                    }
                `}</style>
                <title>Login - Bobafish CRM</title>
                <meta name="description" content="Login to Bobafish CRM" />
            </Helmet>

            <LogoText id="logoText" />

            <Logo title="bobafish" alt="bobafish logo" className="logo" />
            <div id="formID">
                <form className="form" onSubmit={handleLogin}>
                    <label id="usernameInput">Username</label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={user.username}
                        onChange={handleChange}
                    />
                    <br />
                    <label id="passwordInput">Password</label>
                    <br />
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    <input
                        type="submit"
                        value="Login"
                        className="loginButton"
                    />
                </form>
                <p className="errorMsg">{errorMsg ? errorMsg : ""}</p>
                <br />
                {loading && (
                    <ReactLoading
                        id="login-loading-anim"
                        type="spin"
                        color="ivory"
                        height="2%"
                        width="2%"
                    ></ReactLoading>
                )}
            </div>
        </div>
    );
};

export default withRouter(Login);
