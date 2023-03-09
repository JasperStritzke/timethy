<template>
  <UiField v-bind:v-model="computedVal" v-bind="props" v-bind:field-id="id">
    <input
        v-bind:v-model="computedVal"
        v-bind:id="`field-${id}`"
        v-bind:type="type"
        v-bind:disabled="disabled"
    />
  </UiField>
</template>

<script setup lang="ts">
import UiField from "./UiField.vue";
import {computed} from "vue";
import useId from "../../hooks/useId";
import {UiFieldRules} from "./form.util";

type Props = {
  type?: "text" | "password" | "number" | "color" | "date" | "time" | "email",
  label: string,
  modelValue: any,
  rules?: UiFieldRules,
  required?: boolean,
  disabled?: boolean,
  counter?: boolean | number | string,
}

const props = withDefaults(
    defineProps<Props>(),
    {
      label: "",
      disabled: false,
      required: false,
      type: "text",
    }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const computedVal = computed({
  get() {
    return props.modelValue
  },
  set(newVal) {
    emit("update:modelValue", newVal)
  }
})

const id = useId()

</script>