<template>
  <div class="already-connected">
    <h1>Vous êtes déjà connecté !</h1>
    <p>Vous allez être redirigé vers votre tableau de bord...</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();


onMounted(() => {
  setTimeout(() => {
    router.push("/dashboard");
  }, 3000);
});
</script>

<style scoped>
.already-connected {
  text-align: center;
  margin-top: 20px;
}
</style>
