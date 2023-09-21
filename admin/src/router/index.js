import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Layout from "../layout/index.vue";
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/layout",
    name: "Layout",
    component: Layout,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
