import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import { postUser } from "../api.js";


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
            <h2>Admin Add User</h2>
            <form method="post" onSubmit={onSubmit} className="add-user-form">
                <div className="field">
                    <label>First Name</label>
                    <input 
                        required
                        type="text" 
                        //name="firstName" 
                        placeholder="First Name" 
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label>Last Name</label>
                    <input
                        required 
                        type="text" 
                        //name="lastName" 
                        placeholder="Last Name" 
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label>Username</label>
                    <input 
                        required
                        type="text" 
                        //name="username" 
                        placeholder="Username" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input 
                        required
                        type="password" 
                        //name="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={onSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AdminAddUser;
