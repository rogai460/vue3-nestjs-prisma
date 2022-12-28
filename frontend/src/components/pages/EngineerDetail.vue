<script setup lang="ts">
import { ref, onMounted } from "vue";
import EngineerDetailProjectHistoryTable from "@/components/EngineerDetailProjectHistoryTable.vue";
import { useRoute, useRouter } from "vue-router";

export interface ProjectHistoryInput {
  startDate: string | null;
  expectedEndDate: string | null;
  utilizationRate: number | null;
  sales: number | null;
  cost: number | null;
  engineerId: number | null;
  projectId: number | null;
}
export interface EngineerResponse {
  id: string;
  lastName: string;
  firstName: string | null;
  lastNameKana: string | null;
  firstNameKana: string | null;
  sex: number | null;
  employeeId: string | null;
  employeeCategory: number | null;
  laborCost: number | null;
  company: string | null;
  projectHistory: ProjectHistoryResponse[];
}

export interface Project {
  id: string;
  projectNameMask: string;
  projectName: string;
  startDate: Date;
  endDate: Date | null;
  endUser: string;
}

export interface ProjectHistoryResponse {
  id: string;
  startDate: string;
  endDate: string | null;
  // engineerId: number;
  sales: number;
  cost: number;
  lastName: string;
  firstName: string | null;
  lastNameKana: string | null;
  firstNameKana: string | null;
  sex: string | null;
  company: string | null;
  project: Project;
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
const engineerId = ref<number>(0);

const engineerResponse = ref<EngineerResponse>();
const projectHistoryTableData = ref<ProjectHistoryResponse[]>([]);

const error = ref(null);

const postProjectHistory = async (projectHistoryInput: ProjectHistoryInput) => {
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

const getEngineer = async () => {
  try {
    // const response = await fetch("../production/project.json");
    const response = await fetch(
      `http://127.0.0.1:3000/engineer/${engineerId.value}`
    );
    console.log(response); //statusが OKか確認する。
    if (!response.ok) {
      throw Error("No data available");
    }

    engineerResponse.value = await response.json();
    updateEngineerTableData();
  } catch (err: any) {
    error.value = err.message;
    console.log(error.value);
  }
};

const updateEngineerTableData = () => {
  if (!engineerResponse.value) return;
  projectHistoryTableData.value = engineerResponse.value!.projectHistory;
};

onMounted(() => {
  engineerId.value = Number(route.query.engineerId);
  getEngineer();
});
</script>

<template>
  <EngineerDetailProjectHistoryTable
    :engineerId="engineerId"
    :tableData="projectHistoryTableData"
    @postProjectHistory="postProjectHistory"
  />
</template>
