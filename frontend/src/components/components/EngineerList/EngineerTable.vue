<script setup lang="ts">
import { ref } from "vue";
import { EngineerTable, EngineerInput } from "@/pages/EngineerList.vue";

defineProps<{
  engineerTableData: EngineerTable[];
}>();

const engineerInput = ref<EngineerInput>({
  lastName: "",
  firstName: "",
  lastNameKana: "",
  firstNameKana: "",
  sex: null,
  employeeId: null,
  employeeCategory: null,
  laborCost: null,
  company: "",
});

const emit = defineEmits(["postEngineer"]);
const commitEngineer = () => {
  emit("postEngineer", engineerInput.value);
  engineerInput.value = {
    lastName: "",
    firstName: "",
    lastNameKana: "",
    firstNameKana: "",
    sex: null,
    employeeId: null,
    employeeCategory: null,
    laborCost: null,
    company: "",
  };
};
</script>

<template>
  <div class="grid md:grid-cols-6 md:gap-4">
    <h5
      class="col-span-5 py-4 font-bold uppercase text-gray-600 dark:text-white"
    >
      エンジニア一覧
    </h5>
    <button
      type="button"
      class="col-span-1 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      data-modal-toggle="editUserModal"
    >
      エンジニア追加
    </button>
  </div>

  <div class="py-2 overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="py-3 px-6 text-left">所属会社</th>
          <th scope="col" class="py-3 px-6 text-left">フルネーム</th>
          <th scope="col" class="py-3 px-6 text-left">カナ</th>
          <th scope="col" class="py-3 px-6 text-center">性別</th>
          <th scope="col" class="py-3 px-6 text-center">社員区分</th>
          <th scope="col" class="py-3 px-6 text-right">労務費</th>
          <th scope="col" class="py-3 px-6 text-center"></th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="dt in engineerTableData"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <td scope="col" class="py-3 px-6">
            {{ dt.company }}
          </td>
          <td scope="col" class="py-3 px-6">
            {{ dt.fullName }}
          </td>
          <td scope="col" class="py-3 px-6">
            {{ dt.fullNameKana }}
          </td>
          <td scope="col" class="py-3 px-6 text-center">{{ dt.sex }}</td>
          <td scope="col" class="py-3 px-6 text-center">
            {{ dt.employeeCategory }}
          </td>
          <td
            scope="col"
            class="py-3 px-6 text-right font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ `${!dt.laborCost ? "-" : "¥ "}` }}
            {{ dt.laborCost?.toLocaleString() }}
          </td>

          <td class="text-center">
            <router-link
              :to="{ name: 'engineer-detail', query: { engineerId: dt.id } }"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >更新</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit user modal -->
    <div
      id="editUserModal"
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
            <!-- <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="editUserModal"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button> -->
          </div>

          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >名字</label
                >
                <input
                  type="text"
                  id="first-name"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="山田"
                  v-model="engineerInput.lastName"
                  required="true"
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >名前</label
                >
                <input
                  type="text"
                  id="first-name"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="太郎"
                  v-model="engineerInput.firstName"
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >名字（フリガナ）</label
                >
                <input
                  type="text"
                  id="first-name"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ヤマダ"
                  v-model="engineerInput.firstNameKana"
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >名前（フリガナ）</label
                >
                <input
                  type="text"
                  id="first-name"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="タロウ"
                  v-model="engineerInput.lastNameKana"
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="last-name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >性別</label
                >
                <div class="flex flex-wrap">
                  <div class="flex items-center mr-4">
                    <input
                      id="man-radio"
                      type="radio"
                      value="0"
                      name="colored-radio"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      v-model="engineerInput.sex"
                    />
                    <label
                      for="green-radio"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >男性</label
                    >
                  </div>
                  <div class="flex items-center mr-4">
                    <input
                      id="female-radio"
                      type="radio"
                      value="1"
                      name="colored-radio"
                      class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      v-model="engineerInput.sex"
                    />
                    <label
                      for="red-radio"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >女性</label
                    >
                  </div>
                </div>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >所属会社</label
                >
                <input
                  type="text"
                  id="first-name"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ニーズウェル"
                  v-model="engineerInput.company"
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="company"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >労務費</label
                >
                <input
                  type="number"
                  name="company"
                  id="company"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="500000"
                  v-model="engineerInput.laborCost"
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="company"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >社員番号</label
                >
                <input
                  type="text"
                  name="company"
                  id="company"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1234"
                  v-model="engineerInput.employeeId"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="phone-number"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >社員区分</label
                >
                <div class="flex">
                  <div class="flex items-center mr-4">
                    <input
                      id="inline-radio"
                      type="radio"
                      value="0"
                      name="inline-radio-group"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      v-model="engineerInput.employeeCategory"
                    />
                    <label
                      for="inline-radio"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >社員</label
                    >
                  </div>
                  <div class="flex items-center mr-4">
                    <input
                      id="inline-2-radio"
                      type="radio"
                      value="1"
                      name="inline-radio-group"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      v-model="engineerInput.employeeCategory"
                    />
                    <label
                      for="inline-2-radio"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >パートナー</label
                    >
                  </div>
                </div>
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
              @click="commitEngineer"
            >
              登録
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="py-5"></div>
  </div>
</template>
