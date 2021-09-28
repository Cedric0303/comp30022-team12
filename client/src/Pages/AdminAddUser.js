import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import { postUser } from "../api.js";
import "./css/adminAddUser.css";


function validate_password(p) {
    var letter = /[a-zA-Z]/;
    var number = /[0-9]/;
    var minLength = 8;
    var maxLength = 20;
    return letter.test(p) && number.test(p) && p >= minLength && p <= maxLength;
}

function AdminAddUser(props) {

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [isAdmin, setIsAdmin] = useState(false)
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    function notEmpty() {
        if (firstName === "" || lastName === "" || username === "" || password === "") {
            return false;
        }
        return true;
    }

    const onSubmit = (e) => {
        e.preventDefault(); //prevent reload

        if (notEmpty()) {
            const registerBody = {
                username: username,
                password: password,
                isAdmin: isAdmin,
                firstName: firstName,
                lastName: lastName,
            };

            if (true) { //validate password
                postUser(registerBody);
            }
        } 
        else {
            alert("Please ensure all fields are not empty.")
        }
    }

    return (
        <div>
            <Navbar />
            <h2 className="mainHeading">Admin Add User</h2>
            <form method="post" onSubmit={onSubmit}>
                <div className="field">
                    <label className="form-label">First Name</label>
                    <input 
                        className="form-input"
                        required
                        type="text" 
                        //name="firstName" 
                        placeholder="First Name" 
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label className="form-label">Last Name</label>
                    <input 
                        className="form-input"
                        required 
                        type="text" 
                        //name="lastName" 
                        placeholder="Last Name" 
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label className="form-label">Username</label>
                    <input 
                        className="form-input"
                        required
                        type="text" 
                        //name="username" 
                        placeholder="Username" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label className="form-label">Password</label>
                    <input 
                        className="form-input"
                        required
                        type="password" 
                        //name="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                
            </form>
            <button className="form-button" onClick={onSubmit}>
                Create User
            </button>
        </div>
    );
}

export default AdminAddUser;
