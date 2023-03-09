<template>
  <div class="popover w-fit" v-bind:class="{[position]: true}" v-bind:data-content="content">
    <slot/>
  </div>
</template>

<script setup lang="ts">
import {toRef} from "vue";

type Props = {
  position?: "top" | "bottom" | "left" | "right";
  content: string,
}

const props = withDefaults(defineProps<Props>(), {position: "top"})

const position = toRef(props, 'position')

</script>

<style scoped>

</style>