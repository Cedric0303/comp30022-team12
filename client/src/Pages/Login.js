import React from "react";

function Login(props) {
    return (
        <div>
            <h2>Login</h2>
            
            <form>
                <p>Username: <input
                    type="text"
                />
                </p> 
            </form>
            <form>
                <p>Password: <input
                    type="text"
                />
                </p> 
            </form>
            <button>Login</button>

        </div>
    );
}

export default Login;
