import axios from "axios";
const API_URL = "http://localhost:8080/home/";

const register = (firstName, lastName, email, password, controlPassword) => {
    return axios.post(API_URL + "register", {
        firstName,
        lastName,
        email,
        password,
        controlPassword,
    });
};
const login = (email, password) => {
    return axios
        .post(API_URL + "login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("token", JSON.stringify(response.data));
                localStorage.setItem("user", JSON.stringify(response.data));
                localStorage.setItem("UserId", JSON.stringify(response.data));
                localStorage.setItem("firstName", JSON.stringify(response.data));
                localStorage.setItem("LastName", JSON.stringify(response.data));
                localStorage.setItem("email", JSON.stringify(response.data));
                localStorage.setItem("imageUrl", JSON.stringify(response.data));
                localStorage.setItem("isAdmin", JSON.stringify(response.data));
                localStorage.setItem("isAuthenticated", JSON.stringify(response.data));
            }
            return response.data;
        });
};
const logout = () => {
    localStorage.removeItem("user");
};
const authService = {
    register,
    login,
    logout,
};
export default authService;