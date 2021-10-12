import React from "react";
import { Route } from "react-router-dom";
import Auth from "./Auth.js";
import { NavLink } from "react-router-dom";
import "./css/error404.css";

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={
            (props) =>
                Auth.getIsAdmin() ? (
                    <Component {...props} />
                ) : (
                    <div>
                        <div id="errorDiv">
                            <img
                                src="https://memegenerator.net/img/instances/71496815/404-you-shall-not-pass.jpg"
                                alt="Error 404 Image"
                            ></img>
                            <p>Error 404: Page not found.</p>
                            <p>
                                Please login to access the website or contact
                                your administrator.
                            </p>
                            <br />
                            <NavLink id="loginButton" to={"/"}>
                                Login
                            </NavLink>
                        </div>
                    </div>
                )
            // (
            // window.location.replace(
            //     "https://www.youtube.com/watch?v=GwmJ76VjXaE"
            // )
            // )
        }
    />
);

export default ProtectedRoute;
