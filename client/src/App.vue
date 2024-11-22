<script setup>
  import MyNavBar from "@/components/MyNavBar.vue";
  import MyFooter from "@/components/MyFooter.vue";
</script>

<template>
  <div id="app">
    <MyNavBar/>
    <main>
      <router-view/>
    </main>
    <MyFooter/>
  </div>
</template>

<style scoped>

*{
  box-sizing: border-box;
  background-color: var(--background-color);
  margin: 0;
  padding: 0;
}

#app{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-size: var(--text-size);
}

header{
  padding: 10px 30px 0;
}

main{
  font-size: 16px;
  flex: 1 0 auto;
  padding-top: 0;
}
</style>

