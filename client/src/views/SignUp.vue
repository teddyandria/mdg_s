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
  <div class="max-w-lg mx-auto p-4 container py-14">
    <h2 class="text-3xl font-semibold text-center mb-6">Créer un compte</h2>

    <div v-if="error" class="text-red-500 text-center mb-4">{{ error }}</div>
    <div v-if="successMessage" class="text-green-500 text-center mb-4">{{ successMessage }}</div>

    <form @submit.prevent="handleSignUp" class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
        <input
            type="text"
            id="username"
            v-model="username"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
        />
      </div>
      <div>
        <label for="firstname" class="block text-sm font-medium text-gray-700">Prénom</label>
        <input
            type="text"
            id="firstname"
            v-model="firstname"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
        />
      </div>

      <div>
        <label for="lastname" class="block text-sm font-medium text-gray-700">Nom</label>
        <input
            type="text"
            id="lastname"
            v-model="lastname"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
        <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
        />
      </div>

      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
        <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
        />
      </div>

      <div>
        <button
            type="submit"
            class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          S'inscrire
        </button>
      </div>

      <div class="text-center">
        <p class="text-sm">
          Vous avez déjà un compte ?
          <router-link to="/login" class="text-blue-500">Se connecter</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
</style>
