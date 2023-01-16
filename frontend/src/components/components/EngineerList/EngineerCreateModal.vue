<script setup lang="ts">
  import { ref, onMounted, watch, computed } from 'vue';
  import { EngineerResponse, createEngineer, updateEngineer, EngineerInput } from '@/functions/Repository';

  const props = defineProps<{
    show: boolean;
    modalType: number;
    data: EngineerResponse | null;
  }>();

  const engineerInput = ref<EngineerInput>();
  const engineerInputBind = computed<EngineerInput>({
    get() {
      if (props.data && props.modalType == 1) {
        engineerInput.value = {
          lastName: props.data.lastName ?? '',
          firstName: props.data.firstName ?? '',
          lastNameKana: props.data.lastNameKana ?? '',
          firstNameKana: props.data.firstNameKana ?? '',
          sex: props.data.sex ?? null,
          employeeId: props.data.employeeId ?? null,
          employeeCategory: props.data.employeeCategory ?? null,
          laborCost: props.data.laborCost ?? null,
          company: props.data.company ?? '',
        };
      } else {
        engineerInput.value = {
          lastName: '',
          firstName: '',
          lastNameKana: '',
          firstNameKana: '',
          sex: null,
          employeeId: null,
          employeeCategory: null,
          laborCost: null,
          company: '',
        };
      }
      return engineerInput.value;
    },
    set(value) {
      engineerInput.value = value;
    },
  });

  const postCreateEngineer = async () => {
    await createEngineer(engineerInputBind.value);
    // reloadEngineerResponse();
    emit('closeModal');
  };

  const postUpdateEngineer = async () => {
    const engineerId = Number(props.data?.id);
    if (!engineerId) {
      return;
    }
    await updateEngineer(engineerId, engineerInputBind.value);
    // reloadEngineerResponse();
    emit('closeModal');
  };

  const emit = defineEmits(['closeModal']);
  // const commitProjectHistory = () => {
  //   emit('postProjectHistory', projectHistoryInput.value);
  //   emit('closeModal');
  // };

  const showModal = ref<boolean>(false);

  watch(
    () => props.show,
    (show) => {
      showModal.value = show;
    },
  );
  onMounted(() => {
    // projectHistoryInput.value = initProjectHistoryInput;
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
                  エンジニア登録
                </h3>
                <h3 v-if="modalType == 1" class="text-xl font-semibold text-gray-900 dark:text-white">
                  エンジニア更新
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
              {{ engineerInputBind }}
              <div class="p-6 space-y-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">名字</label>
                    <input
                      id="first-name"
                      v-model="engineerInputBind.lastName"
                      type="text"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="山田"
                      required="true"
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">名前</label>
                    <input
                      id="first-name"
                      v-model="engineerInputBind.firstName"
                      type="text"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="太郎"
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">名字（フリガナ）</label>
                    <input
                      id="first-name"
                      v-model="engineerInputBind.firstNameKana"
                      type="text"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="ヤマダ"
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">名前（フリガナ）</label>
                    <input
                      id="first-name"
                      v-model="engineerInputBind.lastNameKana"
                      type="text"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="タロウ"
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">性別</label>

                    <div class="flex flex-wrap">
                      <div class="flex items-center mr-4">
                        <input
                          id="man-radio"
                          v-model="engineerInputBind.sex"
                          type="radio"
                          value="0"
                          name="sex-radio"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label for="man-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >男性</label
                        >
                      </div>
                      <div class="flex items-center mr-4">
                        <input
                          id="female-radio"
                          v-model="engineerInputBind.sex"
                          type="radio"
                          value="1"
                          name="sex-radio"
                          class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label for="red-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >女性</label
                        >
                      </div>
                    </div>
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">所属会社</label>
                    <input
                      id="first-name"
                      v-model="engineerInputBind.company"
                      type="text"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="ニーズウェル"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >社員番号</label
                    >
                    <input
                      id="company"
                      v-model="engineerInputBind.employeeId"
                      type="text"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="1234"
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label for="inline-radio-group" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >社員区分</label
                    >

                    <div class="flex">
                      <div class="flex items-center mr-4">
                        <input
                          id="inline-radio"
                          v-model="engineerInputBind.employeeCategory"
                          name="employee-radio"
                          type="radio"
                          value="0"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label for="inline-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >社員</label
                        >
                      </div>
                      <div class="flex items-center mr-4">
                        <input
                          id="inline-2-radio"
                          v-model="engineerInputBind.employeeCategory"
                          name="employee-radio"
                          type="radio"
                          value="1"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label for="inline-2-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >パートナー</label
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <div v-if="engineerInputBind.employeeCategory == 0" class="col-span-6 sm:col-span-3">
                      <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >労務費</label
                      >
                      <input
                        id="company"
                        v-model="engineerInputBind.laborCost"
                        type="number"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="500000"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <!-- Modal footer -->
              <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  v-if="modalType == 0"
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  @click="postCreateEngineer"
                >
                  登録
                </button>
                <button
                  v-if="modalType == 1"
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  @click="postUpdateEngineer"
                >
                  更新
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
