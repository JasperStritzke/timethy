<template>
  <div
      class="sidenav-button flex aspect-square justify-center items-center border-transparent border-2 rounded-xl text-2xl cursor-pointer"
      v-bind:active="active">
    <i v-bind:class="{[`ri-${iconName}-line`]: true}"/>
  </div>
</template>

<script setup lang="ts">
type Props = {
  iconName: string,
  active?: boolean,
}

withDefaults(defineProps<Props>(), {active: false});
</script>

<style lang="scss">
div.sidenav-button {
  @apply transition-colors duration-150 ease-in-out;

  &[active="true"] {
    @apply border-black;
  }

  &:not([active="true"]):hover {
    @apply bg-neutral-200 bg-opacity-90;
  }
}
</style>