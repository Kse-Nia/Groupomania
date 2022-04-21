export let initialAuth = {};
const hours = 4;
let savedAccount = localStorage.getItem("savedAt");

if (savedAccount && new Date().getTime() - saved > hours * 60 * 60 * 1000) {
  localStorage.clear();
  initialAuth = {
    isAuthenticated: false,
    isAdmin: false,
    token: null,
    user: null,
  };
} else if (JSON.parse(localStorage.getItem("isAuthenticated")) === true) {
  initialAuth = {
    token: JSON.parse(localStorage.getItem("token")),
    user: JSON.parse(localStorage.getItem("user")),
    firstName: JSON.parse(localStorage.getItem("firstName")),
    lastName: JSON.parse(localStorage.getItem("lastName")),
    email: JSON.parse(localStorage.getItem("email")),
    isAdmin: JSON.parse(localStorage.getItem("isAdmin")),
    isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")),
  };
} else {
  localStorage.clear();
  initialAuth = {
    isAuthenticated: false,
    isAdmin: false,
    user: null,
    token: null,
  };
}

export const AuthReducer = (authState, action) => {
  switch (action.type) {
    case "LOGIN":
      // Sauvegarde de la data
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem(
        "firstName",
        JSON.stringify(action.payload.firstName)
      );
      localStorage.setItem("lastName", JSON.stringify(action.payload.lastName));
      localStorage.setItem("email", JSON.stringify(action.payload.email));
      localStorage.setItem(
        "isAuthenticated",
        JSON.stringify(action.payload.isAuthenticated)
      );
      localStorage.setItem("isAdmin", JSON.stringify(action.payload.isAdmin));

      return {
        ...authState,
        user: action.payload.user,
        token: action.payload.token,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        isAuthenticated: action.payload.isAuthenticated,
        isAdmin: action.payload.isAdmin,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        isAuthenticated: false,
        isAdmin: false,
        user: null,
        token: null,
      };
    default:
      return authState;
  }
};
