<script setup lang="ts">
import { ref, onMounted } from "vue";

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
  // startDate: string;
  // endDate: string | null;
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

const projectInfo = ref<ProjectResponse>();
const data = ref<ProjectHistoryResponse[]>();
const refSumSales = ref<number>(0);
const refSumCost = ref<number>(0);
const refAveCost = ref<number>(0);
const refSumProfit = ref<number>(0);
const refSumProfitRate = ref<number>(0);
const projectId = ref<string>();
const projectList = ref<Project[]>([]);
const error = ref(null);
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
const getProjectHistory = async () => {
  try {
    const response = await fetch("../production/project/history.json");
    console.log(response); //statusが OKか確認する。
    if (!response.ok) {
      //okというプロパティがありtrue/falseで返す
      throw Error("No data available");
    }
    const json: ProjectResponse[] = await response.json();
    const project: ProjectResponse = json.find(
      (p) => String(p.projectId) === String(projectId.value)
    );
    if (!project) {
      return;
    }
    const projectHistory: ProjectHistoryResponse[] = project.projectHistory;
    projectInfo.value = project;

    const sumSales = projectHistory.reduce(
      (sumSales: number, ph) => sumSales + ph.sales,
      0
    );
    refSumSales.value = sumSales;

    const sumCost: number = projectHistory.reduce(
      (sumCost: number, ph) => sumCost + ph.cost,
      0
    );
    refSumCost.value = sumCost;
    refAveCost.value = Math.round((sumSales / projectHistory.length) * 10) / 10;

    const sumProfit = sumSales - sumCost;
    refSumProfit.value = sumProfit;

    const sumProfitRate = sumProfit / sumSales;
    refSumProfitRate.value = sumProfitRate;

    data.value = [
      ...projectHistory,
      {
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
  } catch (err: any) {
    error.value = err.message;
    console.log(error.value);
  }
};
onMounted(() => {
  getProject();
  getProjectHistory();
});
function projectChange(e: any) {
  projectId.value = e.target.value;
  getProjectHistory();
}

const thead = [
  "フルネーム",
  "カナ",
  "性別",
  "売上",
  "コスト",
  "利益",
  "利益率",
];
// const tbody = [
//   "fullName",
//   "fullNameKana",
//   "sex",
//   {
//     field: "sales",
//     fn: (data) => {
//       return `¥ ${data.sales.toLocaleString()}`;
//     },
//   },
//   "cost",
//   "profit",
//   "profitRate",
// ];
</script>

<template>
  <h1 class="text-3xl font-bold underline">
    {{ projectInfo?.projectName }}
  </h1>
  <div class="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
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

    <!--Console Content-->
    <div class="flex flex-wrap">
      <div class="w-full md:w-1/2 xl:w-1/3 p-3">
        <!--Metric Card-->
        <div class="bg-white border rounded shadow p-2">
          <div class="flex flex-row items-center">
            <div class="flex-shrink pr-4">
              <div class="rounded p-3 bg-green-600">
                <!-- <img src="../assets/briefcase.svg" alt=""> -->
                <i class="fa fa-wallet fa-2x fa-fw fa-inverse"></i>
              </div>
            </div>
            <div class="flex-1 text-right md:text-center">
              <h5 class="font-bold uppercase text-gray-500">売上</h5>
              <h3 class="font-bold text-3xl">
                ¥
                {{
                  Math.round(
                    Math.floor(refSumSales / 1000000) === 0
                      ? refSumSales / 1000
                      : refSumSales / 1000000
                  ).toLocaleString()
                }}
                {{ Math.floor(refSumSales / 1000000) === 0 ? "K" : "M" }}
                <!-- <span class="text-green-500"
                  ><i class="fas fa-caret-up"></i
                ></span> -->
              </h3>
            </div>
          </div>
        </div>
        <!--/Metric Card-->
      </div>
      <div class="w-full md:w-1/2 xl:w-1/3 p-3">
        <!--Metric Card-->
        <div class="bg-white border rounded shadow p-2">
          <div class="flex flex-row items-center">
            <div class="flex-shrink pr-4">
              <div class="rounded p-3 bg-pink-600">
                <i class="fas fa-users fa-2x fa-fw fa-inverse"></i>
              </div>
            </div>
            <div class="flex-1 text-right md:text-center">
              <h5 class="font-bold uppercase text-gray-500">利益率</h5>
              <h3 class="font-bold text-3xl">
                {{ Math.round(refSumProfitRate * 100 * 10) / 10 }} %
              </h3>
            </div>
          </div>
        </div>
        <!--/Metric Card-->
      </div>
      <div class="w-full md:w-1/2 xl:w-1/3 p-3">
        <!--Metric Card-->
        <div class="bg-white border rounded shadow p-2">
          <div class="flex flex-row items-center">
            <div class="flex-shrink pr-4">
              <div class="rounded p-3 bg-yellow-600">
                <i class="fas fa-user-plus fa-2x fa-fw fa-inverse"></i>
              </div>
            </div>
            <div class="flex-1 text-right md:text-center">
              <h5 class="font-bold uppercase text-gray-500">平均単価</h5>
              <h3 class="font-bold text-3xl">
                ¥ {{ Math.round(refAveCost)?.toLocaleString() }}
              </h3>
            </div>
          </div>
        </div>
        <!--/Metric Card-->
      </div>
    </div>

    <!--Divider-->
    <hr class="border-b-2 border-gray-400 my-8 mx-4" />

    <!-- <div class="w-full p-3"> -->
    <!--Table Card-->
    <div class="bg-white border rounded shadow">
      <div class="border-b p-3">
        <h5 class="font-bold uppercase text-gray-600">
          {{ projectInfo?.projectNameMask }} 詳細
        </h5>
      </div>
      <div class="p-5">
        <table class="w-full p-5 text-gray-700">
          <thead>
            <tr>
              <th v-for="th in thead" class="text-center text-blue-900">
                {{ th }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="dt in data">
              <td>{{ dt.lastName }} {{ dt.firstName }}</td>
              <td>{{ dt.lastNameKana }} {{ dt.firstNameKana }}</td>
              <td class="text-center">{{ dt.sex }}</td>
              <td class="text-right">¥ {{ dt.sales?.toLocaleString() }}</td>
              <td class="text-right">¥ {{ dt.cost?.toLocaleString() }}</td>
              <td class="text-right">
                ¥ {{ (dt.sales - dt.cost).toLocaleString() }}
              </td>
              <td class="text-right">
                {{
                  Math.round(((dt.sales - dt.cost) / dt.sales) * 100 * 10) / 10
                }}
                %
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--/table Card-->
  </div>

  <!-- </div> -->
</template>
