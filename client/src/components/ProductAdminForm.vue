<script setup>
import { ref} from "vue";
import axios from "axios";

const product = ref({
  name: "",
  description: "",
  price: 0,
  stock: 0,
  photos: [],
  productCategoryId: null, // Lié à la catégorie
});

// const categories = ref([]);
//
// // Charger les catégories depuis le backend
// const fetchCategories = async () => {
//   try {
//     const response = await axios.get("http://localhost:3000/categories");
//     categories.value = response.data;
//   } catch (error) {
//     console.error("Erreur lors du chargement des catégories :", error);
//   }
// };


const submitProduct = async () => {
  try {
    const response = await axios.post("http://localhost:3000/products", product.value);
    alert(`Produit créé avec succès : ${response.data.name}`);
    resetForm();
  } catch (error) {
    console.error(error);
    alert("Erreur lors de la création du produit");
  }
};


const resetForm = () => {
  product.value = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    photos: [],
    // productCategoryId: null,
  };
};


// onMounted(fetchCategories);
</script>

<template>
  <div class="max-w-2xl mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-6">Créer un Produit</h1>
    <form @submit.prevent="submitProduct" class="space-y-4">

      <!-- Nom -->
      <div>
        <label for="name" class="block font-medium text-gray-700">Nom du produit</label>
        <input
            v-model="product.name"
            type="text"
            id="name"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block font-medium text-gray-700">Description</label>
        <textarea
            v-model="product.description"
            id="description"
            required
            rows="3"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>

      <!-- Prix -->
      <div>
        <label for="price" class="block font-medium text-gray-700">Prix</label>
        <input
            v-model.number="product.price"
            type="number"
            id="price"
            required
            step="0.01"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <!-- Stock -->
      <div>
        <label for="stock" class="block font-medium text-gray-700">Stock</label>
        <input
            v-model.number="product.stock"
            type="number"
            id="stock"
            min="0"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <!-- Photos -->
      <div>
        <label for="photos" class="block font-medium text-gray-700">Lien de la photo</label>
        <input
            v-model="product.photos"
            type="text"
            id="photos"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <!-- Catégories -->
<!--      <div>-->
<!--        <label for="category" class="block font-medium text-gray-700">Catégorie</label>-->
<!--        <select-->
<!--            v-model="product.productCategoryId"-->
<!--            id="category"-->
<!--            required-->
<!--            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"-->
<!--        >-->
<!--          <option value="" disabled>Sélectionnez une catégorie</option>-->
<!--          <option v-for="category in categories" :key="category.id" :value="category.id">-->
<!--            {{ category.name }}-->
<!--          </option>-->
<!--        </select>-->
<!--      </div>-->

      <div class="flex justify-between">
        <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-400"
        >
          Créer
        </button>
      </div>
    </form>
  </div>
</template>

<style>

</style>
