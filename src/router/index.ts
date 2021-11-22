import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login/index.vue";
import Admin from "../views/Admin/index.vue";
import DashBoard from "../views/DashBoard/index.vue";
import Category from "../views/Category/index.vue";
import NotFound from "../views/Components/NotFound/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    children: [
      {
        path: "",
        name: "DashBoard",
        component: DashBoard
      },
      {
        path: "category/page/:page",
        name: "Category",
        component: Category
      }
    ],
  },
  {
    path: "/admin/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/:pathMatch(.*)",
    name: "NotFound",
    meta: {
      title: '404'
    },
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
