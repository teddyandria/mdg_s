<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Account from "vue-material-design-icons/Account.vue";
import LogoutVariant from "vue-material-design-icons/LogoutVariant.vue"; // Icône de déconnexion
import MyLogo from "@/components/MyLogo.vue";
import CartOutline from "vue-material-design-icons/CartOutline.vue";

const userIsAuthenticated = ref(false);

const updateAuthenticationStatus = () => {
  userIsAuthenticated.value = !!localStorage.getItem("token");
};

updateAuthenticationStatus();

const redirectPath = computed(() => {
  return userIsAuthenticated.value ? "/dashboard" : "/login";
});

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

const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  updateAuthenticationStatus();
  router.push("/login");
}

const route = useRoute();
</script>

<template>
  <header
      :class="[
      'fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-2 transition-all duration-300 font-poppins backdrop-blur-md',
      isVisible ? 'translate-y-0' : '-translate-y-full',
      !isHomePage ? 'bg-white bg-opacity-40 shadow-sm' : ''
    ]"
  >
    <div class="flex justify-between items-center">

      <MyLogo
          class="w-24 sm:w-28 h-auto"
          :class="isHomePage ? 'text-white' : 'text-gray-800'"
      />

      <button
          class="block md:hidden text-current hover:text-primary"
          @click="toggleMobileMenu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
        </svg>
      </button>

      <nav class="hidden md:flex space-x-8">
        <router-link
            to="/"
            class="text-sm font-medium"
            :class="[
              isHomePage ? 'text-white' : 'text-gray-800',
              'hover:text-primary'
            ]"
        >
          Accueil
        </router-link>
        <router-link
            to="/products"
            class="text-sm font-medium"
            :class="[
              isHomePage ? 'text-white' : 'text-gray-800',
              'hover:text-primary'
            ]"
        >
          Produits
        </router-link>
        <router-link
            to="/history"
            class="text-sm font-medium"
            :class="[
              isHomePage ? 'text-white' : 'text-gray-800',
              'hover:text-primary'
            ]"
        >
          History
        </router-link>
      </nav>

      <div class="flex items-center space-x-4">
        <router-link
            v-if="userIsAuthenticated"
            to="/cart"
            :class="[
              isHomePage ? 'text-white' : 'text-gray-800',
              'hover:text-primary'
            ]"
        >
          <CartOutline/>
        </router-link>
        <router-link
            :to="redirectPath"
            :class="[
              isHomePage ? 'text-white' : 'text-gray-800',
              'hover:text-primary'
            ]"
        >
          <Account size="22"/>
        </router-link>

        <button
            v-if="userIsAuthenticated"
            @click="logout"
            class="hover:text-primary"
        >
          <LogoutVariant size="22" :class="[isHomePage ? 'text-white' : 'text-gray-800']"/>
        </button>
      </div>

    </div>

    <nav
        v-if="isMobileMenuOpen"
        class="mt-4 md:hidden flex flex-col space-y-4 bg-gray-50 shadow-md px-6 py-4 rounded"
    >
      <router-link
          to="/"
          class="text-sm font-medium text-gray-700 hover:text-primary"
      >
        Accueil
      </router-link>
      <router-link
          to="/products"
          class="text-sm font-medium text-gray-700 hover:text-primary"
      >
        Produits
      </router-link>
      <router-link
          to="/history"
          class="text-sm font-medium text-gray-700 hover:text-primary"
      >
        History
      </router-link>
    </nav>
  </header>
</template>

<style scoped>
header {
  height: auto;
}

nav {
  transition: all 0.3s ease-in-out;
}
</style>