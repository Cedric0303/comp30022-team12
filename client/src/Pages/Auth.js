const Auth = {
    username: null,
    isAuthenticated: false,
    isAdmin: false,

    authenticate({ username, isAdmin }) {
        this.username = username;
        this.isAuthenticated = true;
        this.isAdmin = isAdmin;
    },
    signout() {
        this.username = null;
        this.isAuthenticated = false;
        this.isAdmin = false;
    },
    getAuth() {
        return this.isAuthenticated;
    },
    getUsername() {
        return this.username;
    },
    getIsAdmin() {
        return this.isAdmin;
    },
};

export default Auth;
