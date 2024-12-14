<template>
  <div class="login container py-14">
    <h1>Connexion</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
        />
      </div>
      <div>
        <input
            v-model="password"
            type="password"
            placeholder="Mot de passe"
            required
        />
      </div>
      <div>
        <button type="submit">Se connecter</button>
      </div>
    </form>

    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import mockAuthService from "@/services/mockAuthService";

const email = ref("");
const password = ref("");
const error = ref("");

const router = useRouter();

async function handleLogin() {
  error.value = "";
  try {
    const response = await mockAuthService.login(email.value, password.value);

    console.log("Connexion réussie :", response);

    localStorage.setItem("token", response.token);

    await router.push("/products");
  } catch (err) {
    error.value = err.message;
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
