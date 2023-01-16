<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProjectDetailTable from '@/components/ProjectDetail/ProjectDetailTable.vue';
import { AddRecordType } from '@/components/ProjectDetail/AddRecordType1.vue';
import AddRecordType1 from '@/components/ProjectDetail/AddRecordType1.vue';
import ProjectDetailSummaryCard from '@/components/ProjectDetail/ProjectDetailSummaryCard.vue';
import {
  getProject,
  ProjectResponse,
  getProjectWithHistory,
  ProjectWithHistoryResponse,
} from '@/functions/Repository';

export interface TableData {
  id: string;
  startDate: string;
  endDate: string | null;
  expectedEndDate: string | null;
  sales: number;
  cost: number | null;
  lastName: string | null;
  firstName: string | null;
  lastNameKana: string | null;
  firstNameKana: string | null;
  sex: number | null;
  company: string | null;
}

const route = useRoute();
const projectResponse = ref<ProjectWithHistoryResponse[]>([]);

const projectId = ref<string>(
  route.query.projectId ? String(route.query.projectId) : '',
);
const projectList = ref<ProjectResponse[]>([]);
const selected = ref<string[]>([]);

const addTableData = ref<TableData[]>([]);
const tableData = computed((): TableData[] => {
  const p = projectResponse.value.find((p) => String(p.id) == projectId.value);
  const t = !p
    ? []
    : p.projectHistory.map((ph) => ({
        id: String(ph.id),
        startDate: ph.startDate,
        endDate: ph.endDate,
        expectedEndDate: ph.expectedEndDate,
        sales: ph.sales,
        cost: ph.cost,
        lastName: ph.engineer ? ph.engineer.lastName : '',
        firstName: ph.engineer ? ph.engineer.firstName : null,
        lastNameKana: ph.engineer ? ph.engineer.lastNameKana : null,
        firstNameKana: ph.engineer ? ph.engineer.firstNameKana : null,
        sex: ph.engineer ? ph.engineer.sex : null,
        company: ph.engineer ? ph.engineer.company : null,
      }));
  return addTableData.value ? [...t, ...addTableData.value] : t;
});

const projectInfo = computed(
  () =>
    projectList.value.find((pl) => Number(pl.id) === Number(projectId.value)) ??
    null,
);

const sumSales = computed(() =>
  tableData.value
    .filter((ph) => !selected.value.includes(ph.id))
    .reduce((sumSales: number, ph) => sumSales + ph.sales, 0),
);
const sumCost = computed(() =>
  tableData.value
    .filter((ph) => !selected.value.includes(ph.id))
    .reduce((sumCost: number, ph) => sumCost + (ph.cost ? ph.cost : 0), 0),
);
const aveCost = computed(
  () => Math.round((sumSales.value / tableData.value.length) * 10) / 10,
);
const sumProfit = computed(() => sumSales.value - sumCost.value);
const sumProfitRate = computed(() => sumProfit.value / sumSales.value);

const setProjectList = async () => {
  projectList.value = await getProject();
};

const setProjectResponse = async () => {
  projectResponse.value = await getProjectWithHistory();
};

const projectChange = (e: any) => {
  projectId.value = e.target.value;
  selected.value = [];
  addTableData.value = [];
};

const changeNotExistsIds = (notExistsIds: string[]) => {
  selected.value = notExistsIds;
};

const addTable = (addRecord: AddRecordType) => {
  if (addRecord.lastName === '') {
    return;
  }
  addTableData.value = [
    ...addTableData.value,
    {
      id: addRecord.id,
      startDate: '',
      endDate: '',
      expectedEndDate: '',
      sales: addRecord.sales,
      cost: addRecord.cost,
      lastName: addRecord.lastName,
      firstName: '',
      lastNameKana: '',
      firstNameKana: '',
      sex: null,
      company: '',
    },
  ];
};

onMounted(() => {
  setProjectList();
  setProjectResponse();
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
      :sumSales="sumSales"
      :sumProfitRate="sumProfitRate"
      :aveCost="aveCost"
    />

    <!--Divider-->
    <hr class="border-b-2 border-gray-400 my-8 mx-4" />

    <ProjectDetailTable
      :projectInfo="projectInfo"
      :tableData="tableData"
      :sumSales="sumSales"
      :sumCost="sumCost"
      :sumProfit="sumProfit"
      :sumProfitRate="sumProfitRate"
      @changeNotExistsIds="changeNotExistsIds"
    />

    <AddRecordType1 @addTable="addTable" />
  </div>
</template>
