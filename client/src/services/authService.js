import axios from "axios";

const API_URL = "http://localhost:3000";

const authService = {
    async login(email, password) {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });

            const { token, user } = response?.data || {};

            if (token && user) {
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                throw new Error("Aucun utilisateur/token trouvé dans la réponse.");
            }

            return response.data;
        } catch (error) {
            console.error("Échec du login, démarrage du mode fictif...", error);
            return await this.fictitiousLogin();
        }
    },

    async fictitiousLogin() {
        try {
            const response = await axios.post(`${API_URL}/fictitious-login`);

            const { token, user } = response?.data || {};

            if (token && user) {
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                throw new Error("Impossible d'effectuer un login fictif.");
            }
            return response.data;
        } catch (error) {
            console.error("Erreur dans fictitiousLogin : ", error);
            throw new Error(
                error.response?.data?.message || "Echec du mode login fictif."
            );
        }
    },

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },

    isLoggedIn() {
        return !!localStorage.getItem("token");
    },
};

export default authService;