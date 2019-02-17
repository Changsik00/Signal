import Vue from "vue";

const MyPlugin = function(Vue) {
  Vue.prototype.$my = {
    showToast: function(message) {
      Vue.toasted.show(message);
    }
  };
};

Vue.use(MyPlugin);
