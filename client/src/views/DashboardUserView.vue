<template>
  <div class="min-h-screen bg-gray-50 flex flex-col py-24 font-poppins">
    <header class="bg-white shadow-md p-6">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <h1 class="text-3xl font-semibold text-gray-800">Tableau de Bord</h1>
        <span class="text-lg text-gray-600">Bonjour, {{ username }} !</span>
        <button
            @click="logout"
            class="text-white bg-red-500 hover:bg-red-600 transition duration-300 py-2 px-4 rounded-lg"
        >
          Se déconnecter
        </button>
      </div>
    </header>

    <main class="flex-1 py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
          <h2 class="text-2xl font-bold text-gray-800">
            Bienvenue, {{ username }} !
          </h2>
          <p class="text-lg text-gray-600">
            Gérez vos activités et vos préférences ici.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link
              to="/"
              class="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:translate-y-[-5px] transition-transform duration-300 cursor-pointer group"
          >
            <div class="flex items-center justify-center bg-blue-100 rounded-lg h-16 w-16">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-8 w-8 text-blue-600 group-hover:text-blue-800"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 10.5L12 3l9 7.5M21 21H3v-8.25M3 21v-7.5m18 7.5v-7.5M7.5 21h9"
                />
              </svg>
            </div>
            <h3 class="text-xl font-medium text-gray-800 mt-4 group-hover:text-blue-800">
              Retour à l'accueil
            </h3>
            <p class="text-gray-600 text-sm">
              Accédez à la page principale de l’application.
            </p>
          </router-link>

          <router-link
              to="/products"
              class="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:translate-y-[-5px] transition-transform duration-300 cursor-pointer group"
          >
            <div class="flex items-center justify-center bg-green-100 rounded-lg h-16 w-16">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-8 w-8 text-green-600 group-hover:text-green-800"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 3h18M3 7.5h18m-6 3v10m-6-10v10m-6-4v-6"
                />
              </svg>
            </div>
            <h3 class="text-xl font-medium text-gray-800 mt-4 group-hover:text-green-800">
              Voir les produits
            </h3>
            <p class="text-gray-600 text-sm">
              Consultez les produits disponibles dans notre boutique.
            </p>
          </router-link>

          <router-link
              to="/cart"
              class="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:translate-y-[-5px] transition-transform duration-300 cursor-pointer group"
          >
            <div class="flex items-center justify-center bg-yellow-100 rounded-lg h-16 w-16">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-8 w-8 text-yellow-600 group-hover:text-yellow-800"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 4.5H21V9M9 15h6m-6 0v4.5h6V15m4.5-8.25V21H4.5V6.75m1.5 8.25h12"
                />
              </svg>
            </div>
            <h3 class="text-xl font-medium text-gray-800 mt-4 group-hover:text-yellow-800">
              Voir mon panier
            </h3>
            <p class="text-gray-600 text-sm">
              Consultez et gérez les produits présents dans votre panier.
            </p>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const API_URL = "http://localhost:3000";
const token = localStorage.getItem("token");
const username = ref("Utilisateur");

const router = useRouter();

const fetchUserData = async () => {
  try {
    if (!token) {
      router.push("/login");
      return;
    }

    // Requête vers la route "/profile" pour récupérer les données utilisateur
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    username.value = response.data.username; // Mise à jour du nom d'utilisateur avec la réponse
  } catch (error) {
    console.error("Erreur lors de la récupération du profil :", error);
    logout();
  }
};

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};

onMounted(() => {
  fetchUserData();
});
</script>