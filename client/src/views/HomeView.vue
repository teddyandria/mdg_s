<script setup>
import MdgFlag from '../assets/images/mdg-flag.png'
import AloAlo from "@/components/AloAlo.vue";
</script>

<template>
  <div class="container">
    <div class="header">
      <div class="middle">
        <div class="header-top">
          <AloAlo/>
          <div class="center-header">
            <h3 class="arc-title">EXPLOREZ MADAGASCAR</h3>
            <img :src="MdgFlag" class="mdg-flag" alt="Madagascar flag"/>
            <h1 class="big-title-hp">MADA<span>GASCAR</span></h1>
          </div>
          <AloAlo/>
        </div>
        <div class="header-bottom">

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

  .container{
    padding: 0;
  }
  .header{
    max-width: 100%;
    height: calc(100vh - 45px);
    background-image: url('../assets/images/header_hp.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 0 0 1000px rgba(0,0,0,0.4) inset;
    padding: 30px;
  }

  .header>.middle{
    backdrop-filter: blur(3px);
    height: 100%;
  }

  .header>.middle>.header-top{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .header>.middle>.header-top>.center-header>.arc-title{
    margin: 50px 0 0;
    font-weight: lighter;
    letter-spacing: 4px;
    color: var(--tertiary-color);
    font-family: var(--font-title);
  }

  .header>.middle>.header-top>.center-header>.big-title-hp{
    font-size: 50px;
    font-family: var(--font-title);
    letter-spacing: 4px;
    color: var(--tertiary-color);
    margin-top: 5px;
  }

  .header>.header-top>.center-header>.big-title-hp>span{
    color: var(--tertiary-color);
  }


  .mdg-flag{
    display: block;
    margin: auto;
    width: 258px;
    height: 222px;
  }

  .center-header{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header>.middle>.header-bottom{
    display: flex;
    justify-content: center;
  }
</style>