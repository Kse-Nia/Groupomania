import {
    dataUrl
} from "./dataUrl";

export let initialAuth = {};

// Expire session
const nbrHours = 3;
let savedAt = localStorage.getItem('savedAt')

if (savedAt && (new Date().getTime() - savedAt > nbrHours * 60 * 60 * 1000)) {
    localStorage.clear()
    initialAuth = {
        token: null,
        user: null,
        isAdmin: false,
        isAuthenticated: false,
    }
} else if (JSON.parse(localStorage.getItem("isAuthenticated")) === true) {
    // Recup données du Back puis conversion en objet JS
    initialAuth = {
        user: JSON.parse(localStorage.getItem("user")),
        token: JSON.parse(localStorage.getItem("token")),
        //UserId: JSON.parse(localStorage.getItem("UserId")),
        firstName: JSON.parse(localStorage.getItem("firstName")),
        lastName: JSON.parse(localStorage.getItem("lastName")),
        email: JSON.parse(localStorage.getItem("email")),
        imageUrl: JSON.parse(localStorage.getItem("imageUrl")),
        isAdmin: JSON.parse(localStorage.getItem("isAdmin")),
        isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")),
    }
} else {
    // Initial state
    localStorage.clear()
    initialAuth = {
        token: null,
        user: null,
        isAdmin: false,
        isAuthenticated: false,
    }
}

export const AuthReducer = (authState, action) => {
    switch (action.type) {
        case "Login":
            // Sauvegarde Data dans LS
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            //localStorage.setItem("UserId", JSON.stringify(action.payload.UserId));
            localStorage.setItem("firstName", JSON.stringify(action.payload.firstName));
            localStorage.setItem("lastName", JSON.stringify(action.payload.lastName));
            localStorage.setItem("email", JSON.stringify(action.payload.email));
            localStorage.setItem("isAdmin", JSON.stringify(action.payload.isAdmin));
            localStorage.setItem("isAuthenticated", JSON.stringify(action.payload.isAuthenticated));
            localStorage.setItem('savedAt', new Date().getTime());

            // Avatar
            dataUrl(action.payload.imageUrl).then((dataUrl) => {
                localStorage.setItem("imageUrl", JSON.stringify(dataUrl))
            })

            return {
                ...authState,
                user: action.payload.UserId,
                    token: action.payload.token,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    email: action.payload.email,
                    imageUrl: action.payload.imageUrl,
                    isAdmin: action.payload.isAdmin,
                    isAuthenticated: action.payload.isAuthenticated,
            }
            case "LogOut":
                localStorage.clear();
                return {
                    isAuthenticated: false,
                        isAdmin: false,
                        //UserId: null,
                        user: null,
                        token: null,
                }
                default:
                    return authState
    }
}