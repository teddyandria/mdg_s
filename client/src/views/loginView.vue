<template>
  <div class="flex h-screen font-poppins bg-mdgWhite">

    <!-- Section du formulaire -->
    <div class="flex flex-col justify-center items-center w-full p-6 md:w-1/2 md:p-10">
      <h1 class="text-2xl md:text-4xl font-medium mb-6">Connexion</h1>

      <form
          @submit.prevent="handleLogin"
          class="space-y-6 w-full max-w-sm"
      >
        <div>
          <input
              v-model="email"
              type="email"
              placeholder="Email"
              required
              class="w-full px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <input
              v-model="password"
              type="password"
              placeholder="Mot de passe"
              required
              class="w-full px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-black"
          />
        </div>

        <div class="flex justify-center mt-6">
          <button
              type="submit"
              class="flex justify-center items-center gap-2 border-2 border-black text-mdgBlack py-2 px-6 rounded-full hover:bg-black hover:text-white transition duration-300"
          >
            Se connecter
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </span>
          </button>
        </div>

        <p v-if="error" class="text-red-500 text-sm mt-4 text-center">{{ error }}</p>

        <div class="text-center mt-4">
          <p class="text-sm">
            Vous n'avez pas de compte ?
            <router-link
                to="/signup"
                class="text-blue-500 underline hover:text-blue-600 transition"
            >
              S'inscrire ici
            </router-link>
          </p>
        </div>
      </form>
    </div>

    <!-- Section de l'image (désactivée sur mobile) -->
    <div class="hidden md:block w-1/2 relative bg-cover bg-center">
      <div
          :style="{ 'background-image': `url(${require('../assets/images/madagascar-signup.jpg')})` }"
          class="absolute top-0 left-0 w-full h-full bg-cover bg-center"
      ></div>
      <div class="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
      <div class="relative z-10"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import authService from "../services/authService";

// Références réactives pour email, password et erreurs
const email = ref("");
const password = ref("");
const error = ref("");

// Router Vue
const router = useRouter();

// Connexion avec gestion des erreurs et fallback
async function handleLogin() {
  error.value = ""; // Réinitialiser le message d'erreur

  // Vérifications de base avant de tenter la connexion
  if (!email.value || !password.value) {
    error.value = "Veuillez saisir vos identifiants.";
    return;
  }

  try {
    // Appel principal à l'authentification
    const response = await authService.login(email.value, password.value);
    console.log("Connexion réussie :", response);

    // Sauvegarder le token et les données utilisateur dans localStorage
    if (response.token) {
      localStorage.setItem("token", response.token);
    }

    if (response.user) {
      localStorage.setItem("user", JSON.stringify(response.user));
      console.log("Utilisateur sauvegardé :", response.user);
    }

    // Redirection après connexion
    await router.push("/dashboard");
  } catch (err) {
    console.warn("Échec de la connexion :", err.message);

    try {
      // Fallback en cas de panne de l'authentification normale
      error.value = "Connexion échouée. Tentative avec un utilisateur fictif...";
      const fallbackResponse = await authService.fictitiousLogin();
      console.log("Utilisateur fictif connecté :", fallbackResponse);

      // Sauvegarder les informations fictives
      if (fallbackResponse.token) {
        localStorage.setItem("token", fallbackResponse.token);
      }

      if (fallbackResponse.user) {
        localStorage.setItem("user", JSON.stringify(fallbackResponse.user));
        console.log("Utilisateur fictif sauvegardé :", fallbackResponse.user);
      }

      // Redirection
      await router.push("/dashboard");
    } catch (fallbackError) {
      // Erreur également en mode fictif
      console.error("Échec de la connexion avec l'utilisateur fictif :", fallbackError.message);
      error.value = "Impossible de se connecter, même avec un utilisateur fictif.";
    }
  }
}
</script>