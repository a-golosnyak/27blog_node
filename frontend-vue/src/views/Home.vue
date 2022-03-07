<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png" />-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App" />-->
    <PostsIndex></PostsIndex>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import PostsIndex from "./Posts/PostsIndex.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    PostsIndex,
  },
};
</script>

<style scoped>
.home {
  background-color: white;
}
</style>
