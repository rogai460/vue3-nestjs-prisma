<script setup lang="ts">
import { ref, onMounted } from "vue";
import ProjectDetailTable from "@/components/ProjectDetailTable.vue";
import { AddRecordType } from "@/components/ProjectDetailAddRecordType1.vue";
import ProjectDetailAddRecordType1 from "@/components/ProjectDetailAddRecordType1.vue";
import ProjectDetailSummaryCard from "@/components/ProjectDetailSummaryCard.vue";

export interface ProjectResponse {
  projectId: string;
  projectNameMask: string;
  projectName: string;
  // startDate: Date;
  // endDate: Date | null;
  // endUser: string;
  projectHistory: ProjectHistoryResponse[];
}

export interface Project {
  id: string;
  projectNameMask: string;
  projectName: string;
  // startDate: Date;
  // endDate: Date | null;
  // endUser: string;
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
}

const projectInfo = ref<ProjectResponse | null>(null);
const projectResponse = ref<ProjectResponse[]>([]);
const tableData = ref<ProjectHistoryResponse[]>([]);
const refSumSales = ref<number>(0);
const refSumCost = ref<number>(0);
const refAveCost = ref<number>(0);
const refSumProfit = ref<number>(0);
const refSumProfitRate = ref<number>(0);
const projectId = ref<string>();
const projectList = ref<Project[]>([]);
const error = ref(null);
const selected = ref<string[]>([]);

const getProject = async () => {
  try {
    // const response = await fetch("../production/project.json");
    const response = await fetch("http://127.0.0.1:3000/project");
    console.log(response); //statusが OKか確認する。
    if (!response.ok) {
      throw Error("No data available");
    }
    projectList.value = await response.json();
  } catch (err: any) {
    error.value = err.message;
    console.log(error.value);
  }
};
const updateProjectData = () => {
  const project = projectResponse.value.find(
    (p) => String(p.projectId) === String(projectId.value)
  );
  if (!project) {
    return;
  }
  const projectHistory: ProjectHistoryResponse[] = project.projectHistory;
  projectInfo.value = project;

  const sumSales = projectHistory
    .filter((ph) => !selected.value.includes(ph.id))
    .reduce((sumSales: number, ph) => sumSales + ph.sales, 0);
  refSumSales.value = sumSales;

  const sumCost: number = projectHistory
    .filter((ph) => !selected.value.includes(ph.id))
    .reduce((sumCost: number, ph) => sumCost + ph.cost, 0);
  refSumCost.value = sumCost;
  refAveCost.value = Math.round((sumSales / projectHistory.length) * 10) / 10;

  const sumProfit = sumSales - sumCost;
  refSumProfit.value = sumProfit;

  const sumProfitRate = sumProfit / sumSales;
  refSumProfitRate.value = sumProfitRate;

  tableData.value = [
    ...projectHistory,
    {
      id: "sum-record",
      startDate: "",
      endDate: "",
      sales: sumSales,
      cost: sumCost,
      lastName: "合計",
      firstName: "",
      lastNameKana: "",
      firstNameKana: "",
      sex: "",
      company: "",
    },
  ];
};
const updateProjectData2 = () => {
  const projectHistory: ProjectHistoryResponse[] = tableData.value
    .filter((td) => td.id !== "sum-record")
    .map((td) => td);

  const sumSales = projectHistory
    .filter((ph) => !selected.value.includes(ph.id))
    .reduce((sumSales: number, ph) => sumSales + ph.sales, 0);
  refSumSales.value = sumSales;

  const sumCost: number = projectHistory
    .filter((ph) => !selected.value.includes(ph.id))
    .reduce((sumCost: number, ph) => sumCost + ph.cost, 0);
  refSumCost.value = sumCost;
  refAveCost.value = Math.round((sumSales / projectHistory.length) * 10) / 10;

  const sumProfit = sumSales - sumCost;
  refSumProfit.value = sumProfit;

  const sumProfitRate = sumProfit / sumSales;
  refSumProfitRate.value = sumProfitRate;

  tableData.value = [
    ...projectHistory,
    {
      id: "sum-record",
      startDate: "",
      endDate: "",
      sales: sumSales,
      cost: sumCost,
      lastName: "合計",
      firstName: "",
      lastNameKana: "",
      firstNameKana: "",
      sex: "",
      company: "",
    },
  ];
};
const getProjectHistory = async () => {
  try {
    // const response = await fetch("../production/project/history.json");
    const response = await fetch("http://127.0.0.1:3000/project/history");
    console.log(response); //statusが OKか確認する。
    if (!response.ok) {
      //okというプロパティがありtrue/falseで返す
      throw Error("No data available");
    }
    projectResponse.value = await response.json();
    updateProjectData();
  } catch (err: any) {
    error.value = err.message;
    console.log(error.value);
  }
};

const projectChange = (e: any) => {
  projectId.value = e.target.value;
  selected.value = [];
  updateProjectData();
};
const changeNotExistsIds = (notExistsIds: string[]) => {
  selected.value = notExistsIds;
  updateProjectData2();
};

const addTable = (addRecord: AddRecordType) => {
  if (addRecord.lastName === "") {
    return;
  }
  tableData.value = [
    ...tableData.value,
    {
      id: addRecord.id,
      startDate: "",
      endDate: "",
      sales: addRecord.sales,
      cost: addRecord.cost,
      lastName: addRecord.lastName,
      firstName: "",
      lastNameKana: "",
      firstNameKana: "",
      sex: "",
      company: "",
    },
  ];

  updateProjectData2();
};

onMounted(() => {
  getProject();
  getProjectHistory();
});
</script>

<template>
  <div class="w-full md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
    <div class="flex justify-left">
      <div class="mb-3 xl:w-96">
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >案件選択</label
        >
        <select
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="projectId"
          v-on:change="projectChange"
        >
          <option
            v-for="option in projectList"
            :key="option.id"
            :value="option.id"
          >
            {{ option.projectNameMask }}
          </option>
        </select>
      </div>
    </div>

    <h1
      class="px-4 py-3 text-3xl font-bold underline text-gray-600 dark:text-white"
    >
      {{ projectInfo?.projectName }}
    </h1>

    <ProjectDetailSummaryCard
      :sumSales="refSumSales"
      :sumProfitRate="refSumProfitRate"
      :aveCost="refAveCost"
    />

    <!--Divider-->
    <hr class="border-b-2 border-gray-400 my-8 mx-4" />

    <ProjectDetailTable
      :projectInfo="projectInfo"
      :tableData="tableData"
      @changeNotExistsIds="changeNotExistsIds"
    />

    <ProjectDetailAddRecordType1 @addTable="addTable" />
  </div>
</template>
