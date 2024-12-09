<script setup>
import ProductCard from "@/components/products/ProductCard.vue";
import axios from "axios";
import {onMounted, ref} from "vue";
import {Card} from "@/components/ui/card";
import {findLastIndex} from "core-js/internals/array-iteration-from-last";

const categories = ref(null);

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:3000/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div class="container py-14 flex items-center flex-col">
    <div class="categories flex justify-between">
      <div v-for="(category, index) in categories"
           :key="index"><div>{{category.name}}</div>
    </div>
    </div>
    <ProductCard/>
  </div>
</template>

<style scoped>

</style>