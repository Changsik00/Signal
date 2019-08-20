import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toasted from "vue-toasted";
import VeeValidate from "vee-validate";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import VueObserveVisibility from "vue-observe-visibility";
import firebase from "firebase";
import "./plugins/vuetify";
import "./plugins/axios";
import "./plugins/my";

var firebaseConfig = {
  apiKey: "AIzaSyCo8MlwzJ_FMuWCbhhhaHpaGluLfX7hTak",
  authDomain: "signal-97eaf.firebaseapp.com",
  databaseURL: "https://signal-97eaf.firebaseio.com",
  projectId: "signal-97eaf",
  storageBucket: "signal-97eaf.appspot.com",
  messagingSenderId: "493631048995",
  appId: "1:493631048995:web:5a51cbfc53a696cb"
};
firebase.initializeApp(firebaseConfig);

// https://github.com/shakee93/vue-toasted
Vue.use(Toasted, {
  position: "top-center",
  duration: 3000,
  icon: "error_outline",
  className: "toast"
});

Vue.use(VeeValidate);
Vue.use(Buefy);
Vue.use(VueObserveVisibility);

// Loading 전역으로 component 등록
// https://vuejs.org/v2/guide/components-registration.html
const Loading = () =>
  import(/* webpackChunkName: "Header" */ "./components/Loading.vue");
const Snackbar = () =>
  import(/* webpackChunkName: "Snackbar" */ "./components/Snackbar.vue");

Vue.component("Loading", Loading);
Vue.component("Snackbar", Snackbar);

// https://kr.vuejs.org/v2/api/index.html
Vue.config.productionTip = false;

Vue.prototype.vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
