<script setup>
import Account from "vue-material-design-icons/Account.vue"


</script>

<template>
  <header>
    <div class="container">
      <router-link to="/" class="nav-link"><span class="mada">Mada</span>Shop</router-link>
      <nav class="nav-bar">
        <router-link to="/" class="nav-link">Accueil</router-link>
        <router-link to="/products" class="nav-link">Produits</router-link>
        <router-link to="/history" class="nav-link">Histoire</router-link>
      </nav>
      <Account size="22"/>
    </div>
  </header>

</template>

<style scoped>
  header{
    padding: 10px 20px;
    margin-bottom: 50px;
    font-family: var(--font-text);
  }
  .container{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .container>.nav-link:nth-child(1){
    font-size: 1.2em;
    font-weight: bold;
    font-family: var(--font-title);
  }

  .container>.nav-link:nth-child(1)>.mada{
    color: var(--primary);
  }

  .nav-bar{
    //width: 50%;
    display: flex;
    justify-content: space-around;
    flex-basis: 30%;
  }



  .nav-bar>.nav-link{
    font-family: var(--font-text);
    font-weight: 400;
    display: inline-block;
  }

  .nav-bar>.nav-link:hover, .nav-bar>.nav-link:active{
    color: var(--primary);
  }
</style>