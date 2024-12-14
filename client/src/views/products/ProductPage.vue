<script setup>
import {ref, onMounted} from "vue";
import axios from "axios";
import {useRoute, useRouter} from "vue-router";
import AloAlo from "@/components/AloAlo.vue";
import CardsHeartOutline from "vue-material-design-icons/CardsHeartOutline.vue";
import ArrowLeftThinCircleOutline from "vue-material-design-icons/ArrowLeftThinCircleOutline.vue";

const product = ref(null);
const error = ref(false);
const message = ref("");
const route = useRoute();
const router = useRouter();

const fetchProduct = async () => {
  const productId = route.params.productId;

  if (!productId || isNaN(productId)) {
    console.error("ID de produit invalide");
    return;
  }

  try {
    const response = await axios.get(
        `http://localhost:3000/products/${productId}`
    );
    product.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error);
    product.value = null;
  }
};

const goBack = () => {
  router.push("/products");
};

const addToCart = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.id) {
      message.value = "Vous devez d'abord vous connecter pour ajouter des produits au panier.";
      return;
    }

    const response = await axios.post("http://localhost:3000/cart/add", {
      userId: user.id,
      productId: product.value.id,
      quantity: 1,
    });

    if (response.data.success) {
      message.value = "Produit ajouté au panier avec succès !";
    } else {
      message.value = `Erreur : ${response.data.message}`;
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier :", error);
    message.value = "Une erreur s'est produite. Veuillez réessayer.";
  }
};

onMounted(() => {
  fetchProduct();
});
</script>

<template>
  <div v-if="product" class="product-page mt-5">
    <div class="product-details container py-14">
      <button @click="goBack" class="back-button flex mb-5 hover:text-green-800 font-raleway">
        <ArrowLeftThinCircleOutline class="mr-2"/>
        Liste de produits
      </button>

      <div class="flex justify-between">
        <div class="product-images border-neutral-200">
          <img
              :src="`http://localhost:3000/uploads/${product.photos.split(',')[0]}`"
              alt="Image du produit"
              class="product-image object-cover"
          />
        </div>

        <div>
          <div class="name-cate py-6 mb-10">
            <h1 class="product-name font-playFair font-medium text-3xl italic">{{ product.name }}</h1>
            <div class="category text-sm text-gray-400 font-raleway">
              {{ product.category.name }}
            </div>
          </div>
          <span class="price font-black font-playFair text-4xl">Prix : {{ product.price }}€</span>

          <div class="flex mt-10 justify-between">
            <div class="flex">
              <button class="add-panier p-2 text-sm mr-5" @click="addToCart">
                Ajouter au panier
              </button>
              <CardsHeartOutline class="text-gray-800 mt-1"/>
            </div>
            <span class="stock font-raleway text-gray-600">
              <span>{{ product.stock }} en stock</span>
            </span>
          </div>
          <p v-if="message" class="text-green-600 mt-2">{{ message }}</p>
        </div>
      </div>

      <AloAlo/>
      <div class="product-info mt-10 w-4/4">
        <h3 class="font-raleway text-lg my-3">Description</h3>
        <p class="description font-raleway">{{ product.description }}</p>
      </div>
    </div>
  </div>

  <div v-else-if="error" class="error-message">
    <p>Produit non trouvé. Veuillez réessayer plus tard.</p>
  </div>
</template>

<style scoped>
.name-cate {
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.product-images {
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 40%;
}

.product-image {
  width: 100%;
  height: 350px;
}

.price {
  color: var(--primary-color);
}

.add-panier {
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: var(--tertiary-color);
  background-color: var(--secondary-color);
}

.product-info {
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}
</style>