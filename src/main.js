import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

// Header, Footer 전역으로 component 등록
const Header = () =>
  import(/* webpackChunkName: "Header" */ "./components/Header.vue");
const Footer = () =>
  import(/* webpackChunkName: "Header" */ "./components/Footer.vue");

//https://vuejs.org/v2/guide/components-registration.html
Vue.component("Header", Header);
Vue.component("Footer", Footer);

// https://kr.vuejs.org/v2/api/index.html
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
