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
import UserAuthor from "../views/PageForUser/Author/index.vue"
import UserAuthorList from "../views/PageForUser/Author/AuthorList.vue"
import UserBookAuthor from "../views/PageForUser/Author/BookOfAuthor.vue"
import UserDetailBookContent from "../views/PageForUser/Detail/Content.vue"
import UserLogin from "../views/PageForUser/Login/index.vue"
import UserRegister from "../views/PageForUser/Register/index.vue"
import UserProfile from "../views/PageForUser/Profile/index.vue"

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
        path: "tac-gia",
        name: "UserAuthor",
        component: UserAuthor,
        children: [
          {
            path: "trang-:page(\\d+)",
            name: "UserAuthorList",
            component: UserAuthorList,
          },
          {
            path: ":name/trang-:page(\\d+)",
            name: "UserBookAuthor",
            component: UserBookAuthor,
          }
        ]
      },
      {
        path: "sach/trang-:page(\\d+)",
        name: "UserBook",
        component: UserBook
      },
      {
        path: "danh-muc/:name/trang-:page(\\d+)",
        name: "UserCategory",
        component: UserCategory
      },
      {
        path: "chi-tiet/:name",
        name: "UserDetailBook",
        component: UserDetailBook,
        children: [
          {
            path: ':content',
            name: 'UserDetailBookContent',
            component: UserDetailBookContent
          }
        ]
      },
      {
        path: "ca-nhan",
        name: "UserProfile",
        component: UserProfile
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
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/admin/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/login",
    name: "UserLogin",
    component: UserLogin
  },
  {
    path: "/register",
    name: "UserRegister",
    component: UserRegister
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

router.beforeEach(async (to, from) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth) {
    if (!token) {
      return { name: "Login" };
    }
  }
})

export default router;
