<script setup>
defineProps({
  isDarkBackground: {
    type: Boolean,
    default: false, // Par défaut, considérez que le background est clair
  },
});
</script>

<template>
  <router-link
      to="/"
      class="nav-link logo font-medium text-lg font-title transition-colors duration-300"
      :class="isDarkBackground ? 'text-mdgBlack' : 'text-mdgWhite'"
  >
 MadaShop
  </router-link>
</template>

<style scoped>
</style>