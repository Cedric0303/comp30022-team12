import React from "react";
import { Route } from "react-router-dom";
import Auth from "./Auth.js";
import Error from "./Error.js";

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (!Auth.getAuth()) {
                return <Error {...props} error={404} />;
            } else if (!Auth.getIsAdmin()) {
                return <Error {...props} error={401} />;
            } else {
                return <Component {...props} />;
            }
        }}
    />
);

export default ProtectedRoute;
