import { defineStore } from 'pinia';
import api from './api';
import { useAuthStore } from './auth.pinia';

export interface Comment {
  _id: string;
  postId: string;
  content: string;
  user: any;
  createdAt: string;
  updatedAt: string;
}

interface CommentsState {
  comments: Comment[];
  status: 'idle' | 'loading' | 'error';
  error: string | null;
}

export const useCommentsStore = defineStore('comments', {
  state: (): CommentsState => ({
    comments: [],
    status: 'idle',
    error: null,
  }),
  getters: {
    allComments: (state: CommentsState): Comment[] => state.comments,
    getStatus: (state: CommentsState): 'idle' | 'loading' | 'error' => state.status,
    getError: (state: CommentsState): string | null => state.error,
  },
  actions: {
    setComments(comments: Comment[]) {
      this.comments = comments;
    },
    setStatus(status: 'idle' | 'loading' | 'error') {
      this.status = status;
    },
    setError(error: string | null) {
      this.error = error;
    },
    addComment(comment: Comment) {
      this.comments.push(comment);
    },
    updateComment(updated: Comment) {
      this.comments = this.comments.map((c: Comment) => {
        if (c._id === updated._id) {
          return {
            ...updated,
            user: updated.user || c.user
          };
        }
        return c;
      });
    },
    removeComment(id: string) {
      this.comments = this.comments.filter((c: Comment) => c._id !== id);
    },
    async fetchComments(postId: string) {
      this.setStatus('loading');
      this.setError(null);
      try {
        const res = await api.get(`/api/posts/${postId}/comments`);
        this.setComments(res.data.data);
        this.setStatus('idle');
      } catch (e: any) {
        this.setError(e?.response?.data?.message || 'Failed to load comments');
        this.setStatus('error');
      }
    },
    async createComment({ postId, ...commentData }: { postId: string; content: string }) {
      try {
        const authStore = useAuthStore();
        const currentUserId = authStore.getUser?._id;
        if (!currentUserId) {
          throw new Error('User not authenticated');
        }
        const res = await api.post(`/api/comments`, {
          postId,
          userId: currentUserId,
          ...commentData
        });
        this.addComment({ ...res.data.data, user: authStore.getUser});
      } catch (e: any) {
        throw new Error(e?.response?.data?.errors?.message || 'Failed to create comment');
      }
    },
    async updateCommentAction({ id, ...data }: { id: string; [key: string]: any }) {
      try {
        const res = await api.put(`/api/comments/${id}`, data);
        this.updateComment(res.data.data);
      } catch (e: any) {
        throw new Error(e?.response?.data?.errors?.message || 'Failed to update comment');
      }
    },
    async deleteComment(id: string) {
      try {
        await api.delete(`/api/comments/${id}`);
        this.removeComment(id);
      } catch (e: any) {
        throw new Error(e?.response?.data?.errors?.message || 'Failed to delete comment');
      }
    }
  },
});
