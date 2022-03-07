<template>
  <div class="core">
    <router-link class="title" :to="`/posts/${post.id}`">
      {{ post.title }}
    </router-link>
    <div>{{ post.created_at }}</div>
    <div>{{ post.body }}</div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.core {
  /*background-color: ghostwhite;*/
}
.title {
  color: inherit;
  text-decoration: none;
  font-weight: bold;
}
</style>
