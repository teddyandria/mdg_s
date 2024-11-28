<script setup>
import Account from "vue-material-design-icons/Account.vue"
import MyLogo from "@/components/MyLogo.vue";

defineProps({
  isHomePage: {
    type: Boolean,
    default: false,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <header
      :class="[
      isHomePage ? 'bg-transparent' : 'bg-white shadow-md',
      isVisible ? 'translate-y-0' : '-translate-y-full'
    ]"
  >
    <div class="container">
      <MyLogo/>

      <nav class="nav-bar">
        <router-link to="/" class="nav-link">Accueil</router-link>
        <router-link to="/products" class="nav-link">Produits</router-link>
        <router-link to="/history" class="nav-link">Histoire</router-link>
      </nav>
      <router-link to=""><Account size="22"/></router-link>
    </div>
  </header>

</template>

<style scoped>
  header{
    font-family: var(--font-text);
    padding: 10px 30px 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 50;
    transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  }
  .container{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .nav-bar{
    display: flex;
    justify-content: space-around;
    flex-basis: 30%;
  }

  .nav-bar>.nav-link{
    font-family: var(--font-text);
    font-weight: 400;
    font-size: 14px;

  }

  .nav-bar>.nav-link:hover, .nav-bar>.nav-link:active{
    color: var(--primary-color);
  }

  .nav-link:visited{
    text-decoration: none ;
  }

  .bg-transparent{
    background-color: transparent;
    color: var(--tertiary-color);
  }

  .bg-transparent .logo{
    color: var(--tertiary-color);
  }

  .bg-white{
    background-color: var(--background-color);
    color: var(--text)
  }

  .bg-white .logo{
    color: var(--text)
  }

  .translate-y-0 {
    transform: translateY(0);
  }

  .-translate-y-full {
    transform: translateY(-100%);
  }

</style>