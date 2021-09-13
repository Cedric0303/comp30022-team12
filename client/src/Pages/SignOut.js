import Auth from "./Auth.js";

const SignOut = () => {
    Auth.signout();
    if (localStorage.hasOwnProperty("accessToken")) {
        localStorage.removeItem("accessToken");
    }
};

export default SignOut;
