<template>
  <div class="flex h-screen font-poppins">

    <div class="flex flex-col justify-center items-center w-1/2 p-10 bg-mdgWhite">
      <h1 class="text-4xl font-regular mb-6">Connexion</h1>

      <form
          @submit.prevent="handleLogin"
          class="space-y-6 w-full max-w-md">

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

        <p v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</p>

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

    <div class="w-1/2 hidden lg:block relative bg-cover bg-center">

      <div
          :style="{'background-image': `url(${require('../assets/images/madagascar-signup.jpg')})`}"
          class="absolute top-0 left-0 w-full h-full bg-cover bg-center"
      ></div>


      <div class="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>

      <div class="relative z-10">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import authService from "../services/authService";

const email = ref("");
const password = ref("");
const error = ref("");

const router = useRouter();

async function handleLogin() {
  error.value = "";
  try {
    const response = await authService.login(email.value, password.value);
    console.log("Connexion réussie :", response);
    localStorage.setItem("token", response.token);

    await router.push("/dashboard");
  } catch (err) {
    error.value = err.message;
  }
}
</script>