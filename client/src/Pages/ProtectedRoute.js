import React from "react";
import { Redirect, Route } from "react-router-dom";
import Auth from "./Auth.js";

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            Auth.getAuth() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                    }}
                />
            )
        }
    />
);

export default ProtectedRoute;
