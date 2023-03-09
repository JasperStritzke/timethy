import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    name: "Login",
    path: "/login",
    component: () => import("../../views/Login.vue"),
  },
  {
    name: "Sign",
    path: "/signup",
    component: () => import("../../views/Login.vue"),
  },
  {
    name: "Tracker",
    path: "/tracker",
    component: () => import("../../views/Tracker.vue"),
  },
  {
    name: "Dashboard",
    path: "/",
    component: () => import("../../views/Dashboard.vue")
  },
  {
    name: "Projects",
    path: "/projects",
    component: () => import("../../views/Projects.vue"),
  },
  {
    name: "Analytics",
    path: "/analytics",
    component: () => import("../../views/Analytics.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
