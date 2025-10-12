<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo" @click="goHome">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="8" width="24" height="16" rx="3" fill="#BDBDBD"/>
          <rect x="8" y="12" width="16" height="8" rx="2" fill="#757575"/>
          <circle cx="10" cy="16" r="1.5" fill="#E0E0E0"/>
          <circle cx="16" cy="16" r="1.5" fill="#E0E0E0"/>
          <circle cx="22" cy="16" r="1.5" fill="#E0E0E0"/>
        </svg>
        <span class="logo-text">Blog</span>
      </div>
      <nav v-if="!isAuthPage" class="nav-links">
        <router-link :class="{active: isActive('/') }" to="/" class="logo-text">Home</router-link>
        <router-link :class="{active: isActive('/contacts') }" to="/contacts" >Contacts</router-link>
        <router-link :class="{active: isActive('/about') }" to="/about">About</router-link>
      </nav>
      <div v-if="isAuthenticated" class="user-actions">
        <router-link to="/profile" class="profile-btn">Profile</router-link>
        <button class="logout-btn" @click="logout">Logout</button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { useAuthStore } from '../store/auth.pinia';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const isAuthPage = route.path === '/login' || route.path === '/signup';
const goHome = () => router.push('/');
const isActive = (path: string) => route.path === path;

const isAuthenticated = computed(() => auth.isAuthenticated);

const logout = async () => {
  await auth.logout();
  router.push('/');
};
</script>

<style scoped>
.app-header {
  width: 100%;
  background: #424242;
  color: #e0e0e0;
  border-bottom: 1px solid #bdbdbd;
  padding: 0 0;
  position: sticky;
  top: 0;
  z-index: 100;
}
.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
}
.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.logo-text {
  font-weight: bold;
  font-size: 1.3rem;
  margin-left: 8px;
  color: #e0e0e0;
}
.nav-links {
  display: flex;
  gap: 16px;
}
.nav-links a {
  color: #e0e0e0;
  text-decoration: none;
  font-size: 1rem;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background 0.2s;
}
.nav-links,
.nav-links a:hover {
  background: #616161;
}
.user-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.profile-btn, .logout-btn {
  background: none;
  border: none;
  color: #e0e0e0;
  cursor: pointer;
  font-size: 1rem;
  padding: 4px 8px;
  text-decoration: none;
}
.profile-btn:hover, .logout-btn:hover {
  text-decoration: underline;
}
</style>
