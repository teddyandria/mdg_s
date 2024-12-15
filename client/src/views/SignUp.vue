<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const username = ref("");
const firstname = ref("");
const lastname = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const successMessage = ref("");
const router = useRouter();

const handleSignUp = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = "Les mots de passe ne correspondent pas.";
    return;
  }

  const userData = {
    username: username.value,
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    password: password.value,
  };

  try {
    const response = await axios.post("http://localhost:3000/signup", userData);
    successMessage.value = "Inscription réussie ! Vous pouvez maintenant vous connecter.";
    await router.push({
     path: "/login",
      query: {successMessage:" Votre compte à bien été créé."}
    });
  } catch (err) {
    error.value = "Erreur lors de l'inscription. Veuillez réessayer.";
  }
};
</script>

<template>
  <div class="flex h-screen font-poppins bg-mdgWhite">

    <div class="flex flex-col justify-center items-center w-full p-6 md:w-1/2 md:p-10">
      <h1 class="text-2xl md:text-4xl font-medium mb-6">Créer un compte</h1>

      <form
          @submit.prevent="handleSignUp"
          class="space-y-6 w-full max-w-sm"
      >
        <div v-if="error" class="text-red-500 text-center mb-2">{{ error }}</div>
        <div v-if="successMessage" class="text-green-500 text-center mb-2">{{ successMessage }}</div>

        <div>
          <input
              type="text"
              placeholder="Nom d'utilisateur"
              v-model="username"
              class="w-full px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-black"
              required
          />
        </div>

        <div>
          <input
              type="text"
              placeholder="Prénom"
              v-model="firstname"
              class="w-full px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-black"
              required
          />
        </div>

        <div>
          <input
              type="text"
              placeholder="Nom"
              v-model="lastname"
              class="w-full px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-black"
              required
          />
        </div>

        <div>
          <input
              type="email"
              placeholder="Email"
              v-model="email"
              class="w-full px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-black"
              required
          />
        </div>

        <div>
          <input
              type="password"
              placeholder="Mot de passe"
              v-model="password"
              class="w-full px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-black"
              required
          />
        </div>

        <div>
          <input
              type="password"
              placeholder="Confirmer le mot de passe"
              v-model="confirmPassword"
              class="w-full px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-black"
              required
          />
        </div>

        <div class="flex justify-center mt-6">
          <button
              type="submit"
              class="flex justify-center items-center gap-2 border-2 border-black text-mdgBlack py-2 px-6 rounded-full hover:bg-black hover:text-white transition duration-300"
          >
            S'inscrire
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </span>
          </button>
        </div>

        <div class="text-center mt-4">
          <p class="text-sm text-gray-600">
            Vous avez déjà un compte ?
            <router-link
                to="/login"
                class="text-blue-500 hover:text-blue-600 underline transition"
            >
              Se connecter
            </router-link>
          </p>
        </div>
      </form>
    </div>

    <div class="w-1/2 hidden md:block relative bg-cover bg-center">
      <div
          :style="{'background-image': `url(${require('../assets/images/madagascar-signup.jpg')})`}"
          class="absolute top-0 left-0 w-full h-full bg-cover bg-center"
      ></div>
      <div class="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
      <div class="relative z-10"></div>
    </div>
  </div>
</template>

<style scoped>
</style>
