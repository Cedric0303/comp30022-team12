import React from "react";
import { Route } from "react-router-dom";
import Auth from "./Auth.js";
import Error from "./Error.js";

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (!Auth.getAuth()) {
                return <Error {...props} error={400} />;
            } else {
                return <Component {...props} />;
            }
        }}
    />
);

export default ProtectedRoute;
