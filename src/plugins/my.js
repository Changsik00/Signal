import Vue from "vue";
import store from "../store";

const MyPlugin = function(Vue) {
  Vue.prototype.$showToast = function(message) {
    Vue.toasted.show(`<div style="padding: 8px 0; font-size: 14px;">${message}</div>`);
  };
  Vue.prototype.$showLoading = () => {
    store.dispatch("showLoading");
  };
  Vue.prototype.$hideLoading = () => {
    store.dispatch("hideLoading");
  };
  Vue.prototype.$showSnackbar = message => {
    store.dispatch("showSnackbar", message);
  };
  Vue.prototype.$hideSnackbar = () => {
    store.dispatch("hideSnackbar");
  };
};

Vue.use(MyPlugin);
