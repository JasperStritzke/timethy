<template>
  <div>
    <slot/>
  </div>
</template>

<script setup lang="ts">
import {useUiForm} from "./form.util";
import {toRef} from "vue";

type Props = {
  lazyValidation?: boolean
}

const props = withDefaults(
    defineProps<Props>(),
    {lazyValidation: false}
)

const lazyValidation = toRef(props, "lazyValidation")

const validate = useUiForm(lazyValidation)
defineExpose({validate})
</script>
