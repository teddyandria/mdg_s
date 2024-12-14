<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Mon Panier</h1>

    <div v-if="loading" class="text-gray-700 text-center">Chargement de votre panier...</div>

    <div v-else-if="!cartItems.length && !loading" class="text-center">
      <p class="text-gray-600 text-lg">Votre panier est vide.</p>
      <router-link to="/products" class="text-green-500 hover:underline mt-4 inline-block">
        Voir les produits
      </router-link>
    </div>

    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="flex items-center border-b border-gray-300 pb-4 mb-4">
        <img
            :src="`http://localhost:3000/uploads/${item.photos.split(',')[0]}`"
            alt="Produit"
            class="w-24 h-24 object-cover mr-4"
        />

        <div class="flex-1">
          <h2 class="text-lg font-semibold">{{ item.name }}</h2>
          <span class="block mt-2 text-green-600 font-bold">{{ item.price }}€</span>

          <div class="mt-4">
            <label for="quantity" class="text-sm text-gray-600">Quantité :</label>
            <input
                id="quantity"
                type="number"
                :value="item.quantity"
                @change="updateCart(item.id, $event.target.value)"
                min="1"
                class="ml-2 w-16 bg-gray-50 border border-gray-300 rounded text-center p-1"
            />
          </div>
        </div>

        <button
            @click="removeFromCart(item.id)"
            class="text-red-500 hover:underline px-4"
        >
          Supprimer
        </button>
      </div>

      <div class="flex justify-end items-center mt-8">
        <span class="text-xl font-semibold">Total : <span class="text-green-600">{{ totalPrice }}€</span></span>
        <router-link
            to="/order"
            class="w-full py-2 px-4 text-center text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300">
          Passer à la commande
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const userId = 1;

const cartItems = ref([]);
const loading = ref(true);

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
});

const fetchCart = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`http://localhost:3000/cart/${userId}`);
    cartItems.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des articles du panier :", error);
  } finally {
    loading.value = false;
  }
};

const updateCart = async (productId, newQuantity) => {
  if (newQuantity < 1) {
    alert("Quantité invalide !");
    return;
  }
  try {
    const response = await axios.put(`http://localhost:3000/cart/update`, {
      userId,
      productId,
      quantity: parseInt(newQuantity),
    });
    if (response.status === 200) {
      await fetchCart();
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la quantité du panier :", error);
  }
};

const removeFromCart = async (productId) => {
  try {
    const response = await axios.delete(`http://localhost:3000/cart/${userId}/product/${productId}`);
    if (response.status === 200) {
      await fetchCart(); // Recharge le panier pour refléter les changements
    }
  } catch (error) {
    console.error("Erreur lors de la suppression d'un produit :", error);
  }
};

onMounted(() => {
  fetchCart();
});
</script>

<style scoped>
</style>