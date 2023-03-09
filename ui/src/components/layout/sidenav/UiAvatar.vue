<template>
  <div class="aspect-square w-full bg-black rounded-full flex justify-center items-center shadow select-none">
    <span class="text-white font-mono">{{ initials }}</span>
  </div>
</template>

<script setup lang="ts">
type Props = {
  initials?: string
}

withDefaults(defineProps<Props>(), {initials: "?"})
</script>
