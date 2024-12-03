<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import MyNavBar from "@/components/MyNavBar.vue";
import MyFooter from "@/components/MyFooter.vue";
import { useRoute } from "vue-router";


const route = useRoute();
const isHomePage = computed(() => route.name === "home");

const isNavbarHiddenOnRoute = computed(() => route.name === "admin");

const isNavbarVisible = ref(true);
let lastScrollPosition = 0;

const handleScroll = () => {
  const currentScroll = window.scrollY;
  isNavbarVisible.value = currentScroll < lastScrollPosition || currentScroll <= 0;
  lastScrollPosition = currentScroll;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div id="app">
    <main>

      <MyNavBar
          v-if="!isNavbarHiddenOnRoute"
          :isHomePage="isHomePage"
          :isVisible="isNavbarVisible"
      />
      <router-view/>
    </main>
    <MyFooter/>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  background-color: var(--background-color);
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-size: var(--text-size);
}

main {
  font-size: 16px;
  flex: 1 0 auto;
  padding-top: 0;
}
</style>
