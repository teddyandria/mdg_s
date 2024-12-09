<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold mb-6">Ajouter un produit</h1>
    <form @submit.prevent="createProduct" class="space-y-6">

      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Nom du produit</label>
        <input v-model="name" type="text" id="name" required
               class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>


      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea v-model="description" id="description" required
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
      </div>

      <div>
        <label for="price" class="block text-sm font-medium text-gray-700">Prix</label>
        <input v-model.number="price" type="number" id="price" required
               class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>


      <div>
        <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
        <input v-model.number="stock" type="number" id="stock" required
               class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>


      <div>
        <label for="category" class="block text-sm font-medium text-gray-700">Catégorie</label>

        <select v-if="categories.length" v-model="selectedCategory" id="category" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
          <option v-for="category in categories" :key="category.id" :value="category.name">
            {{ category.name }}
          </option>
        </select>

        <div v-else class="mt-2 text-gray-500">Chargement des catégories...</div>
      </div>


      <div>
        <label for="photos" class="block text-sm font-medium text-gray-700">Photos</label>
        <input @change="handleFiles" type="file" id="photos" multiple accept="image/*"
               class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>

      <div>
        <button type="submit" class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
          Créer le produit
        </button>
      </div>
    </form>


    <div v-if="message" class="mt-6 text-center">
      <p v-if="message === 'Produit créé avec succès !'" class="text-green-500 font-medium">{{ message }}</p>
      <p v-if="message !== 'Produit créé avec succès !'" class="text-red-500 font-medium">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';


const selectedCategory = ref('');
const categories = ref([]);
const name = ref('');
const description = ref('');
const price = ref('');
const stock = ref('');

const photos = ref([]);
const message = ref('');

const handleFiles = (event) => {
  photos.value = Array.from(event.target.files);
};

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:3000/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
  }
};

const createProduct = async () => {
  try {
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('description', description.value);
    formData.append('price', parseFloat(price.value));
    formData.append('stock', stock.value);
    formData.append('categoryName', selectedCategory.value);

    console.log(selectedCategory.value)


    photos.value.forEach((photo) => {
      console.log('Envoi de la photo :', photo);
      formData.append('photos', photo);
    });

    console.log(formData)

    const response = await axios.post('http://localhost:3000/createProducts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    message.value = 'Produit créé avec succès !';
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error.response ? error.response.data : error);
    message.value = 'Erreur lors de la création du produit.';
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
</style>
