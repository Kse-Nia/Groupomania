export const isLogedIn = () => {
	if (localStorage.getItem('token')) return true
	return false
}