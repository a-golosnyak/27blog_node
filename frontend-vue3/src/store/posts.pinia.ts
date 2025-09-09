import { defineStore } from 'pinia';
import api from './api';
import { useAuthStore } from "@/store/auth.pinia";
import router from "@/router";

export interface Post {
  _id: string;
  title: string;
  body: string;
  userId: string;
  user: any;
  createdAt: string;
  updatedAt: string;
}

interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'error';
  error: string | null;
}

export const usePostsStore = defineStore('posts', {
  state: (): PostsState => ({
    posts: [],
    status: 'idle',
    error: null,
  }),
  getters: {
    allPosts: (state: PostsState): Post[] => state.posts,
    getStatus: (state: PostsState): 'idle' | 'loading' | 'error' => state.status,
    getError: (state: PostsState): string | null => state.error,
  },
  actions: {
    setPosts(posts: Post[]) {
      this.posts = posts;
    },
    setStatus(status: 'idle' | 'loading' | 'error') {
      this.status = status;
    },
    setError(error: string | null) {
      this.error = error;
    },
    addPost(post: Post) {
      this.posts.unshift(post);
    },
    updatePost(updated: Post) {
      this.posts = this.posts.map((p: Post) => {
        if (p._id === updated._id) {
          return {
            ...updated,
            user: updated.user || p.user
          };
        }
        return p;
      });
    },
    removePost(id: string) {
      this.posts = this.posts.filter((p: Post) => p._id !== id);
    },
    async fetchPosts() {
      this.setStatus('loading');
      this.setError(null);
      try {
        const res = await api.get('/api/posts');
        this.setPosts(res.data.data);
        this.setStatus('idle');
      } catch (e: any) {
        this.setError(e?.response?.data?.errors?.message || 'Failed to load posts');
        this.setStatus('error');
      }
    },
    async createPost(postData: Partial<Post>) {
      const authStore = useAuthStore();
      const currentUserId = authStore.getUser?._id;
      try {
        const res = await api.post('/api/posts', {
          userId: currentUserId,
          ...postData
        });
        this.addPost({ ...res.data.data, user: authStore.getUser});
      } catch (e: any) {
        throw new Error(e?.response?.data?.errors?.message || 'Failed to create post');
      }
    },
    async updatePostAction({ id, ...data }: { id: string; [key: string]: any }) {
      try {
        const res = await api.put(`/api/posts/${id}`, data);
        this.updatePost(res.data.data);
      } catch (e: any) {
        throw new Error(e?.response?.data?.errors?.message || 'Failed to update post');
      }
    },
    async deletePost(id: string, userId?: string) {
      try {
        await api.delete(`/api/posts/${id}`, { data: { userId } });
        this.removePost(id);
        await router.push('/');
      } catch (e: any) {
        throw new Error(e?.response?.data?.errors?.message || 'Failed to delete post');
      }
    },
  },
});
