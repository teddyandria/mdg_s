
function requireNoAuth(to, from, next) {
    if (localStorage.getItem("token")) {
        return next("/dashboard");
    }
    next();
}

export { requireNoAuth };