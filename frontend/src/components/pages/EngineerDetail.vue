<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ProjectHistoryTable from "@/components/EngineerDetail/ProjectHistoryTable.vue";
import { EngineerWithHistoryResponse } from "@/@types/ApiReqRes";

// defineProps<{
//   engineerTableData: EngineerTable[];
// }>();

export interface ProjectHistoryPostInput {
  startDate: string | null;
  endDate: string | null;
  expectedEndDate: string | null;
  utilizationRate: number | null;
  salesContractCompany: string | null;
  purchaseContractCompany: string | null;
  contractType: number | null;
  sales: number | null;
  cost: number | null;
  projectId: number;
  engineerId: number;
}

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

const projectHistoryTableData = computed(() =>
  engineerResponse.value ? engineerResponse.value.projectHistory : []
);
const error = ref(null);

const getEngineer = async () => {
  if (!route.query.engineerId) return;
  try {
    // const response = await fetch("../production/project.json");
    const response = await fetch(
      `http://127.0.0.1:3000/engineer/${route.query.engineerId}`
    );
    console.log(response); //statusが OKか確認する。
    if (!response.ok) {
      throw Error("No data available");
    }

    engineerResponse.value = await response.json();
  } catch (err: any) {
    error.value = err.message;
    console.log(error.value);
  }
};
const postProjectHistory = async (
  projectHistoryInput: ProjectHistoryPostInput
) => {
  const method = "POST";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body: string = JSON.stringify(projectHistoryInput);
  try {
    await fetch("http://127.0.0.1:3000/project/history/create", {
      method,
      headers,
      body,
    });
    getEngineer();
  } catch (err: any) {
    error.value = err.message;
    console.log(error.value);
  }
};

onMounted(() => {
  getEngineer();
});
</script>

<template>
  <ProjectHistoryTable
    :engineerId="Number($route.query.engineerId)"
    :tableData="projectHistoryTableData"
    @postProjectHistory="postProjectHistory"
  />
</template>
