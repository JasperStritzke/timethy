<template>
  <div class="form-field" v-bind:class="{required, invalid: error && error.length > 0}">
    <div class="label__container">
      <label v-bind:for="`field-${fieldId}`" class="w-full">{{ label }}</label>
      <span class="error absolute right-0">{{ error }}</span>
    </div>
    <div class="flex flex-row">
      <slot>
        <p class="text-red-500">No input provided</p>
      </slot>
      <p class="mr-4 text-xs font-mono mt-auto mb-3" v-if="counter">{{ counterText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, toRef, watch} from "vue";
import {UiFieldRules, useUiField} from "./form.util";

interface Props {
  label: string,
  modelValue: any,
  rules?: UiFieldRules,
  required?: boolean,
  counter?: boolean | number | string,
  fieldId: number | undefined,
}

const props = withDefaults(
    defineProps<Props>(),
    {
      rules: () => []
    }
)

const modelValue = toRef(props, "modelValue")
const rules = toRef(props, "rules")

const {resetValidation, validate, error, isLazyValidation} = useUiField(modelValue, rules)

watch(modelValue, () => {
  if (!isLazyValidation?.value) {
    validate()
  }
})

const counterText = computed(() => {
  if (!props.counter) {
    return ""
  }

  switch (typeof props.counter) {
    case "string":
    case "number":
      return `${modelValue.value.length} / ${props.counter}`
    default:
      return modelValue.value.length
  }
})

defineExpose({
  resetValidation,
  validate,
})
</script>

<style lang="scss">
div.form-field {
  border-radius: var(--baseBorderRadius);
  @apply flex flex-col bg-gray-300 bg-opacity-60 transition-colors duration-75 h-16;

  .label__container {
    font-size: var(--fontSize3Xs);
    @apply flex flex-row justify-between pl-4 mr-4 pt-2 font-bold overflow-hidden relative;

    label {
      @apply opacity-100 tracking-tight text-black select-none uppercase;
    }

    .error {
      @apply text-red-500 transition-transform duration-200 translate-x-64 pointer-events-none;
    }
  }

  .input,
  input {
    @apply border-none px-4 pb-2 pt-2 tracking-tighter text-sm bg-transparent text-slate-900 flex-grow;
  }

  &.invalid {
    @apply bg-red-100 text-red-500;

    label {
      @apply text-red-600;
    }

    .error {
      @apply translate-x-0
    }
  }

  &.required {
    label::after {
      content: "*";
      @apply text-red-400 ml-1 relative -top-0.5;
    }
  }

  &:focus-within:not(.invalid) {
    @apply bg-opacity-100;

    label {
      @apply text-neutral-700;
    }
  }
}

</style>