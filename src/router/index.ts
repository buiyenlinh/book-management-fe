import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Index from "../views/PageForUser/index.vue";
import Login from "../views/Login/index.vue";
import Admin from "../views/Admin/index.vue";
import DashBoard from "../views/DashBoard/index.vue";
import Category from "../views/Category/index.vue";
import Book from "../views/Book/index.vue";
import User from "../views/User/index.vue";
import NotFound from "../views/Components/NotFound/index.vue";
import Profile from "../views/Profile/index.vue";
import Author from "../views/Author/index.vue";
import Home from "../views/PageForUser/Home/index.vue";
import Introduce from "../views/PageForUser/Introduce/index.vue";
import UserBook from "../views/PageForUser/Books/index.vue";
import UserCategory from "../views/PageForUser/Category/index.vue";
import UserDetailBook from "../views/PageForUser/Detail/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: Index,
    children: [
      {
        path: "",
        name: "Home",
        component: Home
      },
      {
        path: "gioi-thieu",
        name: "Introduce",
        component: Introduce
      },
      {
        path: "sach/trang/:page(\\d+)",
        name: "UserBook",
        component: UserBook
      },
      {
        path: "danh-muc/:name/:id(\\d+)/trang/:page(\\d+)",
        name: "UserCategory",
        component: UserCategory
      },
      {
        path: "chi-tiet/:name/:id(\\d+)",
        name: "UserDetailBook",
        component: UserDetailBook,
      }
    ]
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
        path: "category/page/:page(\\d+)",
        name: "Category",
        component: Category
      },
      {
        path: "book/page/:page(\\d+)",  
        name: "Book",
        component: Book
      },
      {
        path: "author/page/:page(\\d+)",  
        name: "Author",
        component: Author
      },
      {
        path: "user/page/:page(\\d+)",  
        name: "User",
        component: User
      },
      {
        path: "profile",  
        name: "Profile",
        component: Profile
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
