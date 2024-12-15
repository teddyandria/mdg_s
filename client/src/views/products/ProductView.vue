<script setup>
import ProductCard from "@/components/products/ProductCard.vue";
import axios from "axios";
import {onMounted, ref} from "vue";

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
  <div class="container py-24 flex items-center flex-col font-poppins">
    <div class="categories flex justify-center text-sm mb-10 mt-5 w-3/5 items-center">
      <div
          v-for="(category, index) in categories"
          :key="category.id"
          class="flex items-center"
      >
        <button
            class="font-regular focus:underline hover:opacity-70 transition px-4"
            @click="selectCategory(category)"
        >
          {{ category.name }}
        </button>
        <div
            v-if="index < categories.length - 1"
            class="h-5 w-[1px] bg-gray-900"
            style="align-self: center;"
        ></div>
      </div>
    </div>
    <div v-if="selectedCategory && !products.length">Aucun produit trouvé dans cette catégorie</div>
    <ProductCard
        :is-home="false"
        :category="selectedCategory"
        :products="products"
        class="gap-5"
    />
  </div>
</template>
