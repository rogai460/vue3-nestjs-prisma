<script setup lang="ts">
import Navbar from "@/basics/Navbar.vue";
import Footer from "@/basics/Footer.vue";
</script>

<template>
  <Navbar />
  <div class="container mx-auto">
    <!-- パスとマッチしたページが表示される -->
    <router-view />
  </div>
  <Footer />
</template>
