// css
// import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

// https://vuetifyjs.com/ko/framework/theme/#modifying-stylus-variables
Vue.use(Vuetify, {
  iconfont: "md",
  theme: {
    primary: "#393f45",
    secondary: "#393f45",
    accent: "#34d499",
    error: "#ff5d5d",
    info: "#2196F3",
    success: "#34d499",
    warning: "#FFC107"
  }
});
