
// getting a permissions array and required authorization and checking if the array contains the required auth
// if the first condition returning true the second one won't execute so incase of a sysadmin auth there is no need to send a second param
const lookForAuthorization = (permissions,requiredAuth) => {
    if (permissions) {
        return (permissions.includes("sys-admin") || permissions.includes(requiredAuth))
    }
        return false
}

module.exports = lookForAuthorization
