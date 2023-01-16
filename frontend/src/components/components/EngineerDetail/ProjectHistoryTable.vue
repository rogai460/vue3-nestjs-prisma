<script setup lang="ts">
  import { ref } from 'vue';
  import ProjectHistoryCreateModal from '@/components/EngineerDetail/ProjectHistoryCreateModal.vue';
  import { EngineerResponse, ProjectHistoryResponse, ProjectHistoryPostInput } from '@/functions/Repository';

  const props = defineProps<{
    engineerId: number;
    engineerData: EngineerResponse;
    tableData: ProjectHistoryResponse[];
  }>();

  const emit = defineEmits(['postProjectHistory']);
  const postProjectHistory = (projectHistoryInput: ProjectHistoryPostInput) => {
    emit('postProjectHistory', projectHistoryInput);
  };

  const showModal = ref<boolean>(false);
  const modalType = ref<number>(0);
  const updateData = ref<ProjectHistoryResponse | null>(null);

  const createModal = () => {
    modalType.value = 0;
    openModal();
  };
  const updateModal = (data: ProjectHistoryResponse) => {
    modalType.value = 1;
    updateData.value = data;
    openModal();
  };

  const openModal = () => {
    showModal.value = !showModal.value;
  };
  const closeModal = () => {
    showModal.value = false;
  };

  const viewProfit = (sales: number | null, cost: number | null): string => {
    return sales && cost ? `¥ ${(sales - cost).toLocaleString()}` : '';
  };
  const viewProfitRate = (sales: number | null, cost: number | null): string => {
    return sales && cost ? `${Math.round(((sales - cost) / sales) * 100 * 10) / 10} %` : '';
  };
</script>

<template>
  <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
    <div class="flex flex-col py-3">
      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">所属</dt>
      <dd class="text-lg font-semibold">
        {{ engineerData?.company }}
      </dd>
    </div>
    <div class="flex flex-col pb-3">
      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">氏名</dt>
      <dd class="text-lg font-semibold">
        {{ engineerData?.lastName }}
        {{ engineerData?.firstName }}
      </dd>
    </div>

    <div class="flex flex-col pt-3">
      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">労務</dt>
      <dd class="text-lg font-semibold">
        {{ engineerData?.laborCost }}
      </dd>
    </div>
  </dl>
  <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
  <div class="grid md:grid-cols-6 md:gap-4">
    <h5 class="col-span-5 py-4 font-bold uppercase text-gray-600 dark:text-white">プロジェクトヒストリー</h5>
    <button
      type="button"
      class="col-span-1 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      @click="createModal"
    >
      契約追加
    </button>
    <ProjectHistoryCreateModal
      :engineer-id="engineerId"
      :modal-type="modalType"
      :show="showModal"
      :data="updateData"
      @postProjectHistory="postProjectHistory"
      @closeModal="closeModal"
    />
  </div>

  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="py-3 px-6 text-left">プロジェクト名称</th>
          <th scope="col" class="py-3 px-6 text-left">エンドユーザー</th>
          <th scope="col" class="py-3 px-6 text-right">契約開始</th>
          <th scope="col" class="py-3 px-6 text-right">契約終了予定</th>
          <th scope="col" class="py-3 px-6 text-right">契約終了</th>
          <th scope="col" class="py-3 px-6 text-right">売上</th>
          <th scope="col" class="py-3 px-6 text-right">コスト</th>
          <th scope="col" class="py-3 px-6 text-right">利益</th>
          <th scope="col" class="py-3 px-6 text-right">利益率</th>
          <th scope="col" class="py-3 px-6 text-center"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="dt in tableData" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td scope="col" class="py-3 px-6">{{ dt.project?.projectName }} （{{ dt.project?.projectNameMask }}）</td>
          <td scope="col" class="py-3 px-6">
            {{ dt.project?.endUser }}
          </td>
          <td scope="col" class="py-3 px-6">
            {{ dt.startDate?.substring(0, 10) }}
          </td>
          <td scope="col" class="py-3 px-6">
            {{ dt.expectedEndDate?.substring(0, 10) }}
          </td>
          <td scope="col" class="py-3 px-6">
            {{ dt.endDate?.substring(0, 10) }}
          </td>
          <td scope="col" class="py-3 px-6 text-right font-medium text-gray-900 whitespace-nowrap dark:text-white">
            ¥ {{ dt.sales?.toLocaleString() }}
          </td>
          <td scope="col" class="py-4 px-6 text-right font-medium text-gray-900 whitespace-nowrap dark:text-white">
            ¥ {{ dt.cost?.toLocaleString() }}
          </td>
          <td scope="col" class="py-4 px-6 text-right font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ viewProfit(dt.sales, dt.cost) }}
          </td>
          <td class="py-4 px-6 text-right font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ viewProfitRate(dt.sales, dt.cost) }}
          </td>
          <!-- <td class="text-center">
            <button
              type="button"
              class="col-span-1 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              @click="updateModal(dt)"
            >
              更新
            </button>
          </td> -->
          <td class="text-center">
            <router-link
              :to="{
                name: 'project-history-update',
                query: { projectHistoryId: dt.id },
              }"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >更新</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="py-5"></div>
</template>
