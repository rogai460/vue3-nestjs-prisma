<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { ProjectHistoryResponse, ProjectHistoryPostInput } from '@/functions/Repository';

// type Props = {
//   show: boolean;
//   modalType: number;
//   engineerId: number;
// };
const props = defineProps<{
  show: boolean;
  modalType: number;
  engineerId: number;
  data: ProjectHistoryResponse | null;
}>();
// const props = withDefaults(defineProps<Props>(), {
//   show: false,
//   modalType: 0,
//   engineerId: 0,
// });

const emit = defineEmits(['closeModal', 'postProjectHistory']);
const commitProjectHistory = () => {
  emit('postProjectHistory', projectHistoryInput.value);
  emit('closeModal');
};

const initProjectHistoryInput = {
  startDate: null,
  endDate: null,
  expectedEndDate: null,
  utilizationRate: null,
  salesContractCompany: null,
  purchaseContractCompany: null,
  contractType: null,
  cost: null,
  sales: null,
  projectId: 0,
  engineerId: Number(props.engineerId),
};
const projectHistoryInput = ref<ProjectHistoryPostInput>(initProjectHistoryInput);

const showModal = ref<boolean>(false);
watch(
  () => props.show,
  (show) => {
    showModal.value = show;
  },
);
onMounted(() => {
  projectHistoryInput.value = initProjectHistoryInput;
});
</script>

<template>
  <teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="showModal" ref="modal-backdrop" class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50">
        <div
          ref="modal"
          class="flex items-start justify-center min-h-screen pt-24"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="relative w-full max-w-2xl h-full md:h-auto">
            <!-- Modal content -->
            <form action="#" class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <!-- Modal header -->
              <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 v-if="modalType == 0" class="text-xl font-semibold text-gray-900 dark:text-white">
                  ??????????????????????????????
                </h3>
                <h3 v-if="modalType == 1" class="text-xl font-semibold text-gray-900 dark:text-white">
                  ??????????????????????????????
                </h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  @click="$emit('closeModal')"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>

              <!-- Modal body -->
              <div class="p-6 space-y-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">??????????????????</label>
                    <select
                      id="projectId"
                      v-model="projectHistoryInput.projectId"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>Choose a country</option>
                      <option value="1">Y??????</option>
                      <option value="101">Y??????</option>
                      <option value="102">U??????</option>
                      <option value="103">T??????</option>
                    </select>
                    <!-- <input
                      type="text"
                      id="projectId"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      v-model="projectHistoryInput.projectId"
                    /> -->
                  </div>
                  <div class="col-span-6 sm:col-span-3"></div>

                  <div class="col-span-6 sm:col-span-3">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">?????????</label>
                    <input
                      id="startDate"
                      v-model="projectHistoryInput.startDate"
                      type="date"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">???????????????</label>
                    <input
                      id="expectedEndDate"
                      v-model="projectHistoryInput.expectedEndDate"
                      type="date"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="utilizationRate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >??????</label
                    >
                    <input
                      id="utilizationRate"
                      v-model="projectHistoryInput.utilizationRate"
                      type="number"
                      step="0.1"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="1"
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label for="sales" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >?????????</label
                    >
                    <input
                      id="sales"
                      v-model="projectHistoryInput.sales"
                      type="number"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="500000"
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label for="cost" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >?????????</label
                    >
                    <input
                      id="cost"
                      v-model="projectHistoryInput.cost"
                      type="number"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="500000"
                    />
                  </div>
                </div>
              </div>

              <!-- Modal footer -->
              <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  @click="commitProjectHistory"
                >
                  ??????
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
