import Vue from "vue";
import Router from "vue-router";
import store from "./store";
const Home = () => import(/* webpackChunkName: "home" */ "./views/Home.vue");
const Main = () => import(/* webpackChunkName: "main" */ "./views/Main.vue");
const PolicyTerms = () =>
  import(/* webpackChunkName: "terms" */ "./views/PolicyTerms.vue");
const PolicyPrivacy = () =>
  import(/* webpackChunkName: "privacy" */ "./views/PolicyPrivacy.vue");

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
      path: "/policy/terms",
      name: "terms",
      component: PolicyTerms
    },
    {
      path: "/policy/privacy",
      name: "privacy",
      component: PolicyPrivacy
    },
    {
      path: "/main",
      name: "main",
      component: Main
    },
    {
      path: "*",
      component: Home,
      beforeEnter: homeGuard
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
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
