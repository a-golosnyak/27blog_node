<template>
  <main class="main-content">
    <section class="section">
      <div class="section-card">
        <h1 class="section-title">Profile</h1>
        <div class="profile-info">
          <div><strong>Email:</strong> {{ user?.email || 'Unknown' }}</div>
          <div><strong>ID:</strong> {{ user?._id || '-' }}</div>
          <div><strong>Name:</strong> {{ user?.firstName + ' ' + user?.lastName  || '-' }}</div>
        </div>
        <button class="btn mt-4" @click="logout">Logout</button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth.pinia';

const router = useRouter();
const auth = useAuthStore();
const user = computed(() => auth.getUser);

function logout() {
  auth.logout();
  router.push('/login');
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
.profile-info {
  font-size: 1.1rem;
  color: #222;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 18px;
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
.mt-4 { margin-top: 18px; }
</style>
