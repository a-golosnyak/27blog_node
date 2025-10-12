<template>
  <AppHeader />
  <router-view />
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
</script>

<style scoped>
body, #app {
  background: #f5f5f5;
  color: #333;
  min-height: 100vh;
  width: 100%;
}
</style>
