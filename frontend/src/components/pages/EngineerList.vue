<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import EngineerTable from '@/components/EngineerList/EngineerTable.vue';
import {
  getEngineer,
  EngineerResponse,
  createEngineer,
  EngineerInput,
} from '@/functions/Repository';

const engineerResponse = ref<EngineerResponse[]>([]);
// const engineerTableData = ref<EngineerTable[]>([]);

const engineerTableData = computed(() => {
  return engineerResponse.value;
  
  
  // .map((er) => ({
  //   id: er.id,
  //   fullName: `${er.lastName}　${er.firstName}`,
  //   fullNameKana: `${er.lastNameKana}　${er.firstNameKana}`,
  //   sex: er.sex === 0 ? '男性' : '女性',
  //   employeeId: er.employeeId,
  //   employeeCategory: er.employeeCategory === 0 ? '社員' : 'パートナー',
  //   laborCost: er.laborCost,
  //   company: er.company,
  // }));
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
  <EngineerTable
    :engineerTableData="engineerTableData"
    @postEngineer="postEngineer"
  />
</template>
