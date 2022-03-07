<template>
  <div class="core">
    <span> Post {{ id }} </span>
    <span v-if="!isEdit">
      <button @click="onEdit()">Edit</button>
      <button @click="onDelete()">Delete</button>
    </span>
    <span v-else>
      <button @click="onEdit()">Save</button>
      <button @click="onCancel()">Cancel</button>
    </span>
    <div v-if="!isEdit">
      {{ post.title }}
    </div>
    <div v-else>
      <input name="title" v-model="postToEdit.title" />
    </div>
    <div v-if="!isEdit">
      {{ post.body }}
    </div>
    <div v-else>
      <textarea name="body" v-model="postToEdit.body" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "PostShow",
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    isEdit: false,
    postToEdit: {},
  }),
  computed: {
    ...mapGetters({
      getOne: "posts/single",
    }),
    post() {
      return this.getOne(this.id);
    },
  },
  created() {
    console.log(this.id);
    console.log(this.post);
  },
  methods: {
    ...mapMutations({
      update: "posts/update",
      delete: "posts/delete",
    }),
    onEdit() {
      if (!this.isEdit) {
        Object.assign(this.postToEdit, this.post);
      } else {
        this.update({ post: this.postToEdit });
        this.$router.push("/");
      }
      this.isEdit = !this.isEdit;
    },
    onCancel() {
      this.isEdit = false;
    },
    onDelete() {
      this.delete({ post: this.post });
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.core {
  padding: 1rem 1rem;
}
button {
  margin-left: 1rem;
}
input,
textarea {
  width: 200px;
}
</style>
