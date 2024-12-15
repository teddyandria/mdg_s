<script setup>
defineProps({
  isDarkBackground: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <router-link
      to="/"
      class="flex items-center group transition-all duration-300 ease-in-out"
  >
    <span
        class="font-bold font-title tracking-wider uppercase transition-colors duration-300"
        :class="[
          isDarkBackground ? 'text-white' : 'text-black',
          'text-xl sm:text-2xl md:text-3xl'
        ]"
    >
      Mada
      <span class="opacity-70 group-hover:opacity-100 transition-opacity">
        Shop
      </span>
    </span>

    <span
        class="block relative w-full h-[2px] sm:h-[3px] md:h-[4px] mt-1 bg-current group-hover:w-[40%] transition-all duration-500 ease-in-out"
    ></span>
  </router-link>
</template>

<style scoped>
</style>