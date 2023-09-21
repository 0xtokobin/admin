<template>
  <router-view></router-view>
</template>



<script setup>
import Layout from './layout/index.vue'

</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
