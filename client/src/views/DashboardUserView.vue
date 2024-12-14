<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Bienvenue sur votre tableau de bord, {{ username }} !</h1>

    <p class="text-lg text-gray-600 mb-8">Que souhaitez-vous faire aujourd'hui ?</p>

    <div class="space-y-4">
      <router-link
          to="/"
          class="block w-48 py-2 px-4 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Retour à l'accueil
      </router-link>

      <router-link
          to="/products"
          class="block w-48 py-2 px-4 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Voir les produits
      </router-link>

      <button
          @click="logout"
          class="w-48 py-2 px-4 text-center text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
      >
        Se déconnecter
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const token = localStorage.getItem("token");
const username = ref(localStorage.getItem("username") || "Utilisateur");
const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  router.push("/login")};
</script>
