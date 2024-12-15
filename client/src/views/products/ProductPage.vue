<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import AloAlo from "@/components/AloAlo.vue";
import CardsHeartOutline from "vue-material-design-icons/CardsHeartOutline.vue";
import ArrowLeftThinCircleOutline from "vue-material-design-icons/ArrowLeftThinCircleOutline.vue";

// Importation des images utilisées pour les catégories
import textilesImage from "@/assets/images/tissu.jpg";
import boisImage from "@/assets/images/sculpturebois.jpg";
import accessoiresImage from "@/assets/images/bijoux.jpg";
import bienEtreImage from "@/assets/images/huile.jpg";

const product = ref(null);
const error = ref(false);
const message = ref("");
const route = useRoute();
const router = useRouter();

const categoryImages = {
  "Textiles & Tissus": textilesImage,
  "Objets en bois": boisImage,
  "Accessoires": accessoiresImage,
  "Bien être": bienEtreImage,
};

const fetchProduct = async () => {
  const productId = route.params.productId;

  if (isNaN(productId) || !productId) {
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

    let user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.id) {
      console.warn("Aucun utilisateur valide trouvé. Utilisation d'un utilisateur fictif.");

      user = {
        id: 1,
        name: "Utilisateur Fictif",
        email: "fictif@utilisateur.com",
      };
    }

    console.log("Utilisateur utilisé :", user);

    if (!product.value || !product.value.id) {
      message.value = "Produit non valide ou non chargé. Veuillez réessayer plus tard.";
      return;
    }

    const response = await axios.post("http://localhost:3000/cart/add", {
      userId: user.id,
      productId: product.value.id,
      quantity: 1,
    });
    const data = response.data;

    if (data && data.success) {
      message.value = "Produit ajouté au panier avec succès.";
    } else {

      message.value = `Erreur : ${data.message || "Impossible d'ajouter le produit."}`;
    }
  } catch (error) {
    console.error("Erreur réseau ou backend :", error.response?.data || error);
    message.value = "Une erreur s'est produite lors de l'ajout au panier. Veuillez réessayer.";
  }
};

const currentUser = ref(null);

const fetchUser = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.id) {
    currentUser.value = user;
    console.log("Utilisateur connecté :", currentUser.value);
  } else {
    console.warn("Aucun utilisateur connecté trouvé.");
    currentUser.value = { id: 1, name: "Utilisateur Fictif" }; fallback
  }
};

onMounted(() => {
  fetchUser();
  fetchProduct();
});
</script>

<template>
  <div v-if="product" class="product-page font-poppins">
    <section
        class="relative h-[60vh] w-full flex items-center justify-center text-center bg-cover bg-center shadow-inner"
        :style="{
          backgroundImage: product.category && categoryImages[product.category.name]
            ? `url(${categoryImages[product.category.name]})`
            : 'url(default-category-image.jpg)',
        }"
    >
      <div class="absolute inset-0 bg-black bg-opacity-40"></div>
      <div class="relative z-10 text-white">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide mb-4 uppercase text-tertiary">
          {{ product.name || 'Détails du Produit' }}
        </h1>
        <p class="text-md sm:text-lg md:text-xl font-light tracking-wide">
          Découvrez en profondeur nos produits typiques
        </p>
      </div>
    </section>

    <section class="py-10 container mx-auto px-6 lg:px-12">
      <button
          @click="goBack"
          class="flex items-center mb-6 text-gray-700 hover:text-green-700 transition duration-300 font-semibold"
      >
        <ArrowLeftThinCircleOutline class="mr-2 text-lg" />
        Retour à la liste des produits
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 justify-between">
        <div
            v-if="product.photos"
            class="relative rounded-xl overflow-hidden shadow-lg border border-gray-300"
        >
          <img
              :src="`http://localhost:3000${product.photos}`"
              alt="Image du produit"
              class="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div class="flex flex-col justify-between space-y-4 lg:space-y-8">
          <div>
            <h2 class="text-gray-800 text-3xl font-bold tracking-wide">
              {{ product.name }}
            </h2>
            <p class="uppercase text-sm text-gray-500 tracking-wide">
              Catégorie : {{ product.category.name }}
            </p>
          </div>
          <span class="text-4xl font-extrabold text-green-600">
            {{ product.price }} €
          </span>
          <div>
            <button
                @click="addToCart"
                class="w-full md:w-auto px-8 py-3 bg-green-600 text-white text-sm uppercase rounded-full hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition duration-300"
            >
              Ajouter au panier
            </button>
            <div class="mt-2 flex items-center gap-2 text-green-600 cursor-pointer hover:text-green-800 transition">
              <CardsHeartOutline class="text-xl" />
              <span>Ajouter à vos favoris</span>
            </div>
          </div>

          <div class="text-gray-600 uppercase">
            Stock disponible : <strong>{{ product.stock }}</strong>
          </div>
        </div>
      </div>

      <div class="mt-10 bg-mdgWhite rounded-lg shadow px-8 py-6">
        <h3 class="text-lg font-semibold mb-4 text-gray-800">Description</h3>
        <p class="text-gray-600 leading-relaxed tracking-wide">
          {{ product.description }}
        </p>
      </div>

      <div v-if="message" class="mt-6 px-6 py-4 bg-green-100 border-l-4 border-green-600 rounded text-green-700">
        ✓ {{ message }}
      </div>
    </section>
  </div>

  <div v-else class="text-center py-14">
    <p class="text-lg text-red-600 font-medium">
      Produit non disponible ou en cours de chargement.
    </p>
  </div>
</template>

<style scoped>
</style>