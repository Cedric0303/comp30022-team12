import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import axios from "axios";
import jwt from "jwt-decode";
import Auth from "./Auth.js";
import "./css/login.css";
import logo from "./css/bobafish-logo.svg";

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
        if (!user.username.length && !user.password.length) {
            setErrorMsg("Please enter a valid username and password.");
        } else if (!user.username.length) {
            setErrorMsg("Please enter a valid username.");
        } else if (!user.password.length) {
            setErrorMsg("Please enter a valid password.");
        } else {
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
                    console.log(e.toJSON());
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

    // useEffect(() => {
    //     document.addEventListener("keydown", onEnterPress, false);
    // });

    // 13 is the recognized number of the Enter key
    // const onEnterPress = (e) => {
    //     if (e.keyCode === 13) {
    //         handleLogin();
    //     }
    // };

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
            </Helmet>

            <h1 className="title">bobafish CRM</h1>

            <img src={logo} alt="bobafish logo" className="logo"></img>

            <form className="form" onSubmit={handleLogin}>
                <label id="usernameInput">
                    Username:&nbsp;
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Username"
                        value={user.username}
                        onChange={handleChange}
                    />
                </label>
                <label id="passwordInput">
                    Password:&nbsp;
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </label>
                <p className="errorMsg">{errorMsg ? errorMsg : ""}</p>
                <input type="submit" value="Login" className="loginButton" />
            </form>
        </div>
    );
};

export default withRouter(Login);
