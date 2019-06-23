import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toasted from "vue-toasted";
import "./plugins/vuetify";
import "./plugins/my";
import "babel-polyfill";

// css
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

// https://github.com/shakee93/vue-toasted
Vue.use(Toasted, {
  position: "top-center",
  duration: 3000,
  icon: "error_outline",
  className: "toast"
});

import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

import Buefy from "buefy";
import "buefy/dist/buefy.css";
Vue.use(Buefy);

// Loading 전역으로 component 등록
// https://vuejs.org/v2/guide/components-registration.html
const Loading = () =>
  import(/* webpackChunkName: "Header" */ "./components/Loading.vue");

Vue.component("Loading", Loading);

// https://kr.vuejs.org/v2/api/index.html
Vue.config.productionTip = false;

Vue.prototype.vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
