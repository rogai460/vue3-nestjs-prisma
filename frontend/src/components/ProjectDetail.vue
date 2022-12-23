<script setup lang="ts">
import { ref, onMounted } from "vue";
import ProjectDetailTable from "./ProjectDetailTable.vue";
import ProjectDetailSummaryCard from "./ProjectDetailSummaryCard.vue";

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
const addRecord = ref<{
  id: string;
  lastName: string;
  sales: number;
  cost: number;
}>({
  id: "",
  lastName: "",
  sales: 0,
  cost: 0,
});

const getProject = async () => {
  try {
    const response = await fetch("../production/project.json");
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
    const response = await fetch("../production/project/history.json");
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

const addTable = () => {
  if (addRecord.value.lastName === "") {
    return;
  }
  tableData.value = [
    ...tableData.value,
    {
      id: addRecord.value.lastName,
      startDate: "",
      endDate: "",
      sales: addRecord.value.sales * 10000,
      cost: addRecord.value.cost * 10000,
      lastName: addRecord.value.lastName,
      firstName: "",
      lastNameKana: "",
      firstNameKana: "",
      sex: "",
      company: "",
    },
  ];
  updateProjectData2();

  addRecord.value = {
    id: "",
    lastName: "",
    sales: 0,
    cost: 0,
  };
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
        <select
          v-model="projectId"
          v-on:change="projectChange"
          class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label="Default select example"
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
    <h1 class="px-4 py-3 text-3xl font-bold underline">
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

    <div class="my-4">
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">
        レコード追加（シミレーション用）
      </h5>
      <div
        class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
      >
        <form class="grid grid-cols-4 gap-4" action="#">
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >名称</label
            >
            <input
              type="text"
              v-model="addRecord.lastName"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="名前"
              required
            />
          </div>
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >売単価（万円）</label
            >
            <input
              type="number"
              v-model="addRecord.sales"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="100000"
              required
            />
          </div>
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >買単価（万円）</label
            >
            <input
              type="number"
              v-model="addRecord.cost"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="1000000"
              required
            />
          </div>

          <button
            type="submit"
            class="rounded-full bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2"
            @click="addTable"
          >
            追加
          </button>
          <div>
            利益率：{{
              addRecord.sales > 0 && addRecord.cost > 0
                ? Math.round(
                    ((addRecord.sales - addRecord.cost) / addRecord.sales) *
                      100 *
                      10
                  ) / 10
                : "-"
            }}
            %
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
