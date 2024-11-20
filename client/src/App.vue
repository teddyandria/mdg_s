<script setup>
  import MyNavBar from "@/components/MyNavBar.vue";
</script>

<template>
  <div id="app">
    <MyNavBar/>
    <main>
      <router-view/>
    </main>
    <footer>Je suis le footer</footer>
  </div>
</template>


