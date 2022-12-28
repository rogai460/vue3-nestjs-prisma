<script setup lang="ts">
import { ref } from "vue";
import {
  ProjectHistoryResponse,
  ProjectHistoryInput,
} from "@/pages/EngineerDetail.vue";

const props = defineProps<{
  engineerId: number;
  tableData: ProjectHistoryResponse[];
}>();
const emit = defineEmits(["postProjectHistory"]);
const commitProjectHistory = () => {
  projectHistoryInput.value.engineerId = props.engineerId;
  emit("postProjectHistory", projectHistoryInput.value);
};
const projectHistoryInput = ref<ProjectHistoryInput>({
  startDate: null,
  expectedEndDate: null,
  utilizationRate: null,
  sales: null,
  cost: null,
  engineerId: null,
  projectId: null,
});
// const dataIds = ref<string[]>([]);
// const emit = defineEmits(["changeNotExistsIds"]);
// const notExists = () => {
//   emit("changeNotExistsIds", dataIds.value);
// };
</script>

<template>
  {{ projectHistoryInput }}
  <div class="grid md:grid-cols-6 md:gap-4">
    <h5
      class="col-span-5 py-4 font-bold uppercase text-gray-600 dark:text-white"
    >
      プロジェクトヒストリー
    </h5>
    <button
      type="button"
      class="col-span-1 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      data-modal-toggle="addProjectHistoryModal"
    >
      契約追加
    </button>
  </div>
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="py-3 px-6 text-left">プロジェクト名称</th>
          <th scope="col" class="py-3 px-6 text-left">
            プロジェクト名称（マスク）
          </th>
          <th scope="col" class="py-3 px-6 text-left">エンドユーザー</th>
          <th scope="col" class="py-3 px-6 text-right">契約開始</th>
          <th scope="col" class="py-3 px-6 text-right">契約終了</th>
          <th scope="col" class="py-3 px-6 text-right">売上</th>
          <th scope="col" class="py-3 px-6 text-right">コスト</th>
          <th scope="col" class="py-3 px-6 text-right">利益</th>
          <th scope="col" class="py-3 px-6 text-right">利益率</th>
          <th scope="col" class="py-3 px-6 text-center"></th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="dt in tableData"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <td scope="col" class="py-3 px-6">
            {{ dt.project.projectName }}
          </td>
          <td scope="col" class="py-3 px-6">
            {{ dt.project.projectNameMask }}
          </td>
          <td scope="col" class="py-3 px-6">
            {{ dt.project.endUser }}
          </td>
          <td scope="col" class="py-3 px-6">
            {{ dt.project.startDate }}
          </td>
          <td scope="col" class="py-3 px-6">
            {{ dt.project.endDate }}
          </td>
          <td
            scope="col"
            class="py-3 px-6 text-right font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            ¥ {{ dt.sales?.toLocaleString() }}
          </td>
          <td
            scope="col"
            class="py-4 px-6 text-right font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            ¥ {{ dt.cost?.toLocaleString() }}
          </td>
          <td
            scope="col"
            class="py-4 px-6 text-right font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            ¥ {{ (dt.sales - dt.cost).toLocaleString() }}
          </td>
          <td
            class="py-4 px-6 text-right font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ Math.round(((dt.sales - dt.cost) / dt.sales) * 100 * 10) / 10 }}
            %
          </td>
          <td class="text-center">
            <label class="inline-flex relative items-center cursor-pointer">
              <!-- <input
                type="checkbox"
                class="sr-only peer"
                v-on:change="notExists"
                :value="dt.id"
                v-model="dataIds"
              /> -->
              <div
                class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
              />
            </label>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit user modal -->
    <div
      id="addProjectHistoryModal"
      tabindex="-1"
      aria-hidden="true"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center p-4 w-full md:inset-0 h-modal md:h-full"
    >
      <div class="relative w-full max-w-2xl h-full md:h-auto">
        <!-- Modal content -->
        <form
          action="#"
          class="relative bg-white rounded-lg shadow dark:bg-gray-700"
        >
          <!-- Modal header -->
          <div
            class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              エンジニア登録
            </h3>
          </div>

          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >プロジェクト</label
                >
                <select
                  id="projectId"
                  v-model="projectHistoryInput.projectId"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="true"
                >
                  <option selected>Choose a country</option>
                  <option value="1">Y案件</option>
                  <option value="2">Y案件</option>
                  <option value="3">U案件</option>
                  <option value="4">T案件</option>
                </select>
              </div>
              <div class="col-span-6 sm:col-span-3"></div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >開始日</label
                >
                <input
                  type="date"
                  id="startDate"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model="projectHistoryInput.startDate"
                  required="true"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >終了日</label
                >
                <input
                  type="date"
                  id="startDate"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model="projectHistoryInput.expectedEndDate"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="utilizationRate"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >人月</label
                >
                <input
                  type="number"
                  step="0.1"
                  id="utilizationRate"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1"
                  v-model="projectHistoryInput.utilizationRate"
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="sales"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >売単価</label
                >
                <input
                  type="number"
                  id="sales"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="500000"
                  v-model="projectHistoryInput.sales"
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="cost"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >買単価</label
                >
                <input
                  type="number"
                  id="cost"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="500000"
                  v-model="projectHistoryInput.cost"
                />
              </div>
            </div>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
          >
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="commitProjectHistory"
            >
              登録
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="py-5"></div>
</template>
