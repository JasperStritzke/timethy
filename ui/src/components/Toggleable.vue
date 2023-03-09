<template>
  <div  @click="val = !val">
    <div>
      <slot></slot>
    </div>
    <slot name="content" :state="val"></slot>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const val = ref(false)
</script>

<style scoped>

</style>