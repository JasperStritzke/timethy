<template>
  <div class="flex-grow ml-5">
    <div class="h-18 flex flex-row items-center py-5">
      <p class="text-lg text-neutral-400">Projects</p>
      <span class="mx-4 text-lg text-neutral-300">/</span>
      <p class="text-lg">MyProjects</p>
      <UiPopover content="Yee" position="right">
        <UiButton class="btn-circle btn-transparent ml-2">
          <i class="ri-settings-2-line"></i>
        </UiButton>
      </UiPopover>
      <UiPopover content="Yee" position="right">
        <UiButton class="btn-circle btn-transparent ml-2">
          <i class="ri-refresh-line"></i>
        </UiButton>
      </UiPopover>

      <div class="flex-grow"></div>
      <small-timer-widget/>
    </div>
    <p class="popover right mt-5 inline-block" data-content="Hallo Welt">Tracker</p>
  </div>
</template>
<script setup lang="ts">
import UiButton from "../components/form/UiButton.vue";
import UiPopover from "../components/layout/UiPopover.vue";
import SmallTimerWidget from "../components/layout/SmallTimerWidget.vue";
</script>4