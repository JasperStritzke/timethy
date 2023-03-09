import "remixicon/fonts/remixicon.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./plugins/router";
import "./style/main.scss";
import {createPinia} from "pinia";

createApp(App)
    .use(router)
    .use(createPinia())
    .mount("#app");
