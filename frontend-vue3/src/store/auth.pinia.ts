import { defineStore } from 'pinia';
import api from './api';
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: Cookies.get('token') || null as string | null,
    user: null as any | null,
    status: 'idle' as 'idle' | 'loading' | 'error',
    error: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    getStatus: (state) => state.status,
    getError: (state) => state.error,
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      Cookies.set('token', token, { expires: 3, path: '/' });
    },
    setUser(user: any) {
      this.user = user;
    },
    setStatus(status: 'idle' | 'loading' | 'error') {
      this.status = status;
    },
    setError(error: string | null) {
      this.error = error;
    },
    logout() {
      this.token = null;
      this.user = null;
      Cookies.remove('token');
    },
    async login({ email, password }: { email: string; password: string }) {
      this.setStatus('loading');
      this.setError(null);
      try {
        const res = await api.post('/login', { email, password });
        this.setToken(res.data.token);
        this.setUser(res.data.user);
        this.setStatus('idle');
      } catch (e: any) {
        this.setError(e?.response?.data?.message || 'Login failed');
        this.setStatus('error');
        throw new Error(e?.response?.data?.message || 'Login failed');
      }
    },
    async signup({ email, password }: { email: string; password: string }) {
      this.setStatus('loading');
      this.setError(null);
      try {
        const res = await api.post('/signup', { email, password });
        this.setToken(res.data.token);
        this.setUser(res.data.user);
        this.setStatus('idle');
      } catch (e: any) {
        this.setError(e?.response?.data?.message || 'Signup failed');
        this.setStatus('error');
        throw new Error(e?.response?.data?.message || 'Signup failed');
      }
    },
    async initAuth() {
      if (!this.token) return;
      this.setStatus('loading');
      this.setError(null);
      try {
        const res = await api.get('/me');
        this.setUser(res.data.user || res.data);
        this.setStatus('idle');
      } catch (e: any) {
        this.setUser(null);
        this.token = null;
        Cookies.remove('token');
        this.setStatus('idle');
      }
    },
  },
});
