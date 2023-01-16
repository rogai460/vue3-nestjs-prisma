<script setup lang="ts">
  import { ref } from 'vue';
  import { getRandomString } from '@/functions/CryptoUtil';

  export interface AddRecordType {
    id: string;
    lastName: string;
    sales: number;
    cost: number;
  }

  // defineProps<{}>();

  const addRecord = ref<AddRecordType>({
    id: '',
    lastName: '',
    sales: 0,
    cost: 0,
  });

  const emit = defineEmits(['addTable']);
  const addTable = () => {
    const sales: number = addRecord.value.sales ? addRecord.value.sales : 0;
    const cost: number = addRecord.value.cost ? addRecord.value.cost : 0;

    console.log(getRandomString());
    addRecord.value.id = getRandomString();
    addRecord.value.sales = sales * 10000;
    addRecord.value.cost = cost * 10000;
    emit('addTable', addRecord.value);
    addRecord.value = {
      id: '',
      lastName: '',
      sales: 0,
      cost: 0,
    };
  };
</script>

<template>
  <div class="my-4">
    <h5 class="py-4 font-bold uppercase text-gray-600 dark:text-white">レコード追加（シミレーション用）</h5>
    <div
      class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <form>
        <div class="grid md:grid-cols-5 md:gap-6">
          <div class="relative z-0 mb-6 w-full group">
            <input
              id="addName"
              v-model="addRecord.lastName"
              type="text"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="addName"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >名称</label
            >
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input
              id="addSales"
              v-model="addRecord.sales"
              type="number"
              pattern="[0-9]+"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="addSales"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >売単価（万円）</label
            >
          </div>

          <div class="relative z-0 mb-6 w-full group">
            <input
              id="addCost"
              v-model="addRecord.cost"
              type="number"
              pattern="[0-9]+"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="addCost"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >買単価（万円）</label
            >
          </div>
        </div>
        <div class="grid md:grid-cols-10 md:gap-6">
          <div class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            利益率：{{
              addRecord.sales && addRecord.cost && addRecord.sales > 0 && addRecord.cost > 0
                ? Math.round(((addRecord.sales - addRecord.cost) / addRecord.sales) * 100 * 10) / 10
                : '-'
            }}
            %
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="addTable"
          >
            追加
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
