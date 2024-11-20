<script setup>

</script>

<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Accueil</router-link>
        <router-link to="/history">Histoire</router-link>
      </nav>
    </header>
    <main>
      <router-view/>
    </main>
    <footer>Je suis le footer</footer>
  </div>
</template>


