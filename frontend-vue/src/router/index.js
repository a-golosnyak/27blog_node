import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
// import PostShow from "@/views/Posts/PostShow";
// import About from "../views/About";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Pages/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Pages/Register.vue"),
  },
  {
    path: "/posts/:id",
    name: "posts.show",
    props: true,
    // component: PostShow,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Posts/PostShow.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
