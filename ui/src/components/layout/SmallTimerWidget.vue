<template>
  <div class="mx-5 rounded-lg border border p-1 px-2 flex flex-row items-center gap-4">
    <div class="h-2 aspect-square bg-green-600 rounded-full animate-pulse" v-if="timer"></div>
    <div class="h-2 aspect-square bg-red-600 rounded-full" v-else></div>
    <span class="select-none font-mono">{{ rendered }}</span>
    <div class="cursor-pointer hover:opacity-75 active:scale-120 active:opacity-60" @click="toggle()">
      <i class="ri-pause-line" v-if="timer"></i>
      <i class="ri-play-line" v-else></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import useStopWatch from "../../hooks/useStopWatch";
import {onBeforeUnmount, onMounted} from "vue";

const {rendered, play, pause, timer} = useStopWatch()

function toggle() {
  if(timer.value) {
    pause()
    return
  }
  play()
}

onMounted(() => play())
onBeforeUnmount(() => pause())
</script>

<style scoped>

</style>