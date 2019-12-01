import Vue from "vue";
import Router from "vue-router";
import store from "./store";
const Home = () => import(/* webpackChunkName: "home" */ "./views/Home.vue");
const Main = () => import(/* webpackChunkName: "main" */ "./views/Main.vue");
const Test = () => import(/* webpackChunkName: "main" */ "./views/Test.vue");

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: homeGuard
    },
    {
      path: "/main",
      name: "main",
      component: Main,
      beforeEnter: loginGuard
    },
    {
      path: "/test",
      name: "test",
      component: Test
    },
    {
      path: "*",
      component: Home,
      beforeEnter: homeGuard
    }
  ]
});
function homeGuard(to, from, next) {
  if (store.getters.isLogin) {
    store.state.currentMode = "MONITOR";
    next("/main");
  } else {
    next();
  }
}

function loginGuard(to, from, next) {
  if (store.getters.isLogin) {
    if (to.path.includes("main")) {
      store.state.currentMode = "MONITOR";
    }
    next();
  } else {
    next("/");
  }
}

export default router;
