<script setup lang="ts">
import { ref } from "vue";
import CreateModal from "@/basics/CreateModal.vue";

defineProps<{ msg: string }>();

const count = ref(0);
const showModal = ref<boolean>(false);
const closeModal = () => {
  showModal.value = false;
};
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <div class="page p-8">
    <button
      type="button"
      @click="showModal = !showModal"
      class="mx-auto w-full flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
    >
      Open Modal
    </button>
    {{ showModal }}
    <CreateModal :show="showModal" @closeModal="closeModal" />
  </div>
</template>
