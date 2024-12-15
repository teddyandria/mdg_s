<script setup>
import ArrowRight from "vue-material-design-icons/ArrowRight.vue"
import ArrowRightThinCircleOutline from "vue-material-design-icons/ArrowRightThinCircleOutline.vue";
import ProductCard from "@/components/products/ProductCard.vue";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import textilesImage from "../assets/images/tissu.jpg";
import boisImage from "../assets/images/sculpturebois.jpg";
import accessoiresImage from "@/assets/images/bijoux.jpg";
import bienEtreImage from "@/assets/images/huile.jpg";

const categories = ref([]);
const router = useRouter();
const categoryImages = {
  "Textiles & Tissus": textilesImage,
  "Objets en bois": boisImage,
  "Accessoires": accessoiresImage,
  "Bien être": bienEtreImage,
};
const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:3000/products/categories");
    categories.value = response.data.map((category) => {
      return {
        ...category,
        imageUrl: categoryImages[category.name] || "",
      };
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
  }
};

const redirectToCategoryPage = (category) => {
  const encodedCategoryName = encodeURIComponent(category.name);
  router.push({
    path: `/products`,
    query: { categoryName: encodedCategoryName },
  });
};

onMounted(fetchCategories);

</script>

<template>
  <div class="container">
    <section
        class="header relative h-screen flex flex-col justify-center items-center text-center font-poppins bg-cover bg-center shadow-inner px-6"
    >
      <div class="absolute inset-0 bg-black bg-opacity-40"></div>

      <div class="relative flex flex-col justify-center items-center h-full text-mdgWhite">
        <h1
            class="text-xl sm:text-2xl md:text-3xl font-bold mb-6 tracking-wider text-tertiary"
            style="letter-spacing: 20px;"
        >
          MADAGASCAR AUTHENTIQUE
        </h1>
        <h3
            class="text-md sm:text-lg md:text-xl font-light tracking-widest mb-10 text-tertiary"
            style="letter-spacing: 2px;"
        >
          Plongez dans nos produits typiques
        </h3>
        <router-link
            to="/products"
            class="relative text-sm sm:text-md md:text-lg text-white flex items-center gap-2 border-2 border-white rounded-full px-4 sm:px-6 py-2 sm:py-3 hover:bg-white hover:text-black transition-all duration-300 w-fit"
        >
          <span class="font-raleway">Explorer les produits</span>
          <ArrowRight />
        </router-link>
      </div>
    </section>

    <section id="history-main" class="content">
      <div class="p-3">
        <div class="grid grid-cols-1 md:grid-cols-4 divide-x divide-gray-300">
          <div class="text-center flex flex-col justify-between h-full">
            <div class="text-start">
              <h3 class="text-lg font-medium text-gray-800 mb-4 text-uppercase">
                FAVORIS
              </h3>
              <p class="text-sm text-gray-500 pr-2">
                Explorez nos produits soigneusement sélectionnés pour répondre à toutes vos attentes. Profitez des meilleures offres ici !
              </p>
            </div>
            <router-link
                to="/products"
                class="font-semibold text-start underline"
            >
              Voir tous les produits
            </router-link>
          </div>
          <ProductCard :is-home="true" class="col-span-3 grid grid-cols-1 sm:grid-cols-3 w-full"/>
        </div>
      </div>
    </section>

    <div class="categories-section h-screen flex flex-col">
      <div class="grid grid-rows-2 sm:grid-rows-2 grid-cols-1 sm:grid-cols-3 w-full flex-grow">
        <div
            v-if="categories.length"
            @click="redirectToCategoryPage(categories[0])"
            :style="{
              backgroundImage: `url(${categories[0].imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              objectFit: 'cover',
            }"
            class="row-span-1 col-span-full sm:col-span-3 bg-gray-100 p-6 text-center cursor-pointer relative flex items-center justify-center h-48 sm:h-full"
        >
          <div class="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-50 transition duration-300 ease-in-out"></div>
          <h3
              class="text-2xl sm:text-4xl font-medium text-white relative z-10 uppercase"
          >
            {{ categories[0].name }}
          </h3>
          <div class="absolute bottom-4 flex items-center justify-center w-full">
            <ArrowRightThinCircleOutline size="54" class="text-mdgWhite" />
          </div>
        </div>

        <div
            v-for="(category, index) in categories.slice(1, 4)"
            :key="category.id"
            @click="redirectToCategoryPage(category)"
            :style="{
              backgroundImage: `url(${category.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              objectFit: 'cover'
            }"
            class="bg-gray-100 p-6 text-center cursor-pointer relative flex items-center justify-center h-36 sm:h-full"
        >
          <div class="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-50 transition duration-300 ease-in-out"></div>
          <h3
              class="text-xl sm:text-4xl font-medium text-white relative z-10 uppercase"
          >
            {{ category.name }}
          </h3>
          <div class="absolute bottom-4 flex items-center justify-center w-full">
            <ArrowRightThinCircleOutline size="44" class="text-mdgWhite" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.header{
  background-image: url('../assets/images/bg.jpg');
}

  .container{
    padding: 0;
  }

</style>