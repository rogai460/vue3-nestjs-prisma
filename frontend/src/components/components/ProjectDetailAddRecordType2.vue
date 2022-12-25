<script setup lang="ts">
import { ref } from "vue";
import { getRandomString } from "@/functions/CryptoUtil";
export interface AddRecordType {
  id: string;
  lastName: string;
  sales: number | null;
  cost: number | null;
}

// defineProps<{}>();

const addRecord = ref<AddRecordType>({
  id: "",
  lastName: "",
  sales: null,
  cost: null,
});

const emit = defineEmits(["addTable"]);
const addTable = () => {
  const sales: number = addRecord.value.sales ? addRecord.value.sales : 0;
  const cost: number = addRecord.value.cost ? addRecord.value.cost : 0;

  addRecord.value.id = getRandomString();
  addRecord.value.sales = sales * 10000;
  addRecord.value.cost = cost * 10000;
  emit("addTable", addRecord.value);
  addRecord.value = {
    id: "",
    lastName: "",
    sales: null,
    cost: null,
  };
};
</script>

<template>
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
        <div
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          利益率：{{
            addRecord.sales &&
            addRecord.cost &&
            addRecord.sales > 0 &&
            addRecord.cost > 0
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
</template>
