<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import EngineerTable from "@/components/EngineerList/EngineerTable.vue";
import { EngineerResponse } from "@/@types/ApiReqRes";

export interface EngineerInput {
  lastName: string;
  firstName: string | null;
  lastNameKana: string | null;
  firstNameKana: string | null;
  sex: number | null;
  employeeId: number | null;
  employeeCategory: number | null;
  laborCost: number | null;
  company: string | null;
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

const engineerResponse = ref<EngineerResponse[]>([]);
// const engineerTableData = ref<EngineerTable[]>([]);

const error = ref(null);

const postEngineer = async (engineerInput: EngineerInput) => {
  const method = "POST";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body: string = JSON.stringify(engineerInput);
  try {
    await fetch("http://127.0.0.1:3000/engineer/create", {
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
    const response = await fetch("http://127.0.0.1:3000/engineer");
    // console.log(response); //statusが OKか確認する。
    if (!response.ok) {
      throw Error("No data available");
    }

    engineerResponse.value = await response.json();
    // updateEngineerTableData();
  } catch (err: any) {
    error.value = err.message;
    console.log(error.value);
  }
};

const engineerTableData = computed(() => {
  return engineerResponse.value.map((er) => ({
    id: er.id,
    fullName: `${er.lastName}　${er.firstName}`,
    fullNameKana: `${er.lastNameKana}　${er.firstNameKana}`,
    sex: er.sex === 0 ? "男性" : "女性",
    employeeId: er.employeeId,
    employeeCategory: er.employeeCategory === 0 ? "社員" : "パートナー",
    laborCost: er.laborCost,
    company: er.company,
  }));
});

onMounted(() => {
  getEngineer();
});
</script>

<template>
  <EngineerTable
    :engineerTableData="engineerTableData"
    @postEngineer="postEngineer"
  />
</template>
