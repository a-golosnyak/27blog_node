<template>
  <main class="main-content">
    <section class="section">
      <div class="section-card">
        <h1 class="section-title">Contacts</h1>
        <div class="contact-info">
          <div><strong>Address:</strong> 123 Microchip Ave, Tech City</div>
          <div><strong>Phone:</strong> +1 (555) 123-4567</div>
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
.contact-info {
  font-size: 1.1rem;
  color: #222;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
