<template>
  <main class="main-content">
    <section class="section">
      <div class="section-card">
        <h1 class="section-title">Posts</h1>
        <button v-if="isAuthenticated && !showCreateForm" class="btn mb-2" @click="showCreateForm = true">Add Post</button>
        <form v-if="isAuthenticated && showCreateForm" @submit.prevent="onCreatePost" class="create-post-form mb-2">
          <input v-model="newPostTitle" class="create-post-title" placeholder="Title" required />
          <textarea v-model="newPostBody" class="create-post-body" placeholder="Body" required />
          <div class="form-actions">
            <button type="submit" class="btn" :disabled="creating">Add Post</button>
            <button type="button" class="btn btn-cancel" @click="showCreateForm = false">Cancel</button>
          </div>
          <div v-if="createError" class="alert alert-error mt-2">{{ createError }}</div>
        </form>
        <div v-if="error" class="alert alert-error">{{ error }}</div>
        <div v-if="loading" class="loader"></div>
        <ul v-if="posts.length" class="post-list">
          <li v-for="post in posts" :key="post._id" class="post-list-item" @click="goToPost(post._id)">
            <div class="post-title">{{ post.title }}</div>
            <div class="post-meta">{{ post.user?.firstName || 'Unknown name' }} {{ post.user?.lastName || 'Unknown name' }} — {{ formatDate(post.createdAt) }}</div>
          </li>
        </ul>
        <div v-else-if="!loading">No posts found.</div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePostsStore } from '@/store/posts.pinia';
import { useAuthStore } from '@/store/auth.pinia';

const postsStore = usePostsStore();
const authStore = useAuthStore();
const router = useRouter();

const posts = computed(() => postsStore.allPosts);
const loading = computed(() => postsStore.getStatus === 'loading');
const error = computed(() => postsStore.getError);
const isAuthenticated = computed(() => authStore.isAuthenticated);

const newPostTitle = ref('');
const newPostBody = ref('');
const creating = ref(false);
const createError = ref('');
const showCreateForm = ref(false);

onMounted(() => {
  postsStore.fetchPosts();
});

function goToPost(id: string) {
  console.log('--- goToPost id ---', id);
  router.push(`/posts/${id}`);
}

async function onCreatePost() {
  createError.value = '';
  if (!newPostTitle.value.trim() || !newPostBody.value.trim()) return;
  creating.value = true;
  try {
    await postsStore.createPost({
      title: newPostTitle.value,
      body: newPostBody.value
    });
    newPostTitle.value = '';
    newPostBody.value = '';
    showCreateForm.value = false;
  } catch (e: any) {
    createError.value = e?.message || 'Failed to create post';
  } finally {
    creating.value = false;
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleString();
}
</script>

<style scoped>
.main-content {
  display: flex;
  justify-content: center;
  padding: 32px 0;
}
.section {
  width: 100%;
  max-width: 800px;
}
.section-card {
  background: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0001;
  padding: 32px 24px;
}
.section-title {
  font-size: 2rem;
  margin-bottom: 24px;
  color: #333;
}
.alert {
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 16px;
}
.alert-error {
  background: #ffeaea;
  color: #c00;
}
.loader {
  width: 32px;
  height: 32px;
  border: 4px solid #bdbdbd;
  border-top: 4px solid #757575;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 16px auto;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.post-list-item {
  padding: 16px 0;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background 0.2s;
}
.post-list-item:hover {
  background: #ededed;
}
.post-title {
  font-size: 1.1rem;
  font-weight: 500;
  color: #222;
}
.post-meta {
  font-size: 0.95rem;
  color: #888;
}
.create-post-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
}
.create-post-title {
  font-size: 1.1rem;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #bdbdbd;
}
.create-post-body {
  min-height: 60px;
  resize: vertical;
  border-radius: 6px;
  border: 1px solid #bdbdbd;
  padding: 8px;
  font-size: 1rem;
}
.form-actions {
  display: flex;
  gap: 8px;
}
.btn {
  background: #757575;
  color: white;
}
.btn-cancel {
  background: #f44336;
  color: white;
}
</style>
