<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import { Card } from "@/components/ui/card";
import ArrowRight from "vue-material-design-icons/ArrowRight.vue";


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
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-fit">
    <Card
        v-for="(product, index) in products"
        :key="index"
        :class="[
        'card-product flex flex-col  shadow-none rounded-none w-full overflow-hidden bg-mdgBg h-96',
        index % 3 !== 0 ? 'border-l border-gray-300' : '', isHome ? 'border-none' : 'mb-5'
      ]"
    >
      <img
          :src="`http://localhost:3000${product.photos}`"
          alt="Product Image"
          class="m-auto h-48 object-cover"
      />

      <div class="card-footer mt-auto p-4 flex items-center justify-between text-xs border-none">
        <div>
          <h3 class="text-base font-light text-gray-800 font-poppins">{{ product.name }}</h3>
          <p class="text-base font-semibold">{{ product.price }}€</p>
        </div>

        <router-link
            :to="`/products/${product.id}`"
            class="text-mdgBlack hover:text-mdgSuccess font-semibold text-center"
        >
          <ArrowRight size="30"/>
        </router-link>
      </div>
    </Card>
  </div>
</template>

<style scoped>
.card-product {
  border-right: 1px solid #d1d5db;
}
.card-product:nth-child(3n) {
  border-right: none;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 colonnes en tablette */
  }

  .card-product:nth-child(2n) {
    border-right: none; /* Suppression pour la dernière colonne de 2 colonnes */
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr; /* 1 seule colonne sur mobile */
  }

  .card-product {
    border-right: none; /* Pas de bordure pour 1 seule colonne */
  }
}
</style>
