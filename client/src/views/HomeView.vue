<script setup>
import MdgFlag from '../assets/images/mdg-flag.png'
</script>

<template>
  <div class="container">
    <img :src="MdgFlag" class="mdg-flag" alt="Madagascar flag"/>
  </div>
</template>

<style scoped>
  .mdg-flag{
    display: block;
    margin: auto;
    width: 278px;
    height: 242px;
  }
</style>