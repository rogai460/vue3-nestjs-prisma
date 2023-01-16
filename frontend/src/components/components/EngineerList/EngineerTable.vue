<script setup lang="ts">
  import { ref } from 'vue';
  import { viewFullName, viewFullNameKana, viewSex, viewEmployeeCategory, viewLaborCost } from '@/functions/ViewUtil';
  import { EngineerResponse } from '@/functions/Repository';
  import EngineerCreateModal from '@/components/EngineerList/EngineerCreateModal.vue';

  defineProps<{
    engineerTableData: EngineerResponse[];
  }>();

  const emit = defineEmits(['postEngineer']);

  const showModal = ref<boolean>(false);
  const modalType = ref<number>(0);
  const updateData = ref<EngineerResponse | null>(null);

  const createModal = () => {
    modalType.value = 0;
    openModal();
  };
  const updateModal = (data: EngineerResponse) => {
    modalType.value = 1;
    updateData.value = data;
    openModal();
  };

  const openModal = () => {
    showModal.value = !showModal.value;
  };
  const closeModal = () => {
    modalType.value = 0;
    updateData.value = null;
    showModal.value = false;
  };
</script>

<template>
  <div class="grid md:grid-cols-6 md:gap-4">
    <h5 class="col-span-5 py-4 font-bold uppercase text-gray-600 dark:text-white">エンジニア一覧</h5>
    <button
      type="button"
      class="col-span-1 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      @click="createModal"
    >
      エンジニア追加
    </button>
    <EngineerCreateModal :show="showModal" :modal-type="modalType" :data="updateData" @closeModal="closeModal" />
  </div>

  <div class="py-2 overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="py-3 px-6 text-left">所属会社</th>
          <th scope="col" class="py-3 px-6 text-left">フルネーム</th>
          <th scope="col" class="py-3 px-6 text-left">カナ</th>
          <th scope="col" class="py-3 px-6 text-center">性別</th>
          <th scope="col" class="py-3 px-6 text-center">社員区分</th>
          <th scope="col" class="py-3 px-6 text-right">労務費</th>
          <th scope="col"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="dt in engineerTableData" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td scope="col" class="py-3 px-6">
            {{ dt.company }}
          </td>
          <td scope="col" class="py-3 px-6">
            {{ viewFullName(dt.lastName, dt.firstName) }}
          </td>
          <td scope="col" class="py-3 px-6">
            {{ viewFullNameKana(dt.lastNameKana, dt.firstNameKana) }}
          </td>
          <td scope="col" class="py-3 px-6 text-center">
            {{ viewSex(dt.sex) }}
          </td>
          <td scope="col" class="py-3 px-6 text-center">
            {{ viewEmployeeCategory(dt.employeeCategory) }}
          </td>
          <td scope="col" class="py-3 px-6 text-right font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ viewLaborCost(dt.laborCost) }}
          </td>

          <td class="text-right">
            <div class="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                @click="updateModal(dt)"
              >
                更新
              </button>

              <router-link
                :to="{
                  name: 'engineer-detail',
                  query: { engineerId: dt.id },
                }"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                <button
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                >
                  契約登録
                </button>
              </router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="py-5"></div>
  </div>
</template>
