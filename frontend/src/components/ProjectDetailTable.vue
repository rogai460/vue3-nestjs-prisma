<script setup lang="ts">
import { ref } from "vue";
import { ProjectResponse, ProjectHistoryResponse } from "./ProjectDetail.vue";

defineProps<{
  projectInfo: ProjectResponse | null;
  tableData: ProjectHistoryResponse[];
}>();
const dataIds = ref<string[]>([]);
const emit = defineEmits(["changeNotExistsIds"]);
const notExists = () => {
  emit("changeNotExistsIds", dataIds.value);
};
</script>

<template>
  <!--Table Card-->
  <div class="bg-white border rounded shadow">
    <div class="border-b p-3">
      <h5 class="font-bold uppercase text-gray-600">
        {{ projectInfo?.projectName }} 詳細
      </h5>
    </div>
    <!-- <div class="p-5"> -->
    <div class="overflow-x-auto relative">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6 text-left">フルネーム</th>
            <th scope="col" class="py-3 px-6 text-left">カナ</th>
            <th scope="col" class="py-3 px-6 text-center">性別</th>
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
              {{ dt.lastName }} {{ dt.firstName }}
            </td>
            <td scope="col" class="py-3 px-6">
              {{ dt.lastNameKana }} {{ dt.firstNameKana }}
            </td>
            <td scope="col" class="py-3 px-6 text-center">{{ dt.sex }}</td>
            <td scope="col" class="py-3 px-6 text-right">
              ¥ {{ dt.sales?.toLocaleString() }}
            </td>
            <td scope="col" class="py-3 px-6 text-right">
              ¥ {{ dt.cost?.toLocaleString() }}
            </td>
            <td scope="col" class="py-3 px-6 text-right">
              ¥ {{ (dt.sales - dt.cost).toLocaleString() }}
            </td>
            <td class="text-right">
              {{
                Math.round(((dt.sales - dt.cost) / dt.sales) * 100 * 10) / 10
              }}
              %
            </td>
            <td class="text-center">
              <label class="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  v-on:change="notExists"
                  :value="dt.id"
                  v-model="dataIds"
                />
                <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                />
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!--/table Card-->
</template>
