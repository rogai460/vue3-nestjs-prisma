<script setup lang="ts">
import { ref } from 'vue';
import { ProjectResponse } from '@/functions/Repository';

defineProps<{
  projectInfo: ProjectResponse | null;
  tableData: any;
  sumSales: number;
  sumCost: number;
  sumProfit: number;
  sumProfitRate: number;
}>();
const dataIds = ref<string[]>([]);

const viewProfit = (sales: number | null, cost: number | null): string => {
  return sales && cost ? `¥ ${(sales - cost).toLocaleString()}` : '';
};
const viewProfitRate = (sales: number | null, cost: number | null): string => {
  return sales && cost
    ? `${Math.round(((sales - cost) / sales) * 100 * 10) / 10} %`
    : '';
};
const emit = defineEmits(['changeNotExistsIds']);
const notExists = () => {
  emit('changeNotExistsIds', dataIds.value);
};
</script>

<template>
  <h5 class="py-4 font-bold uppercase text-gray-600 dark:text-white">
    {{ projectInfo?.projectName }} 詳細
  </h5>
  <!--Table Card-->
  <!-- <div class="bg-white border rounded shadow">
    <div class="border-b p-3">
      <h5 class="font-bold uppercase text-gray-600">
        {{ projectInfo?.projectName }} 詳細
      </h5>
    </div> -->
  <!-- <div class="p-5"> -->
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="py-3 px-6 text-left">フルネーム</th>
          <th scope="col" class="py-3 px-6 text-left">カナ</th>
          <th scope="col" class="py-3 px-6 text-center">性別</th>
          <th scope="col" class="py-3 px-6 text-left">契約開始</th>
          <th scope="col" class="py-3 px-6 text-left">契約終了予定</th>
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
          <td scope="col" class="py-3 px-6">
            {{ dt.startDate?.substring(0, 10) }}
          </td>
          <td scope="col" class="py-3 px-6">
            {{ dt.expectedEndDate?.substring(0, 10) }}
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
            {{ viewProfit(dt.sales, dt.cost) }}
          </td>
          <td
            class="py-4 px-6 text-right font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ viewProfitRate(dt.sales, dt.cost) }}
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
      <tfoot>
        <tr class="font-semibold text-gray-900 dark:text-white">
          <th scope="row" class="py-3 px-6 text-base">Total</th>
          <td class="py-3 px-6"></td>
          <td class="py-3 px-6"></td>
          <td class="py-3 px-6"></td>
          <td class="py-3 px-6"></td>
          <td class="py-3 px-6 text-right">
            ¥ {{ sumSales.toLocaleString() }}
          </td>
          <td class="py-3 px-6 text-right">¥ {{ sumCost.toLocaleString() }}</td>
          <td class="py-3 px-6 text-right">
            ¥ {{ sumProfit.toLocaleString() }}
          </td>
          <td class="py-3 px-6 text-right">
            {{ viewProfitRate(sumSales, sumCost) }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
  <!-- </div> -->
  <!--/table Card-->
</template>
