import axios from "axios";

const API_URL = "http://localhost:3000";

const authService = {
    async login(email, password) {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            const token = response.data.token;

            localStorage.setItem("token", token);

            return response.data;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || "Erreur lors de la connexion."
            );
        }
    },

    logout() {
        localStorage.removeItem("token");
    },

    isLoggedIn() {
        return !!localStorage.getItem("token");
    },
};

export default authService;