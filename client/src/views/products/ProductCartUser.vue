<template>
  <div class="container mx-auto my-24 bg-mdgBg min-h-screen rounded-lg shadow-lg">
    <h1 class="text-3xl font-medium mb-8 text-center text-mdgBlack">Mon Panier</h1>

    <div v-if="loading" class="text-gray-600 text-center text-lg animate-pulse">Chargement de votre panier...</div>

    <div v-else-if="!cartItems.length && !loading" class="text-center">
      <p class="text-gray-600 text-lg font-medium">Votre panier est vide.</p>
      <router-link
          to="/products"
          class="text-black border border-black hover:bg-black hover:text-white transition duration-300 mt-6 inline-block py-2 px-6 rounded-lg"
      >
        Voir les produits
      </router-link>
    </div>

    <div v-else>
      <div class="grid gap-4 sm:gap-6 lg:gap-8">
        <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex items-center justify-between bg-white rounded-lg shadow-md p-4"
        >
          <div class="flex items-center space-x-4">
            <img
                :src="`http://localhost:3000${item.photos}`"
                alt="Produit"
                class="w-24 h-24 object-cover rounded-md border border-gray-200"
            />

            <div>
              <h2 class="text-lg font-semibold text-gray-800">{{ item.name }}</h2>
              <span class="block mt-2 text-green-600 font-bold text-lg">{{ formatPrice(item.price) }}</span>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <div>
              <label for="quantity" class="text-sm text-gray-600">Quantité :</label>
              <input
                  id="quantity"
                  type="number"
                  :value="item.quantity"
                  @change="updateCart(item.id, $event.target.value)"
                  min="1"
                  class="ml-2 w-16 bg-gray-50 border border-gray-300 rounded-lg text-center p-1 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <button
                @click="removeFromCart(item.id)"
                class="border border-black text-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>

      <div class="mt-10 border-t border-gray-200 pt-6">
        <div class="flex justify-between items-center mb-6">
          <span class="text-2xl font-semibold text-gray-800">Total :</span>
          <span class="text-2xl font-bold text-green-600">{{ formatPrice(totalPrice) }}</span>
        </div>
        <router-link
            to="/order"
            class="block text-center py-3 px-6 text-black border border-black rounded-lg hover:bg-black hover:text-white transition duration-300"
        >
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
      const updatedItemIndex = cartItems.value.findIndex((item) => item.id === productId);
      if (updatedItemIndex !== -1) {
        cartItems.value[updatedItemIndex].quantity = parseInt(newQuantity);
      }
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la quantité du panier :", error);
  }
};

const removeFromCart = async (productId) => {
  try {
    const response = await axios.delete(`http://localhost:3000/cart/${userId}/product/${productId}`);
    if (response.status === 200) {
      cartItems.value = cartItems.value.filter((item) => item.id !== productId);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression d'un produit :", error);
  }
};

const formatPrice = (price) => {
  return `${price.toFixed(2)}€`;
};

onMounted(() => {
  fetchCart();
});
</script>

<style scoped>
.container {
  max-width: 900px;
}
</style>