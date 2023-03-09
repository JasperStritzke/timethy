<template>
  <div
      class="alert px-5 py-5 flex flex-row gap-5 items-center w-96 shadow-lg select-none pointer-events-auto"
      v-bind:data-type="alert.type"
      v-on:mouseenter="stopTimer"
      v-on:mouseleave="startTimer"
  >
    <i class="text-lg pr-4 border-r border-gray-200" v-bind:class="{[`ri-${icon}-line`]: true}"></i>
    <p class="text-xs flex-grow">{{ alert.message }}</p>
    <i class="ri-close-line text-gray-500 cursor-pointer" @click="close"></i>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {ALERT_CLOSE_TIME_MS, useAlertsStore} from "./alert.manager";

const props = defineProps<{ alert: { message: string, id?: string, type: "success" | "warning" | "info" | "error" } }>()

const closeTimerRef = ref()

function startTimer() {
  closeTimerRef.value = setTimeout(close, ALERT_CLOSE_TIME_MS)
}

function stopTimer() {
  clearInterval(closeTimerRef.value)
}

onMounted(startTimer)

function close() {
  useAlertsStore().closeAlert(props.alert)
}

const icon = computed(() => {
  switch (props.alert.type) {
    default:
    case "success":
      return "checkbox-circle"
    case "warning":
      return "error-warning"
    case "error":
      return "alarm-warning"
    case "info":
      return "information"
  }
})

</script>

<style lang="scss" scoped>
div.alert {
  border-radius: var(--baseBorderRadius);

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &[data-type='success'] {
    @apply bg-green-200;

    i:not(.ri-close-line) {
      @apply text-green-600
    }
  }

  &[data-type='warning'] {
    @apply bg-orange-200;

    i:not(.ri-close-line) {
      @apply text-orange-600
    }
  }

  &[data-type='info'] {
    @apply bg-blue-200;

    i:not(.ri-close-line) {
      @apply text-black
    }
  }

  &[data-type='error'] {
    @apply bg-red-200;

    i:not(.ri-close-line) {
      @apply text-red-600 animate-pulse ;
    }
  }
}
</style>