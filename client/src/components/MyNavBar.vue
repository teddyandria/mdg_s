<script setup>
import Account from "vue-material-design-icons/Account.vue";
import MyLogo from "@/components/MyLogo.vue";
import { ref, computed } from "vue";
import CartOutline from "vue-material-design-icons/CartOutline.vue";

const userIsAuthenticated = computed(() => !!localStorage.getItem("token"));

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

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <header
      :class="[
      'fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-3 transition-all duration-300 font-poppins',
      isHomePage ? 'bg-transparent shadow-none' : 'bg-white shadow-md',
      isVisible ? 'translate-y-0' : '-translate-y-full'
    ]"
  >
    <div class="flex justify-between items-center text-mdgWhite">

      <MyLogo :class="isHomePage ? 'text-tertiary' : 'text-black'"/>

      <button
          class="block md:hidden text-gray-700 hover:text-primary"
          @click="toggleMobileMenu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      <nav class="hidden md:flex space-x-8">
        <router-link to="/" class="text-sm font-regular hover:text-primary">
          Accueil
        </router-link>
        <router-link to="/products" class="text-sm font-regular hover:text-primary">
          Produits
        </router-link>
      </nav>

      <div class="flex items-center space-x-4">
        <router-link
            v-if="userIsAuthenticated"
            to="/cart"
            class="hover:text-primary"
        >
          <CartOutline />
        </router-link>
        <router-link
            :to="userIsAuthenticated ? '/dashboard' : '/login'"
            class="hover:text-primary"
        >
          <Account size="22" />
        </router-link>
      </div>

    </div>

    <nav
        v-if="isMobileMenuOpen"
        class="mt-4 md:hidden flex flex-col space-y-4 bg-white shadow-md px-6 py-4 rounded"
    >
      <router-link to="/" class="text-sm font-medium text-gray-700 hover:text-primary">
        Accueil
      </router-link>
      <router-link to="/products" class="text-sm font-medium text-gray-700 hover:text-primary">
        Produits
      </router-link>
    </nav>
  </header>
</template>

<style scoped>
nav {
  transition: all 0.3s ease-in-out;
}
</style>