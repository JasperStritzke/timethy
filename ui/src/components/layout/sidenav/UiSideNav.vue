<template>
  <aside class="h-full bg-white overflow-visible flex flex-col border-r box-content">
    <router-link class="flex flex-row justify-center mt-6 pr-1 cursor-default" to="/" @dragstart.prevent>
      <Logo class="fill-black"/>
    </router-link>
    <div class="flex flex-col m-4 mt-8 flex-grow">
      <nav class="flex flex-col gap-6 flex-grow">
        <UiSideNavButton
            v-for="route in routes"
            v-bind:key="route.name"
            v-bind:icon-name="route.iconName"
            v-bind:active="route.routePattern.test(currentPath)"
            v-on:click="gotoRoute(route.target)"
            class="popover right"
            v-bind:data-content="route.name"
        />
      </nav>

      <Toggleable class="relative">
        <UiAvatar :initials="userAuth.userInitials" class="cursor-pointer"/>
        <template v-slot:content="{state}">
          <transition name="slide-y">
            <div
                class="dropdown dropdown-top flex flex-col gap-2 text-xs bg-neutral-50 border select-none"
                v-if="state"
            >
              <div class="flex flex-row items-center gap-2 hover:bg-slate-200 active:bg-slate-300 p-2 rounded transition-colors duration-150 ease-in-out">
                <i class="ri-shield-user-line text-lg"></i>
                <p>Manage profile</p>
              </div>
              <div class="w-full h-px bg-neutral-100"></div>
              <div class="flex flex-row items-center gap-2 hover:bg-slate-200 active:bg-slate-300 p-2 rounded" @click="userAuth.logout()">
                <i class="ri-logout-circle-line text-lg"></i>
                <p>Logout</p>
              </div>
            </div>
          </transition>
        </template>
      </Toggleable>
    </div>
  </aside>
</template>
<script setup lang="ts">

import Logo from "../../Logo.vue";
import UiSideNavButton from "./UiSideNavButton.vue";
import {computed, ref} from "vue";
import router from "../../../plugins/router";
import {useRoute} from "vue-router";
import UiAvatar from "./UiAvatar.vue";
import Toggleable from "../../Toggleable.vue";
import {useUserAuth} from "../../../store/auth.store";

const route = useRoute();
const currentPath = computed(() => route.path)

const userAuth = useUserAuth();

type NavRoute = {
  name: string,
  iconName: string,
  routePattern: RegExp,
  target: string,
}

const routes = ref<Array<NavRoute>>(
    [
      {
        name: "Dashboard",
        iconName: "dashboard",
        routePattern: /^\/$/,
        target: "/",
      },
      {
        name: "Tracker",
        iconName: "time",
        routePattern: /^\/tracker*/,
        target: "/tracker",
      },
      {
        name: "Projects",
        iconName: "database",
        routePattern: /^\/projects*/,
        target: "/projects",
      },
      {
        name: "Analytics",
        iconName: "bar-chart",
        routePattern: /^\/analytics*/,
        target: "/analytics",
      },
    ]
)


function gotoRoute(route: string = "/") {
  router.push(route).catch()
}
</script>

<style scoped>
aside {
  width: 5rem;
}
</style>