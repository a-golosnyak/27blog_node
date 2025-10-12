<template>
  <div class="section-card mt-4">
    <h2 class="section-title">Comments</h2>
    <div v-if="commentsError" class="alert alert-error">{{ commentsError }}</div>
    <div v-if="loadingComments" class="loader"></div>
    <ul v-if="comments.length" class="comment-list">
      <li v-for="comment in comments" :key="comment._id" class="comment-list-item">
        <div class="comment-content">
          <div v-if="editingCommentId !== comment._id">
            {{ comment.content }}
          </div>
          <textarea v-else
                    v-model="editedCommentContent"
                    class="comment-textarea"
                    placeholder="Edit your comment"
                    required></textarea>
        </div>
        <div>
          <div v-if="commentError.commentId === comment._id" class="alert alert-error mt-2">{{ commentError.message }}</div>
        </div>
        <div class="comment-meta">
          {{ comment.user?.firstName + ' ' + comment.user?.lastName || 'Unknown author' }} — {{ formatDate(comment.createdAt) }}
          <span v-if="canEditComment(comment)" class="edit-controls">
            <button v-if="editingCommentId !== comment._id"
                    @click="startEditComment(comment)"
                    class="edit-button">
              Edit
            </button>
            <button v-if="editingCommentId !== comment._id"
                    @click=deleteComment(comment._id)
                    class="delete-button">
              Delete
            </button>
            <template v-else>
              <button @click="saveEditComment(comment._id)" class="save-button">
                Save
              </button>
              <button @click="cancelEditComment" class="cancel-button">
                Cancel
              </button>
            </template>
          </span>
        </div>
      </li>
    </ul>
    <div v-else-if="!loadingComments">No comments yet.</div>
    <form @submit.prevent="onAddComment" class="comment-form mt-4">
      <textarea v-model="newComment" class="comment-textarea" placeholder="Add a comment" required></textarea>
      <button type="submit" class="btn" :disabled="addingComment">Add Comment</button>
      <div v-if="addCommentError" class="alert alert-error mt-2">{{ addCommentError }}</div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useCommentsStore } from '@/store/comments.pinia';
import { useAuthStore } from '@/store/auth.pinia';

interface Props {
  postId: string;
}

const props = defineProps<Props>();

const commentsStore = useCommentsStore();
const authStore = useAuthStore();

const comments = computed(() => commentsStore.allComments);
const currentUser = computed(() => authStore.getUser);
const loadingComments = computed(() => commentsStore.getStatus === 'loading');
const commentsError = computed(() => commentsStore.getError);

const editingCommentId = ref<string | number | null>(null);
const editedCommentContent = ref('');
const newComment = ref('');
const addingComment = ref(false);
const addCommentError = ref('');
const commentError = ref({commentId: null, message: ''});


function canEditComment(comment: any) {
  // return currentUser.value && comment.user && comment.user._id === currentUser.value._id;
  return currentUser.value && comment.user && true;
}

function startEditComment(comment: any) {
  editingCommentId.value = comment._id;
  editedCommentContent.value = comment.content;
  commentError.value = { commentId: null, message: '' };
}

async function saveEditComment(commentId: string) {
  try {
    await commentsStore.updateCommentAction({ id: commentId, content: editedCommentContent.value });
    editingCommentId.value = null;
    editedCommentContent.value = '';
  } catch (e: any) {
    commentError.value.commentId = commentId;
    commentError.value.message = e?.message || 'Failed to add comment';
  }
}

function cancelEditComment() {
  editingCommentId.value = null;
  editedCommentContent.value = '';
  commentError.value = { commentId: null, message: '' };
}

async function onAddComment() {
  addCommentError.value = '';
  addingComment.value = true;
  try {
    await commentsStore.createComment({ postId: props.postId, content: newComment.value });
    newComment.value = '';
  } catch (e: any) {
    addCommentError.value = e?.message || 'Failed to add comment';
  } finally {
    addingComment.value = false;
  }
}

async function deleteComment(commentId: string) {
  try {
    await commentsStore.deleteComment(commentId);
  } catch (e: any) {
    console.log('commentId', commentId)
    console.log(e)
    commentError.value.commentId = commentId;
    commentError.value.message = e?.message || 'Failed to add comment';
    // postError.value = (e instanceof Error && e.message) ? e.message : 'Failed to delete comment';
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

watch(() => props.postId, async (newId) => {
  if (newId) await commentsStore.fetchComments(newId);
}, { immediate: true });
</script>

<style scoped>
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
.comment-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.comment-list-item {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px #0001;
  margin-bottom: 16px;
  padding: 18px 16px;
}
.comment-content {
  font-size: 1rem;
  color: #333;
  margin-bottom: 8px;
}
.comment-meta {
  color: #888;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.comment-textarea {
  width: 100%;
  min-height: 60px;
  border-radius: 6px;
  border: 1px solid #bdbdbd;
  padding: 8px;
  font-size: 1rem;
  margin-bottom: 8px;
}
.comment-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
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
</style>
