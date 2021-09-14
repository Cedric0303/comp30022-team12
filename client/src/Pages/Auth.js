import jwt from "jwt-decode";

const Auth = {
    username: null,
    isAuthenticated: false,
    isAdmin: false,

    authenticate() {
        if (localStorage.hasOwnProperty("accessToken")) {
            let token = jwt(localStorage.getItem("accessToken"));
            this.username = token.user.username;
            this.isAuthenticated = true;
            this.isAdmin = token.user.isAdmin;
        } else {
            this.isAuthenticated = false;
        }
    },
    signout() {
        this.authenticate();
        this.username = null;
        this.isAuthenticated = false;
        this.isAdmin = false;
    },
    getAuth() {
        this.authenticate();
        return this.isAuthenticated;
    },
    getUsername() {
        this.getAuth();
        return this.username;
    },
    getIsAdmin() {
        this.getAuth();
        return this.isAdmin;
    },
};

export default Auth;
