<template>
  <AlertContainer/>
  <div class="flex flex-row h-full">
    <transition name="slide-x">
      <UiSideNav v-if="isLoggedIn"/>
    </transition>
    <div class="flex-grow">
      <RouterView v-slot="{ Component }">
        <transition name="slide-y" mode="out-in" v-if="Component">
          <Component :is="Component"/>
        </transition>
      </RouterView>
    </div>
  </div>
</template>
<script setup lang="ts">
import AlertContainer from "./components/alert/AlertContainer.vue";
import UiSideNav from "./components/layout/sidenav/UiSideNav.vue";
import {useUserAuth} from "./store/auth.store";
import {storeToRefs} from "pinia";

const {isLoggedIn} = storeToRefs(useUserAuth());
</script>