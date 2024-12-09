<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import { Card } from "@/components/ui/card";
import CardsHeartOutline from "vue-material-design-icons/CardsHeartOutline.vue";

const products = ref([]);

const props = defineProps({
  isHome: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    default: null,
  },
});

const fetchProducts = async () => {
  try {
    const encodedCategory = props.category ? encodeURIComponent(props.category) : '';
    const endpoint = encodedCategory
        ? `http://localhost:3000/products/category/${encodedCategory}`
        : 'http://localhost:3000/products';
    const response = await axios.get(endpoint);
    products.value = response.data;

    if (props.isHome) {
      products.value = products.value.slice(0, 3);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
  }
};

watch(() => props.category, fetchProducts);

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-fit">
    <Card
        v-for="(product, index) in products"
        :key="index"
        class="card-product w-80 shadow-lg rounded-s overflow-hidden mb-5"
    >
      <img
          :src="`http://localhost:3000/uploads/${product.photos.split(',')[0]}`"
          alt="Product Image"
          class="w-full h-48 object-cover"
      />

      <div class="p-4 text-center">
        <h3 class="text-md font-normal text-gray-800 font-raleway">{{ product.name }}</h3>
        <p class="text-lg mt-2 font-bold font-playFair">{{ product.price }}€</p>
      </div>

      <div class="card-footer p-4 flex items-center justify-between font-raleway text-xs">
        <span class="text-gray-500 uppercase" v-if="product.category?.name">{{ product.category.name }}</span>
        <CardsHeartOutline class="text-gray-300"/>
        <router-link
            :to="`/product/${product.id}`"
            class="text-green-800 hover:text-green-600 text-xs font-semibold text-center"
        >
          Voir le produit
        </router-link>
      </div>
    </Card>
  </div>
</template>

<style scoped>
.card-product {
  background-color: var(--tertiary-color);
}

.card-footer {
  background-color: var(--card-color-bg);
}
</style>
