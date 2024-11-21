<script setup>
import MyLogo from "@/components/MyLogo.vue";
</script>

<template>
<footer>
  <div class="container">
    <div class="first-box-footer">
      <MyLogo/>
      <nav class="navbar">
        <router-link to="/" class="nav-link">Accueil</router-link>
        <router-link to="/products" class="nav-link">Produits</router-link>
        <router-link to="/history" class="nav-link">Histoire</router-link>
      </nav>
      <div class="footer-form">
        <p>Restez connecté afin de reçevoir les dernières offres !</p>
        <div>FORMULAIRE</div>
      </div>
    </div>
    <div class="line"></div>
  </div>
</footer>
</template>

<style scoped>
footer{
  height: auto;
  width: 100%;
  flex-shrink: 0;
  background-color: var(--secondary);
}

.navbar, .footer-form{
  color: var(--tertiary);
}

.container{
  padding: 30px;
}

.container>.first-box-footer{
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.container>.first-box-footer>.navbar{
  display: flex;
  flex-direction: column;
  line-height: 2;
}


.footer-form{
  line-height: 2;
}
.footer-form>p{
  padding: 0 0 10px;
  margin: 0;

}

.line{
  height: 0.5px;
  background-color: var(--brown);
  width:100%;
}



.navbar>.nav-link:visited{
  text-decoration: none ;
  color: var(--tertiary);
}

</style>