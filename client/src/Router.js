import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminRoute from "./Pages/AdminRoute.js";
import ProtectedRoute from "./Pages/ProtectedRoute.js";

import Login from "./Pages/Login.js";
// Admin pages
import Admin from "./Pages/Admin.js";
import AdminAddUser from "./Pages/AdminAddUser.js";
import AdminEditUser from "./Pages/AdminEditUser.js";
import AdminManageUsers from "./Pages/AdminManageUsers.js";
import AdminManageStages from "./Pages/AdminManageStages.js";
// Common pages
import Home from "./Pages/Home.js";
import CalendarPage from "./Pages/CalendarPage.js";
import Clients from "./Pages/Clients.js";
import AddClient from "./Pages/AddClient.js";
import SpecificClient from "./Pages/SpecificClient.js";
import EditClient from "./Pages/EditClient.js";
import OrderHistory from "./Pages/OrderHistory.js";
import ScheduleMeeting from "./Pages/ScheduleMeeting.js";

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
                    <AdminRoute
                        path="/admin"
                        exact
                        component={Admin}
                    ></AdminRoute>
                    <AdminRoute
                        path="/admin/users"
                        exact
                        component={AdminManageUsers}
                    ></AdminRoute>
                    <AdminRoute
                        path="/admin/users/create"
                        exact
                        component={AdminAddUser}
                    ></AdminRoute>
                    <AdminRoute
                        path="/admin/users/:userID/edit"
                        exact
                        component={AdminEditUser}
                    ></AdminRoute>
                    <AdminRoute
                        path="/admin/stages"
                        exact
                        component={AdminManageStages}
                    ></AdminRoute>
                    <ProtectedRoute
                        path="/calendar"
                        exact
                        component={CalendarPage}
                    ></ProtectedRoute>
                    <ProtectedRoute
                        path="/clients"
                        exact
                        component={Clients}
                    ></ProtectedRoute>
                    <ProtectedRoute
                        path="/clients/create"
                        exact
                        component={AddClient}
                    ></ProtectedRoute>
                    <ProtectedRoute
                        path="/clients/:clientID"
                        exact
                        component={SpecificClient}
                    ></ProtectedRoute>
                    <ProtectedRoute
                        path="/clients/:clientID/edit"
                        exact
                        component={EditClient}
                    ></ProtectedRoute>
                    <ProtectedRoute
                        path="/clients/:clientID/orders"
                        exact
                        component={OrderHistory}
                    ></ProtectedRoute>
                    <ProtectedRoute
                        path="/calendar/scheduleMeeting"
                        exact
                        component={ScheduleMeeting}
                    ></ProtectedRoute>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
