<script setup lang="ts">
defineProps<{
  icon: string;
  title: string;
  value: string;
}>();
</script>
<template>
  <!--Metric Card-->
  <div class="bg-white border rounded shadow p-2 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex flex-row items-center">
      <div class="flex-shrink pr-4">
        <div v-if="icon === 'fa-wallet'" class="rounded p-3 bg-green-600">
          <i class="fa fa-wallet fa-2x fa-fw fa-inverse"></i>
        </div>
        <div v-if="icon === 'fa-users'" class="rounded p-3 bg-pink-600">
          <i class="fa fa-users fa-2x fa-fw fa-inverse"></i>
        </div>
        <div v-if="icon === 'fa-user-plus'" class="rounded p-3 bg-yellow-600">
          <i class="fas fa-user-plus fa-2x fa-fw fa-inverse"></i>
        </div>
      </div>
      <div class="flex-1 text-right md:text-center text-gray-900 dark:text-white">
        <h5 class="font-bold uppercase font-semibold tracking-tight">
          {{ title }}
        </h5>
        <h3 class="text-4xl font-extrabold">
          {{ value }}
        </h3>
      </div>
    </div>
  </div>
  <!--/Metric Card-->
</template>
