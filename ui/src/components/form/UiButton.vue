<template>
  <button
      class="btn"
      v-bind:class="{loading}"
  >
    <slot/>
    <span class="ri-loader-3-line loading-icon"></span>
  </button>
</template>
<script setup lang="ts">
type Props = {
  loading?: boolean
}

withDefaults(
    defineProps<Props>(),
    {
      loading: false,
    }
);
</script>
<style lang="scss">
button.btn {
  border-radius: var(--baseBorderRadius);
  @apply font-bold flex justify-center items-center px-4 py-2 gap-2 text-sm overflow-hidden relative text-neutral-900 opacity-100 select-none transition-colors duration-75;

  i {
    @apply text-xl font-medium duration-75 transition-all;
  }

  &.animate-icon i {
    @apply transition-all duration-150;
  }

  &.animate-icon:hover i {
    @apply translate-x-1;
  }

  &.btn-black {
    @apply bg-neutral-900 text-white focus:bg-neutral-700 hover:bg-neutral-700 active:bg-neutral-600;

    &.loading {
      @apply bg-neutral-300;

      .loading-icon {
        @apply text-black bg-opacity-80;
      }
    }
  }

  &.btn-circle {
    @apply aspect-square rounded-full p-3;
  }

  &.btn-transparent {
    &:hover {
      @apply bg-neutral-200 bg-opacity-75;
    }

    &:active {
      @apply bg-opacity-100;
    }
  }

  &.btn-outlined {
    @apply border-2 border-neutral-900 bg-white focus:bg-neutral-100 hover:bg-neutral-100 active:bg-neutral-200;
  }

  &.btn-variant {
    @apply bg-gray-200
  }

  &.btn-block {
    @apply py-3 px-6;
  }

  .loading-icon {
    transform: scale(0) rotateZ(0);
    @apply fixed opacity-0 text-2xl transition-all duration-200;
  }

  &.loading {
    & {
      @apply cursor-none pointer-events-none;
    }

    i {
      @apply transition-none;
    }

    .loading-icon {
      transform: scale(1) rotateZ(0deg);
      animation: loadingIconFadeIn 1s infinite linear;

      @keyframes loadingIconFadeIn {
        from {
          transform: scale(1) rotateZ(0deg);
        }
        to {
          transform: scale(1) rotateZ(360deg);
        }
      }

      @apply opacity-60 scale-100 font-bold;
    }

    & > *:not(.loading-icon) {
      @apply transition-all opacity-0 duration-150 ease-in-out;
    }
  }
}
</style>
