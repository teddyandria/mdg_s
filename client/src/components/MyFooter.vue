<script setup>
import MyLogo from "@/components/MyLogo.vue";
</script>

<template>
  <footer class="h-screen relative flex flex-col justify-end font-poppins">

    <div class="relative flex flex-col justify-around h-[70%] w-full text-center items-center bg-secondary text-white px-6">

      <div class="absolute inset-0 bg-mdgSuccess bg-opacity-40"></div>

      <div class="relative flex flex-col justify-around h-full w-full items-center">
        <div class="flex flex-col justify-center items-center space-y-4">
          <MyLogo />
          <h1 class="text-xl sm:text-2xl md:text-4xl font-bold tracking-widest uppercase text-white">
            Restez Connectés
          </h1>
          <h3 class="text-sm sm:text-md md:text-xl font-light tracking-wide text-white">
            Abonnez-vous pour découvrir nos dernières offres et actualités!
          </h3>
        </div>

        <div class="w-full font-poppins md:w-1/2 bg-mdgBg bg-opacity-90 rounded-full py-3 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <input
              type="email"
              placeholder="Entrez votre email"
              class="w-full sm:flex-grow text-black text-sm py-2 px-4 rounded-full focus:outline-none border border-gray-300"
          />
          <button
              class="bg-mdgError hover:bg-tertiary text-white text-sm py-2 px-6 rounded-full transition-all duration-300"
          >
            S'inscrire
          </button>
        </div>
      </div>
    </div>

    <div class="bg-mdgBg h-[30%] w-full text-gray-700 px-6 py-8">
      <div class="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

        <div>
          <h2 class="text-lg font-medium mb-4 text-black">Navigation</h2>
          <ul class="space-y-2">
            <li><router-link to="/" class="hover:text-tertiary transition">Accueil</router-link></li>
            <li><router-link to="/products" class="hover:text-tertiary transition">Produits</router-link></li>
          </ul>
        </div>


        <div>
          <h2 class="text-lg font-medium mb-4 text-black">Informations utiles</h2>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-tertiary transition">À propos</a></li>
            <li><a href="#" class="hover:text-tertiary transition">Questions fréquentes</a></li>
            <li><a href="#" class="hover:text-tertiary transition">Nos partenaires</a></li>
            <li><a href="#" class="hover:text-tertiary transition">Politique de confidentialité</a></li>
          </ul>
        </div>


        <div>
          <h2 class="text-lg font-medium mb-4 text-black">Liens utiles</h2>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-tertiary transition">Termes et conditions</a></li>
            <li><a href="#" class="hover:text-tertiary transition">Blog</a></li>
            <li><a href="#" class="hover:text-tertiary transition">Nos boutiques</a></li>
            <li><a href="#" class="hover:text-tertiary transition">Plan du site</a></li>
          </ul>
        </div>

        <div>
          <h2 class="text-lg font-medium mb-4 text-black">Suivez-nous</h2>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-tertiary transition">Facebook</a></li>
            <li><a href="#" class="hover:text-tertiary transition">Instagram</a></li>
            <li><a href="#" class="hover:text-tertiary transition">Twitter</a></li>
            <li><a href="#" class="hover:text-tertiary transition">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>