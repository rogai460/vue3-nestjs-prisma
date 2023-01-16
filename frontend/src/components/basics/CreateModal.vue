<script setup lang="ts">
  import { ref, watch } from 'vue';

  interface Props {
    show?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    show: false,
  });
  const emit = defineEmits(['closeModal']);
  const showModal = ref<boolean>(false);
  watch(
    () => props.show,
    (show) => {
      showModal.value = show;
    },
  );
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
        <div class="flex items-start justify-center min-h-screen pt-24 text-center">
          <div
            ref="modal"
            class="bg-white rounded-lg text-left overflow-hidden shadow-xl p-8 w-1/2"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">エンジニア登録</h3>
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
            Awiwi {{ showModal }}
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
