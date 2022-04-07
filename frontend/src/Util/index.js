export const isLoged = () => {
    if (localStorage.getItem('token')) return true
    return false
}