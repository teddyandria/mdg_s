<script setup>
import ArrowTopRightThinIcon from "vue-material-design-icons/ArrowTopRightThin.vue"

import ProductCard from "@/components/products/ProductCard.vue";


const scrollToSection = () => {
  // Utilisation de scrollIntoView pour scroller vers l'élément avec l'ID "history-main"
  const section = document.getElementById('history-main');
  section.scrollIntoView({
    behavior: 'smooth', // Défilement fluide
    block: 'start'      // Positionnement au début de la section
  });
};


</script>

<template>
  <div class="container">
    <section id="header" class="header">
      <div class="middle flex justify-around items-center flex-col">
        <div class="header-top">
          <h3 class="discover text-xl text-center mb-20 -tracking-tighter">DÉCOUVREZ</h3>
          <h1 class="title-header text-5xl font-extralight mb-20">MADAGASCAR</h1>
        </div>
        <div class="">
          <button @click="scrollToSection" class="text-2xl text-white flex items-center gap-2">
            <span class="font-raleway">Découvrir </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="animate-bounce">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
    <section id="history-main" class="content">
      <div class="grid grid-cols-3 gap-10">
        <div class="news border border-neutral-200 text-center p-2">
          <h2 class="text-base font-medium font-playFair mb-5 ">Nouvelles récentes</h2>
          <div class="text-start">
            <div class="">
              <h3 class="text-sm font-semibold leading-4">La Réintroduction du Lémurien Noir dans les Parcs Nationaux</h3>
              <p class="text-xs text-gray-500">Publié le 5/12/2024</p>
            </div>
            <div class="my-6">
              <h3 class="text-sm font-semibold leading-4">Madagascar : Un Nouveau Parc Marin Pour Protéger la Biodiversité</h3>
              <p class="text-xs text-gray-500">Publié le 3/12/2024</p>
            </div>
            <div class="mb-6">
              <h3 class="text-sm font-semibold leading-4 mb-1">Les Initiatives Écologiques des Villages du Sud de Madagascar</h3>
              <p class="text-xs text-gray-500">Publié le 26/11/2024</p>
            </div>
            <div class="">
              <h3 class="text-sm font-semibold leading-4">La colère du peuple Malgache</h3>
              <p class="text-xs text-gray-500">Publié le 30/09/2024</p>
            </div>
          </div>
        </div>
        <div class="central-content">
          <h2 class="text-center font-medium text-base font-playFair">Voyager au coeur de l'Île Rouge</h2>
          <div>
            <p class="font-raleway text-sm my-3">Plongez au cœur de Madagascar, surnommée l’Île Rouge pour ses paysages captivants d’un rouge ocre intense. Cette terre unique, bordée par l’Océan Indien, vous transporte dans un monde où la nature règne en maître. Forêts luxuriantes, baobabs millénaires, plages immaculées et récifs coralliens s’entrelacent pour offrir des panoramas spectaculaires.</p>
            <p class="font-raleway text-sm">
              Voyager à Madagascar, c’est aussi plonger dans une culture vibrante et authentique, forgée par des siècles de traditions et d’influences diverses. Des villages accueillants aux marchés animés, laissez-vous séduire par la chaleur des Malgaches et leur art de vivre simple et harmonieux. Les rythmes de la musique locale, le parfum des épices, et les saveurs des plats typiques comme le romazava éveilleront tous vos sens.
            </p>
          </div>
        </div>
        <div class="history-link flex justify-evenly">
          <div>
            <img class="object-cover rounded-full h-48 w-28" src="../assets/images/tana-town.jpg" alt="Antananarivo">
          </div>
            <router-link to="/history" class="story border border-neutral-200 p-4">
              <h3 class="font-playFair text-sm font-medium flex">Histoire <arrow-top-right-thin-icon class="mt-1 ms-2" :size="20" /> </h3><img src="../assets/images/mdg.svg"  class="h-18 w-10 mx-auto mt-4" alt="madagascar"></router-link>
        </div>
      </div>
      <div class="mt-16">

      <h1 class="text-center font-playFair">Produits phares</h1>
      <div class="flex justify-center items-center flex-wrap gap-8 p-4">
        <ProductCard :is-home=true />
      </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

  .container{
    padding: 0;
  }

  /*  Header */

  .header{
    max-width: 100%;
    height: 100vh;
    background-image: url('../assets/images/baobab.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 0 0 1000px rgba(0,0,0,0.4) inset;
    padding: 60px;
  }

  .header>.middle{
    backdrop-filter: blur(3px);
    height: 100%;
  }

  .header-top{
    font-family: var(--font-text);
  }

  .header-top>.discover{
    letter-spacing: 5px;
    color: var(--tertiary-color);
  }

  .title-header{
    letter-spacing: 50px;
    font-family: var(--font-text);
    color: var(--tertiary-color);
  }

  /*  Content */

  .container>.content{
    min-height: 100vh;
    padding: 50px 30px 0;
  }

  .news, .history-link{
    height: fit-content;
  }

  .story{
    border-radius: 0 50px 0 50px;
  }

</style>