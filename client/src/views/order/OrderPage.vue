<template>
  <div class="flex flex-col min-h-screen items-center justify-center bg-gray-50 py-10 font-poppins">
    <div class="w-full max-w-2xl bg-white shadow-xl rounded-lg p-8">
      <h1 class="text-3xl font-medium text-center mb-8">
        Passer une commande
      </h1>
      <form
          @submit.prevent="submitOrder"
          class="space-y-6 w-full"
      >
        <div>
          <input
              type="text"
              v-model="formData.userName"
              placeholder="Nom complet"
              class="w-full px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-black text-gray-700 placeholder-gray-500"
              required
          />
        </div>
        <div>
          <input
              type="text"
              v-model="formData.userAddress"
              placeholder="Adresse postale"
              class="w-full px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-black text-gray-700 placeholder-gray-500"
              required
          />
        </div>
        <h2 class="text-2xl font-medium mt-8 text-gray-800 text-center border-b-2 border-gray-200 pb-2">
          Résumé du panier
        </h2>
        <ul class="space-y-4 mt-4">
          <li
              v-for="item in cartItems"
              :key="item.id"
              class="flex justify-between items-center py-2 border-b border-gray-200"
          >
            <span class="text-gray-600">{{ item.name }} (x{{ parseInt(item.quantity) || 0 }})</span>
            <strong class="text-gray-900">{{ formatPrice((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0)) }}</strong>
          </li>
        </ul>
        <div class="flex justify-between text-lg font-medium mt-6">
          <span>Total :</span>
          <span class="text-green-600">{{ formatPrice(totalPrice) }}</span>
        </div>
        <div class="flex justify-center mt-6">
          <button
              type="submit"
              class="flex justify-center items-center gap-2 border-2 border-black text-black py-2 px-8 rounded-full hover:bg-black hover:text-white transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
              :disabled="!cartItems.length || isSubmitting"
          >
            {{ isSubmitting ? "Validation..." : "Valider la commande" }}
          </button>
        </div>
        <div class="text-center mt-6">
          <p class="text-sm text-gray-600">
            Retourner au panier ?
            <router-link
                to="/cart"
                class="text-blue-500 hover:text-blue-600 underline transition"
            >
              Voir mon panier
            </router-link>
          </p>
        </div>
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
    cartItems.value
        .reduce((acc, item) => {
          const price = parseFloat(item.price) || 0;
          const quantity = parseInt(item.quantity) || 0;
          return acc + price * quantity;
        }, 0)
        .toFixed(2)
);

const fetchCart = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`http://localhost:3000/cart/${userId}`);
    cartItems.value = response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des articles du panier :", error);
    alert("Impossible de charger les articles du panier.");
  } finally {
    loading.value = false;
  }
};

const submitOrder = async () => {
  if (!cartItems.value.length) {
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

const formatPrice = (price) => `${Number(price).toFixed(2)} €`;

onMounted(() => {
  fetchCart();
});
</script>