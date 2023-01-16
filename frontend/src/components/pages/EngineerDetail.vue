<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProjectHistoryTable from '@/components/EngineerDetail/ProjectHistoryTable.vue';
import {
  getEngineerWithHistory,
  EngineerWithHistoryResponse,
  createProjectHistory,
  ProjectHistoryPostInput,
} from '@/functions/Repository';

// defineProps<{
//   engineerTableData: EngineerTable[];
// }>();

export interface EngineerTable {
  id: string;
  fullName: string;
  fullNameKana: string | null;
  sex: string | null;
  employeeId: string | null;
  employeeCategory: string | null;
  laborCost: number | null;
  company: string | null;
}

const route = useRoute();
const engineerResponse = ref<EngineerWithHistoryResponse>();
const engineerData = computed(() => ({
  id: engineerResponse.value?.id ?? '',
  lastName: engineerResponse.value?.lastName ?? '',
  firstName: engineerResponse.value?.firstName ?? null,
  lastNameKana: engineerResponse.value?.lastNameKana ?? null,
  firstNameKana: engineerResponse.value?.firstNameKana ?? null,
  sex: engineerResponse.value?.sex ?? null,
  employeeId: engineerResponse.value?.employeeId ?? null,
  employeeCategory: engineerResponse.value?.employeeCategory ?? null,
  laborCost: engineerResponse.value?.laborCost ?? null,
  company: engineerResponse.value?.company ?? null,
}));

const projectHistoryTableData = computed(() =>
  engineerResponse.value ? engineerResponse.value.projectHistory : [],
);

const postProjectHistory = async (
  projectHistoryInput: ProjectHistoryPostInput,
) => {
  await createProjectHistory(projectHistoryInput);
  reloadEngineerResponse();
};

const reloadEngineerResponse = async () => {
  engineerResponse.value = await getEngineerWithHistory(
    String(route.query.engineerId),
  );
};

onMounted(() => {
  reloadEngineerResponse();
});
</script>

<template>
  <ProjectHistoryTable
    :engineerId="Number($route.query.engineerId)"
    :engineerData="engineerData"
    :tableData="projectHistoryTableData"
    @postProjectHistory="postProjectHistory"
  />
</template>
