import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import { postUser } from "../api.js";
import "./css/adminAddUser.css";
import showPwdImg from "./css/show-password.png";
import hidePwdImg from "./css/hide-password.png";


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

    const [isRevealPwd, setIsRevealPwd] = useState(false);

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
            alert("All fields must have a value!")
        }
    }

    return (
        <div>
            <Navbar />
            <h2 className="mainHeading">Admin Add User</h2>
            <form method="post" onSubmit={onSubmit} className="add-user-form">
                <div className="field">
                    <label className="add-user-label">First Name</label>
                    <input 
                        className="add-user-input"
                        required
                        type="text" 
                        //name="firstName" 
                        placeholder="First Name" 
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label className="add-user-label">Last Name</label>
                    <input 
                        className="add-user-input"
                        required 
                        type="text" 
                        //name="lastName" 
                        placeholder="Last Name" 
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label className="add-user-label">Username</label>
                    <input 
                        className="add-user-input"
                        required
                        type="text" 
                        //name="username" 
                        placeholder="Username" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="field" id="password-field">
                    <label className="add-user-label">Password</label>
                    <input 
                        className="add-user-input"
                        required
                        type={isRevealPwd ? "text" : "password"} 
                        //name="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <img 
                        style={{height: "40%", width:"auto", paddingLeft:"10px"}}
                        title={isRevealPwd ? "Hide Password" : "Show Password"}
                        src={isRevealPwd ? hidePwdImg : showPwdImg}
                        onClick={() => setIsRevealPwd(!isRevealPwd)}
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
