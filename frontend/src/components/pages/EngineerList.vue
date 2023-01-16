<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import EngineerTable from '@/components/EngineerList/EngineerTable.vue';
import { getEngineer, EngineerResponse, createEngineer, EngineerInput } from '@/functions/Repository';

const engineerResponse = ref<EngineerResponse[]>([]);

const engineerTableData = computed(() => {
  return engineerResponse.value;
});

const postEngineer = async (engineerInput: EngineerInput) => {
  await createEngineer(engineerInput);
  reloadEngineerResponse();
};

const reloadEngineerResponse = async () => {
  engineerResponse.value = await getEngineer();
};

onMounted(() => {
  reloadEngineerResponse();
});
</script>

<template>
  <EngineerTable :engineer-table-data="engineerTableData" @postEngineer="postEngineer" />
</template>
