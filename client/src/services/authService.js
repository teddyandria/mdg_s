import axios from "axios";

const API_URL = "http://localhost:3000";

const authService = {
    // async fictitiousLogin() {
    //     try {
    //         const response = await axios.post(`${API_URL}/fictitious-login`);
    //
    //         const { token, user } = response?.data || {};
    //
    //         if (token && user) {
    //             localStorage.setItem("token", token);
    //             localStorage.setItem("user", JSON.stringify(user));
    //         } else {
    //             throw new Error("Impossible d'effectuer un login fictif.");
    //         }
    //         return response.data;
    //     } catch (error) {
    //         console.error("Erreur dans fictitiousLogin : ", error);
    //         throw new Error(
    //             error.response?.data?.message || "Echec du mode login fictif."
    //         );
    //     }
    // },

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },

    isLoggedIn() {
        return !!localStorage.getItem("token");
    },
};

export default authService;