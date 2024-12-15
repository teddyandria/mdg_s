<template>
  <div class="confirmation-page flex flex-col items-center justify-center min-h-screen bg-mdgBg font-poppins">
    <div class="bg-white shadow-lg rounded-lg p-10 w-full max-w-3xl text-center">
      <h1 class="text-4xl font-extrabold text-green-600 mb-6">Merci pour votre commande ! 🎉</h1>
      <p class="text-gray-600 text-lg">
        Votre commande a été enregistrée avec succès.
      </p>
    </div>

    <div
        v-if="totalPrice > 0"
        class="bg-white shadow-lg rounded-lg p-8 mt-8 w-full max-w-md text-center"
    >
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Montant total</h2>
      <p class="text-3xl text-green-600 font-bold">{{ formatPrice(totalPrice) }}</p>
    </div>

    <router-link
        to="/products"
        class="mt-10 text-center text-white bg-green-600 hover:bg-green-700 transition duration-300 py-3 px-6 rounded-lg shadow-lg"
    >
      Retour à la boutique
    </router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.confirmation-page {
  font-family: "Poppins", sans-serif;
}
</style>