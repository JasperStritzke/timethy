<script setup lang="ts">
import UiButton from "../components/form/UiButton.vue";
import {ref} from "vue";
import UiTextField from "../components/form/UiTextField.vue";
import {useUiForm} from "../components/form/form.util";
import {emailRegex} from "../components/form/patterns";
import {useUserAuth} from "../store/auth.store";
import {useAlertsStore} from "../components/alert/alert.manager";

const loading = ref(false)
const validate = useUiForm(ref(false))

const userAuth = useUserAuth();

function login(e: any) {
  if (!validate()) return

  loading.value = true

  userAuth.login()
      .then(() => {
        loading.value = false
      })
      .catch(() => {
        loading.value = false
        useAlertsStore().dispatchAlert({
          message: "Invalid credentials",
          type: "error"
        })
      })
}

const email = ref("")
const password = ref("")

const emailRules = ref([
  (v: any) => !!v || "E-Mail is required",
  (v: any) => !!v && emailRegex.test(v) || "must be a valid email!"
])

const passwordRules = ref([
  (v: any) => !!v || "Password is required",
  (v: any) => !!v && v.length >= 6 || "Password must be at least 6 characters"
])

</script>

<template>
  <div class="flex flex-col justify-center items-center h-full gap-6 absolute top-0 left-0 right-0 bottom-0">
    <p>AgileBoards Login</p>
    <form class="flex flex-col gap-5 w-96" @submit.prevent="login">
      <UiTextField label="E-Mail" required type="email" v-model="email" :rules="emailRules"/>
      <UiTextField label="Password" required type="password" v-model="password" :rules="passwordRules"/>
      <a href="#/login" class="-mt-4">Forgotten password?</a>

      <UiButton class="flex-grow animate-icon btn-black btn-block" :loading="loading" type="submit">
        <span class="txt">Login</span>
        <i class="ri-arrow-right-line"></i>
      </UiButton>
    </form>
  </div>
</template>
