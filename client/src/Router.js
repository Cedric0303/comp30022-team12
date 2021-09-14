import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Pages/ProtectedRoute.js";

import Login from "./Pages/Login.js";
// Admin pages
import Admin from "./Pages/Admin.js";
import AdminAddUser from "./Pages/AdminAddUser.js";
import AdminEditUser from "./Pages/AdminEditUser.js";
import AdminManageUsers from "./Pages/AdminManageUsers.js";
import AdminManageTags from "./Pages/AdminManageTags.js";
// Common pages
import Home from "./Pages/Home.js";
import Calendar from "./Pages/Calendar.js";
import Clients from "./Pages/Clients.js";

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Login}></Route>
                    <ProtectedRoute
                        path="/home"
                        exact
                        component={Home}
                    ></ProtectedRoute>
                    <ProtectedRoute
                        path="/admin"
                        exact
                        component={Admin}
                    ></ProtectedRoute>
                    <ProtectedRoute
                        path="/admin/users"
                        exact
                        component={AdminManageUsers}
                    ></ProtectedRoute>
                    <ProtectedRoute
                        path="/admin/users/create"
                        exact
                        component={AdminAddUser}
                    ></ProtectedRoute>
                    <ProtectedRoute
                        path="/admin/users/:userID/edit"
                        exact
                        component={AdminEditUser}
                    ></ProtectedRoute>
                    <ProtectedRoute
                        path="/admin/tags"
                        exact
                        component={AdminManageTags}
                    ></ProtectedRoute>
                    <ProtectedRoute
                        path="/calendar"
                        exact
                        component={Calendar}
                    ></ProtectedRoute>
                    <ProtectedRoute
                        path="/clients"
                        exact
                        component={Clients}
                    ></ProtectedRoute>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
