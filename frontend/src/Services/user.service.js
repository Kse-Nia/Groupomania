import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/";


//authHeader() fonction ajoute requet HTTP
const getPublicContent = () => {
    return axios.get(API_URL + "home");
};

// Page après connexion
const getUserBoard = () => {
    return axios.get(API_URL + "profile", {
        headers: authHeader()
    });
};

// Suppression User
const deleteUser = (UserId) => {
    return axios.delete(API_URL + `user/${userId}`, {
        headers: authHeader()
    })
}

// Update Profile user
const updateProfile = (UserId, data) => {
    return axios.put(API_URL + `user-update/${userId}`, data, {
        headers: authHeader()
    });
}
// Update User Avatar
const updateProfileImage = (userId, data) => {
    console.log(data);
    let headers = authHeader();
    headers['Content-Type'] = 'multipart/form-data';
    return axios.put(API_URL + `user-update/${userId}`, data, {
        headers
    });
}

// Get All Members
const getAllMembers = () => {
    return axios.get(API_URL + "users", {
        headers: authHeader()
    });
}


// Page Admin Groupomania
const getAdminBoard = () => {
    return axios.get(API_URL + "admin", {
        headers: authHeader()
    });
};


// Exportation
const userService = {
    getPublicContent,
    deleteUser,
    updateProfile,
    getUserBoard,
    getAllMembers,
    getAdminBoard,
};
export default userService