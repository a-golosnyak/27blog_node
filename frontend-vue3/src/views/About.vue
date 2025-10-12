<template>
  <main class="main-content">
    <section class="section">
      <div class="section-card">
        <h1 class="section-title">About</h1>
        <div class="about-info">
          <div>
            <strong>Blog</strong> — это современное веб-приложение для публикации и обсуждения новостей, идей и проектов в области электроники и микроконтроллеров. Здесь вы можете делиться своими статьями, комментировать публикации других пользователей и находить единомышленников.
          </div>
          <div class="mt-2">
            Проект создан для инженеров, студентов и всех, кто интересуется схемотехникой, программированием микроконтроллеров и DIY-электроникой.
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
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
.about-info {
  font-size: 1.1rem;
  color: #222;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.mt-2 { margin-top: 8px; }
</style>
