// https://github.com/axios/axios
// https://github.com/imcvampire/vue-axios

import Vue from "vue";
import axios from "axios";
import store from "../store";

Vue.prototype.$axios = axios;

axios.defaults.timeout = 15000;
axios.defaults.baseURL = "https://api.signal.bz/v1";

function axisoErrorHandler(error) {
  store.dispatch("showSnackbar", error);
  store.dispatch("hideLoading");
  console.log("#@# Axios", error);
  return Promise.reject(error.response);
}

axios.interceptors.request.use(
  config => {
    store.dispatch("showLoading");
    return config;
  },
  error => {
    return axisoErrorHandler(error);
  }
);

axios.interceptors.response.use(
  response => {
    store.dispatch("hideLoading");
    return response;
  },
  error => {
    return axisoErrorHandler(error);
  }
);
