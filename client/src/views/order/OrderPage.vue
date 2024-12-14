<template>
  <div class="order-page">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Passer une commande</h1>

    <div v-if="loading" class="text-center text-gray-500">Chargement des informations de votre panier...</div>
    <div v-else-if="!cartItems.length && !loading">
      <p class="text-red-500 font-medium">Votre panier est vide. Veuillez retourner au panier pour ajouter des articles.</p>
      <router-link
          to="/cart"
          class="mt-4 inline-block text-blue-500 font-medium hover:underline"
      >Retour au Panier</router-link>
    </div>

    <div v-else>
      <form @submit.prevent="submitOrder" class="order-form">
        <div class="form-group mb-4">
          <label for="userName" class="block text-gray-700 font-medium">Nom complet</label>
          <input
              v-model="formData.userName"
              type="text"
              id="userName"
              class="form-control border border-gray-300 px-3 py-2 rounded w-full"
              placeholder="Saisissez votre nom complet"
              required
          />
        </div>

        <div class="form-group mb-4">
          <label for="userAddress" class="block text-gray-700 font-medium">Adresse postale</label>
          <input
              v-model="formData.userAddress"
              type="text"
              id="userAddress"
              class="form-control border border-gray-300 px-3 py-2 rounded w-full"
              placeholder="Saisissez votre adresse"
              required
          />
        </div>

        <h2 class="text-xl font-semibold text-gray-800 mb-4">Résumé du panier</h2>
        <ul class="cart-list bg-white shadow rounded-md p-4">
          <li v-for="item in cartItems" :key="item.id">
            <span>{{ item.name }} (x{{ parseInt(item.quantity) || 0 }})</span>
            <strong>{{ formatPrice((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0)) }}</strong>
          </li>
          <li class="font-bold border-t border-gray-300 py-4 flex justify-between">
            <span>Total :</span>
            <span>{{ formatPrice(totalPrice) }}</span>
          </li>
        </ul>

        <button
            type="submit"
            class="w-full btn-primary bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
            :disabled="!cartItems.length || isSubmitting"
        >
          {{ isSubmitting ? "Validation en cours..." : "Valider la commande" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const userId = 1;
const formData = reactive({
  userName: "",
  userAddress: "",
});

const cartItems = ref([]);
const isSubmitting = ref(false);
const loading = ref(true);

const totalPrice = computed(() =>
    cartItems.value.reduce((acc, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return acc + price * quantity;
    }, 0).toFixed(2)
);

const fetchCart = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`http://localhost:3000/cart/${userId}`);
    cartItems.value = response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des articles du panier :", error);
    alert("Impossible de charger les articles du panier. Retournez au panier pour vérifier.");
  } finally {
    loading.value = false;
  }
};

const submitOrder = async () => {
  if (cartItems.value.length === 0) {
    alert("Votre panier est vide. Veuillez ajouter des articles avant de valider votre commande.");
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await axios.post("http://localhost:3000/order/validate", {
      userId,
      userName: formData.userName,
      userAddress: formData.userAddress,
    });

    if (response.status === 201) {
      alert("Commande validée avec succès !");
      cartItems.value = [];
      await router.push("/confirmation");
    }
  } catch (error) {
    console.error("Erreur de validation :", error);
    alert("Une erreur est survenue lors de la validation de votre commande.");
  } finally {
    isSubmitting.value = false;
  }
};

// Formatage des prix
const formatPrice = (price) => `${Number(price).toFixed(2)} €`;

onMounted(() => {
  fetchCart();
});
</script>

<style scoped>
.order-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.order-form .form-group {
  margin-bottom: 1rem;
}

.cart-list {
  margin-bottom: 1rem;
}

.btn-primary {
  transition: background-color 0.3s ease;
}
</style>