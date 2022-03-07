<template>
  <Navigation></Navigation>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
  font-size: 18px;
}
</style>
<script>
import Navigation from "@/views/Pages/Navigation";
export default {
  components: { Navigation },
};
</script>
