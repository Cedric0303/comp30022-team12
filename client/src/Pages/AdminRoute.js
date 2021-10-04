import React from "react";
import { Route } from "react-router-dom";
import Auth from "./Auth.js";

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            Auth.getIsAdmin() ? (
                <Component {...props} />
            ) : (
                window.location.replace(
                    "https://www.youtube.com/watch?v=GwmJ76VjXaE"
                )
                // window.location.replace(
                //     "https://i.gifer.com/36Ja.gif"
                //     )
                // <Redirect
                //     to={{
                //         pathname: "https://www.youtube.com/watch?v=GwmJ76VjXaE",
                //     }}
                // />
            )
        }
    />
);

export default ProtectedRoute;
