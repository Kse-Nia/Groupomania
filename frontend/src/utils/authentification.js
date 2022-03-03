export const initialAuthentification = {};


if (JSON.parse(localStorage.getItem("isAuthenticated")) === true) {
	initialAuthentification = {
		user: JSON.parse(localStorage.getItem("user")),
		token: JSON.parse(localStorage.getItem("token")),
		firstname: JSON.parse(localStorage.getItem("firstname")),
		lastname: JSON.parse(localStorage.getItem("lastname")),
		email: JSON.parse(localStorage.getItem("email")),
		isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")),
		isAdmin: JSON.parse(localStorage.getItem("isAdmin")),
	}
} else {
	localStorage.clear();
	initialAuthentification = {
		isAuthenticated: false,
		isAdmin: false,
		user: null,
		token: null,
	}
}

export const AuthReducer = (authState, action) => {

	switch (action.type) {
		case "LOGGEDIN":
			localStorage.setItem("token", JSON.stringify(action.payload.token))
			localStorage.setItem("user", JSON.stringify(action.payload.user))
			localStorage.setItem("firstname", JSON.stringify(action.payload.firstname))
			localStorage.setItem("lastname", JSON.stringify(action.payload.lastname))
			localStorage.setItem("email", JSON.stringify(action.payload.email))
			localStorage.setItem("isAuthenticated", JSON.stringify(action.payload.isAuthenticated))
			localStorage.setItem("isAdmin", JSON.stringify(action.payload.isAdmin))

			return {
				...authState,
				user: action.payload.user,
					token: action.payload.token,
					firstname: action.payload.firstname,
					lastname: action.payload.lastname,
					email: action.payload.email,
					isAuthenticated: action.payload.isAuthenticated,
					isAdmin: action.payload.isAdmin,
			}
			case "LOGGEDOUT":
				localStorage.clear()
				return {
					isAuthenticated: false,
						isAdmin: false,
						user: null,
						token: null,
				}
				default:
					return authState;
	}
}