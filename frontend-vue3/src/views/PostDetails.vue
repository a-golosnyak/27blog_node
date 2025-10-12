<template>
  <main class="main-content">
    <section class="section">
      <div class="section-card">
        <h1 class="section-title">
          <span v-if="!editingPost">{{ post?.title || 'Post Details' }}</span>
          <input v-else v-model="editedPostTitle" class="edit-post-title" />
        </h1>
        <div v-if="loadingPost" class="loader"></div>
        <div v-else-if="post">
          <div class="mb-2 post-body">
            <span v-if="!editingPost">{{ post.body }}</span>
            <textarea v-else v-model="editedPostBody" class="edit-post-body" />
          </div>
          <div class="post-meta post-meta">
            By {{ post.user?.email || 'Unknown author' }} — {{ formatDate(post.createdAt) }}
            <span v-if="canEditPost" class="edit-controls">
              <button v-if="!editingPost" @click="startEditPost" class="edit-button">Edit</button>
              <template v-else>
                <button @click="saveEditPost" class="save-button">Save</button>
                <button @click="cancelEditPost" class="cancel-button">Cancel</button>
              </template>
              <button @click="showDeleteModal = true" class="delete-button">Delete</button>
            </span>
          </div>
        </div>
        <div v-if="postError" class="alert alert-error">{{ postError }}</div>
      </div>
      <!-- Модальное окно подтверждения удаления -->
      <div v-if="showDeleteModal" class="modal-overlay">
        <div class="modal">
          <p>Are you sure you want to delete this post?</p>
          <div class="modal-actions">
            <button @click="confirmDeletePost" class="btn btn-danger">Yes, delete</button>
            <button @click="showDeleteModal = false" class="btn">Cancel</button>
          </div>
        </div>
      </div>
      <CommentsSection :postId="postId" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePostsStore } from '@/store/posts.pinia';
import { useAuthStore } from '@/store/auth.pinia';
import CommentsSection from './CommentsSection.vue';

const route = useRoute();
const postId = typeof route.params.id === 'string' ? route.params.id : '';

const postsStore = usePostsStore();
const authStore = useAuthStore();

const post = computed(() => postsStore.allPosts.find((p: any) => String(p._id) === String(postId)));

console.log('--- post ---', post.value);

const loadingPost = ref(false);
const postError = ref('');

const editingPost = ref(false);
const editedPostTitle = ref('');
const editedPostBody = ref('');

onMounted(async () => {
  if (!post.value) {
    loadingPost.value = true;
    try {
      await postsStore.fetchPosts();
    } catch (e: any) {
      postError.value = e?.message || 'Failed to load post';
    } finally {
      loadingPost.value = false;
    }
  }
});

function startEditPost() {
  editingPost.value = true;
  editedPostTitle.value = post?.value?.title || '';
  editedPostBody.value = post?.value?.body || '';
  postError.value = '';
}

async function saveEditPost() {
  if (!editedPostTitle.value.trim() || !editedPostBody.value.trim()) return;
  try {
    await postsStore.updatePostAction({
      id: post?.value?._id || '',
      title: editedPostTitle.value,
      body: editedPostBody.value
    });
    editingPost.value = false;
  } catch (e) {
    postError.value = (e instanceof Error && e.message) ? e.message : 'Failed to update post';
  }
}

function cancelEditPost() {
  editingPost.value = false;
  editedPostTitle.value = '';
  editedPostBody.value = '';
  postError.value = '';
}

const showDeleteModal = ref(false);

async function confirmDeletePost() {
  try {
    showDeleteModal.value = false;
    await postsStore.deletePost(postId, currentUser.value?._id || '');
  } catch (e) {
    postError.value = (e instanceof Error && e.message) ? e.message : 'Failed to delete post';
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

const currentUser = computed(() => authStore.getUser);
const canEditPost = computed(() => {
  // return currentUser.value && post?.value?.user && post.value.user._id === currentUser.value._id;
  return currentUser.value && post?.value?.user && true;
});
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
  margin-bottom: 24px;
}
.section-title {
  font-size: 1.5rem;
  margin-bottom: 18px;
  color: #333;
}
.post-body {
  color: #333;
}
.post-meta {
  color: #888;
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
.btn {
  background: #757575;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 18px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.btn:disabled {
  background: #bdbdbd;
  cursor: not-allowed;
}
.edit-controls {
  margin-left: 12px;
}
.edit-button, .save-button, .cancel-button, .delete-button {
  background: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 8px;
}
.edit-button:hover, .save-button:hover, .cancel-button:hover, .delete-button:hover {
  text-decoration: underline;
}
.delete-button {
  color: #cc0000;
}
.mt-2 { margin-top: 8px; }
.mt-4 { margin-top: 18px; }
.mb-2 { margin-bottom: 8px; }
.edit-post-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  border: none;
  outline: none;
  width: 100%;
  margin-bottom: 12px;
}
.edit-post-body {
  font-size: 1rem;
  color: #333;
  border: 1px solid #bdbdbd;
  border-radius: 6px;
  min-height: 30vh;
  width: 100%;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  color: #333;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.btn-danger {
  background: #c00;
  color: #fff;
}
</style>
