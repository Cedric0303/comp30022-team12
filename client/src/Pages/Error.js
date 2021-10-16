import React from "react";
import { NavLink } from "react-router-dom";
import "./css/error.css";
import errorImage from "./css/error.gif";
import bobafishers from "./css/bobafishers.png"
import { Helmet } from "react-helmet";

export default function Error(props) {
    const error = props.error;

    const handleError = (error) => {
        switch (error) {
            case 400:
                return (
                    <div>
                        <img
                            id="errorImg"
                            src={errorImage}
                            alt="Error: You Shall Not Pass"
                        ></img>
                        <br/>
                        <br/>
                        <p>Error 400: Not logged in.</p>
                        <p>Please log in to access the website.</p>
                        <br />
                        <NavLink id="loginButton" to={"/"}>
                            <p>Login</p>
                        </NavLink>
                    </div>
                );
            case 401:
                return (
                    <div class="errorText">
                        <img
                            id="errorImg"
                            src={errorImage}
                            alt="Error: You Shall Not Pass"
                        ></img>
                        <br/>
                        <br/>
                        <p>Error 401: Unauthorized access.</p>
                        <p>
                            You do not have permissions to access this page.
                            Please contact your administrator.
                        </p>
                        <br />
                        <NavLink id="loginButton" to={"/home"}>
                            <p>Home</p>
                        </NavLink>
                    </div>
                );
            case 404:
                return (
                    <div class="errorText">
                        <img
                            id="errorImgFish"
                            src={bobafishers}
                            alt="Error: Page not found"
                        ></img>
                        <br/>
                        <br/>
                        <p>Error 404: Page not found.</p>
                        <p>
                            This page couldn't be found. Please contact your
                            administrator.
                        </p>
                        <br />
                        <NavLink id="loginButton" to={"/home"}>
                            <p>Home</p>
                        </NavLink>
                    </div>
                );
            default:
                return (
                    <div class="errorText">
                        <img
                            id="errorImg"
                            src={bobafishers}
                            alt="Error: Unknown error"
                        ></img>
                        <br/>
                        <br/>
                        <p>An unknown error has occured.</p>
                        <p>Please contact your administrator.</p>
                        <br />
                        <NavLink id="loginButton" to={"/home"}>
                            <p>Home</p>
                        </NavLink>
                    </div>
                );
        }
    };

    return (
        <div id="errorDiv">
            <Helmet>
                <title>Error! - Bobafish CRM</title>
                <meta
                    name="description"
                    content="Error page for Bobafish CRM"
                />
            </Helmet>
            {handleError(error)}
        </div>
    );
}
