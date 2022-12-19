<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import ProjectDetail from "./components/ProjectDetail.vue";
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <ProjectDetail />
    <HelloWorld msg="Vite + Vue" />
  </div>
</template>

<style scoped></style>
