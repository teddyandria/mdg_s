<script setup>

</script>

<template>
  <div class="container">
    <div class="header">
      <div class="middle">
        <div class="header-top">
          <div class="center-header">
          </div>
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
    height: 100vh;
    background-image: url('../assets/images/baobab.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 0 0 1000px rgba(0,0,0,0.4) inset;
    padding: 60px;
  }

  .header>.middle{
    backdrop-filter: blur(4px);
    height: 100%;
  }

  .header>.middle>.header-top{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }


  .header>.header-top>.center-header>.big-title-hp>span{
    color: var(--tertiary-color);
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