<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ProjectHistoryResponse } from "@/@types/ApiReqRes";
import UpdateForm from "@/components/ProjectHistoryUpdate/UpdateForm.vue";
import { ProjectHistoryForm } from "@/components/ProjectHistoryUpdate/UpdateForm.vue";

const route = useRoute();
const router = useRouter();
// const engineerId = route.query.engineerId;
const projectHistoryResponse = ref<ProjectHistoryResponse>({
  id: 0,
  startDate: "",
  endDate: "",
  expectedEndDate: "",
  utilizationRate: 0,
  salesContractCompany: "",
  purchaseContractCompany: "",
  contractType: 0,
  sales: 0,
  cost: 0,
  projectId: 0,
  engineerId: 0,
});
const projectHistoryForm = computed((): ProjectHistoryForm => {
  return {
    id: projectHistoryResponse.value.id,
    startDate: projectHistoryResponse.value.startDate?.substring(0, 10),
    endDate: ((endDate) =>
      !endDate ? null : endDate.substring(0, 10))(
      projectHistoryResponse.value.endDate
    ),
    expectedEndDate: ((expectedEndDate) =>
      !expectedEndDate ? null : expectedEndDate.substring(0, 10))(
      projectHistoryResponse.value.expectedEndDate
    ),
    utilizationRate: projectHistoryResponse.value.utilizationRate,
    salesContractCompany: projectHistoryResponse.value.salesContractCompany,
    purchaseContractCompany:
      projectHistoryResponse.value.purchaseContractCompany,
    contractType: projectHistoryResponse.value.contractType,
    sales: projectHistoryResponse.value.sales,
    cost: projectHistoryResponse.value.cost,
    projectId: projectHistoryResponse.value.projectId,
    engineerId: projectHistoryResponse.value.engineerId,
  };
});
const error = ref(null);

const getProjectHistory = async () => {
  if (!route.query.projectHistoryId) return;
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/project/history/${route.query.projectHistoryId}`
    );
    console.log(response); //statusが OKか確認する。
    if (!response.ok) {
      throw Error("No data available");
    }

    const res = await response.json();
    projectHistoryResponse.value = res;
  } catch (err: any) {
    error.value = err.message;
    console.log(error.value);
  }
};

const postProjectHistory = async () => {
  const method = "POST";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body: string = JSON.stringify(projectHistoryForm.value);
  try {
    await fetch(
      `http://127.0.0.1:3000/project/history/update/${route.query.projectHistoryId}`,
      {
        method,
        headers,
        body,
      }
    );
    goEngineerDetail(projectHistoryForm.value.engineerId);
  } catch (err: any) {
    error.value = err.message;
    console.log(error.value);
  }
};

const goEngineerDetail = (engineerId: number | null) => {
  if (engineerId) {
    router.push(`/engineer-detail?engineerId=${engineerId}`);
  }
};
onMounted(() => {
  getProjectHistory();
});
</script>

<template>
  <div class="py-5 w-full h-full md:h-auto">
    <form>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 mb-6 w-full group">
          <input
            type="date"
            id="floating_startDate"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            v-model="projectHistoryForm.startDate"
            required
          />
          <label
            for="floating_startDate"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >契約開始日</label
          >
        </div>
        <div class="relative z-0 mb-6 w-full group">
          <input
            type="date"
            id="floating_expectedEndDate"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            v-model="projectHistoryForm.expectedEndDate"
          />
          <label
            for="floating_expectedEndDate"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >契約終了予定日</label
          >
        </div>

        <div class="relative z-0 mb-6 w-full group">
          <input
            type="number"
            id="floating_utilizationRate"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            v-model="projectHistoryForm.utilizationRate"
            required
          />
          <label
            for="floating_utilizationRate"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >月数</label
          >
        </div>
        <div class="relative z-0 mb-6 w-full group">
          <input
            type="date"
            id="floating_endDate"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            v-model="projectHistoryForm.endDate"
          />
          <label
            for="floating_endDate"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >契約終了日</label
          >
        </div>
        <div class="relative z-0 mb-6 w-full group">
          <input
            type="number"
            id="floating_sales"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            v-model="projectHistoryForm.sales"
            required
          />
          <label
            for="floating_sales"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >売</label
          >
        </div>
        <div class="relative z-0 mb-6 w-full group">
          <input
            type="number"
            id="floating_cost"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            v-model="projectHistoryForm.cost"
          />
          <label
            for="floating_cost"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >買</label
          >
        </div>
      </div>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="postProjectHistory"
      >
        更新
      </button>
    </form>
  </div>
</template>
