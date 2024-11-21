<script setup>
import Account from "vue-material-design-icons/Account.vue"
import MyLogo from "@/components/MyLogo.vue";


</script>

<template>
  <header>
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

    margin-bottom: 50px;
    font-family: var(--font-text);
  }
  .container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: .5px solid var(--brown);
    padding-bottom: 10px;
  }

  .nav-bar{
    display: flex;
    justify-content: space-around;
    flex-basis: 34%;
  }

  .nav-bar>.nav-link{
    font-family: var(--font-text);
    font-weight: 400;
    font-size: 14px;
  }

  .nav-bar>.nav-link:hover, .nav-bar>.nav-link:active{
    color: var(--primary);
  }

  .nav-link:visited{
    text-decoration: none ;
    color: var(--text);
  }
</style>