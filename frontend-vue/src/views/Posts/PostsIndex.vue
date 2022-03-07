<template>
  <div class="core">
    <span>Post Index Page </span>
    <button class="" @click="this.buttonClicked">Add one</button>
    <br />
    <br />
    <div v-for="(post, index) in posts" :key="index">
      <PostItem :post="post"></PostItem>
    </div>
  </div>
</template>

<script>
import PostItem from "./PostItem";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PostsIndex",
  components: {
    PostItem,
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      posts: "posts/all",
      response: "posts/response",
    }),
  },
  created() {},
  methods: {
    ...mapActions({
      loadAll: "posts/loadAll",
    }),
    buttonClicked(param) {
      console.log("--- Here 1 ------------");
      console.log(param);
      this.loadAll("aaa");
    },
  },
};
</script>

<style scoped>
.core {
  padding: 1rem 1rem;
}
</style>
