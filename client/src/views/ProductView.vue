<script setup>
import ProductCard from "@/components/products/ProductCard.vue";
import axios from "axios";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const categories = ref([]);
const selectedCategory = ref(null);
const products = ref([]);

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:3000/products/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
  }
};

const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`http://localhost:3000/products/category/${encodeURIComponent(category.name)}`);
    products.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    products.value = [];
  }
};

const selectCategory = async (category) => {
  selectedCategory.value = category.name;
  await fetchProductsByCategory(category);
};

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div class="container py-14 flex items-center flex-col">
    <div class="categories flex justify-evenly font-raleway text-sm mb-10 mt-5 w-3/5">
      <div
          v-for="(category, index) in categories"
          :key="index"
      >
        <button
            class="font-medium focus:underline"
            @click="selectCategory(category)"
        >
          {{ category.name }}
        </button>
      </div>
    </div>
    <div v-if="selectedCategory && !products.length">Aucun produit trouvé dans cette catégorie</div>
    <ProductCard
        :is-home="false"
        :category="selectedCategory"
    />
  </div>
</template>
