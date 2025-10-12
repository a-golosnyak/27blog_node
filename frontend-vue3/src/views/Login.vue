<template>
  <main class="main-content">
    <section class="section">
      <div class="section-card">
        <h1 class="section-title">Login</h1>
        <form class="form" @submit.prevent="onLogin">
          <label class="form-label">
            Email
            <input v-model="email" type="email" class="form-input" required />
          </label>
          <label class="form-label">
            Password
            <input v-model="password" type="password" class="form-input" required />
          </label>
          <button type="submit" class="btn" :disabled="loading">Login</button>
        </form>
        <div v-if="error" class="alert alert-error mt-2">{{ error }}</div>
        <div class="form-footer">
          <router-link to="/signup">Don't have an account? Sign up</router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth.pinia';

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();
const auth = useAuthStore();

const onLogin = async () => {
  error.value = '';
  loading.value = true;
  try {
    await auth.login({ email: email.value, password: password.value });
    router.push('/');
  } catch (e: any) {
    error.value = e.message || 'Login failed';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.main-content {
  display: flex;
  justify-content: center;
  padding: 32px 0;
}
.section {
  width: 100%;
  max-width: 400px;
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
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form-label {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  color: #222;
}
.form-input {
  margin-top: 4px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #bdbdbd;
  font-size: 1rem;
}
.btn {
  background: #757575;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 18px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.btn:disabled {
  background: #bdbdbd;
  cursor: not-allowed;
}
.alert {
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 8px;
}
.alert-error {
  background: #ffeaea;
  color: #c00;
}
.form-footer {
  margin-top: 18px;
  text-align: center;
}
.mt-2 { margin-top: 8px; }
</style>
