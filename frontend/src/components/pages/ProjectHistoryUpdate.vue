<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import {
    getProjectHistory,
    ProjectHistoryResponse,
    updateProjectHistory,
    ProjectHistoryForm,
  } from '@/functions/Repository';

  const route = useRoute();
  const router = useRouter();
  const projectHistoryResponse = ref<ProjectHistoryResponse>({
    id: 0,
    startDate: '',
    endDate: '',
    expectedEndDate: '',
    utilizationRate: 0,
    salesContractCompany: '',
    purchaseContractCompany: '',
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
      endDate: ((endDate) => (!endDate ? null : endDate.substring(0, 10)))(projectHistoryResponse.value.endDate),
      expectedEndDate: ((expectedEndDate) => (!expectedEndDate ? null : expectedEndDate.substring(0, 10)))(
        projectHistoryResponse.value.expectedEndDate,
      ),
      utilizationRate: projectHistoryResponse.value.utilizationRate,
      salesContractCompany: projectHistoryResponse.value.salesContractCompany,
      purchaseContractCompany: projectHistoryResponse.value.purchaseContractCompany,
      contractType: projectHistoryResponse.value.contractType,
      sales: projectHistoryResponse.value.sales,
      cost: projectHistoryResponse.value.cost,
      projectId: projectHistoryResponse.value.projectId,
      engineerId: projectHistoryResponse.value.engineerId,
    };
  });

  const reloadProjectHistoryResponse = async () => {
    projectHistoryResponse.value = await getProjectHistory(String(route.query.projectHistoryId));
  };

  const postProjectHistory = async () => {
    await updateProjectHistory(String(route.query.projectHistoryId), projectHistoryForm.value);

    goEngineerDetail(projectHistoryForm.value.engineerId);
  };

  const goEngineerDetail = (engineerId: number | null) => {
    if (engineerId) {
      router.push(`/engineer-detail?engineerId=${engineerId}`);
    }
  };
  onMounted(() => {
    reloadProjectHistoryResponse();
  });
</script>

<template>
  <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
    <div class="flex flex-col py-3">
      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">所属</dt>
      <dd class="text-lg font-semibold">
        {{ projectHistoryResponse.engineer?.company }}
      </dd>
    </div>
    <div class="flex flex-col pb-3">
      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">氏名</dt>
      <dd class="text-lg font-semibold">
        {{ projectHistoryResponse.engineer?.lastName }}
        {{ projectHistoryResponse.engineer?.firstName }}
      </dd>
    </div>

    <div class="flex flex-col pt-3">
      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">労務</dt>
      <dd class="text-lg font-semibold">
        {{ projectHistoryResponse.engineer?.laborCost }}
      </dd>
    </div>
  </dl>

  <div class="py-5 w-full h-full md:h-auto">
    <form>
      <div class="grid md:grid-cols-3 md:gap-6">
        <div class="relative z-0 mb-6 w-full group">
          <label for="projectId" class="sr-only">案件</label>
          <select
            id="projectId"
            v-model="projectHistoryForm.projectId"
            class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected>Choose a project</option>
            <option value="1">Y案件</option>
            <option value="101">Y案件</option>
            <option value="102">U案件</option>
            <option value="103">T案件</option>
          </select>
        </div>
        <div />
        <div />
        <div class="relative z-0 mb-6 w-full group">
          <input
            id="floating_startDate"
            v-model="projectHistoryForm.startDate"
            type="date"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
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
            id="floating_expectedEndDate"
            v-model="projectHistoryForm.expectedEndDate"
            type="date"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            for="floating_expectedEndDate"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >契約終了予定日</label
          >
        </div>

        <div class="relative z-0 mb-6 w-full group">
          <input
            id="floating_endDate"
            v-model="projectHistoryForm.endDate"
            type="date"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            for="floating_endDate"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >契約終了日</label
          >
        </div>
        <div class="relative z-0 mb-6 w-full group">
          <input
            id="floating_utilizationRate"
            v-model="projectHistoryForm.utilizationRate"
            type="number"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
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
            id="floating_sales"
            v-model="projectHistoryForm.sales"
            type="number"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
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
            id="floating_cost"
            v-model="projectHistoryForm.cost"
            type="number"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            for="floating_cost"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >コスト</label
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
