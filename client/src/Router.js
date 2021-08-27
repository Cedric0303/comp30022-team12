import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Landing page
import LandingPage from "./Pages/LandingPage.js"
// Admin pages
import Admin from "./Pages/Admin.js";
import AdminAddUser from "./Pages/AdminAddUser.js";
import AdminEditUser from "./Pages/AdminEditUser.js";
import AdminManageUsers from "./Pages/AdminManageUsers.js";
import AdminManageTags from "./Pages/AdminManageTags.js";
// Common pages
import Login from "./Pages/Login.js";
import Home from "./Pages/Home.js";
import Calendar from "./Pages/Calendar.js";
import Clients from "./Pages/Clients.js";

class Router extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
                    <Route
						path="/"
						exact
						component={LandingPage}
					></Route>
                    <Route
						path="/login"
						exact
						component={Login}
					></Route>
                    <Route 
                        path="/home"
                        exact
                        component={Home}
                    ></Route>
					<Route
						path="/admin"
						exact
						component={Admin}
					></Route>
                    <Route
						path="/admin/users"
						exact
						component={AdminManageUsers}
					></Route>
					<Route
						path="/admin/users/create"
						exact
						component={AdminAddUser}
					></Route>
					<Route
						path="/admin/users/edit"
						exact
						component={AdminEditUser}
					></Route>
					<Route
						path="/admin/tags"
						exact
						component={AdminManageTags}
					></Route>
					<Route
						path="/calendar"
						exact
						component={Calendar}
					></Route>
                    <Route
						path="/clients"
						exact
						component={Clients}
					></Route>
				</Switch>
			</BrowserRouter>
		);
	}
}

export default Router;