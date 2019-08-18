import Vue from "vue";
import Vuex from "vuex";
import VueAxios from "vue-axios";
import axios from "axios";
import firebase from "firebase";
import router from "./router";

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

Vue.use(Vuex);
Vue.use(VueAxios, axios);

// https://github.com/axios/axios
axios.defaults.timeout = 10000;
axios.defaults.baseURL = "https://api.signal.bz/v1";

axios.interceptors.request.use(config => {
  store.dispatch("showLoading");
  return config;
});

axios.interceptors.response.use(
  response => {
    store.dispatch("hideLoading");
    return response;
  },
  error => {
    // Vue.toasted.show("axios error");
    console.log("#@# Axios Error", error);
    return Promise.reject(error.response);
  }
);

const store = new Vuex.Store({
  state: {
    loading: false,
    userToken: localStorage.getItem("access_token"),
    monitorSlideMenu: false,
    keyowrds: []
  },
  getters: {
    isLogin(state) {
      return state.userToken != null && state.userToken.length > 0;
    },
    getKeywords(state) {
      return state.keyowrds;
    },
    monitorSlideMenu(state) {
      return state.monitorSlideMenu;
    }
  },
  mutations: {
    setToken(state, userToken) {
      localStorage.setItem("access_token", userToken);
      state.userToken = userToken;
    },
    logout(state) {
      state.userToken = null;
      localStorage.setItem("access_token", "");
      router.push({ name: "home" });
    },
    setKeywords(state, keyowrds) {
      state.keyowrds = keyowrds;
    },
    addKeyword(state, keyword) {
      state.keyowrds.push(keyword);
    },
    removeKeyword(state, keyword) {
      state.keyowrds = _.filter(state.keyowrds, d => d != keyword);
    },
    setLoading(state, visible) {
      state.loading = visible;
      setTimeout(() => (state.loading = false), 10000);
    },
    showMonitorSlideMenu(state) {
      state.monitorSlideMenu = true;
    },
    hideMonitorSlideMenu(state) {
      state.monitorSlideMenu = false;
    }
  },
  actions: {
    login({ commit }, params) {
      const loginApi = "/firebase/auth/";
      Vue.axios.post(loginApi, params).then(response => {
        commit("setToken", response.data.access_token);
        router.push({ name: "main" });
      });
    },
    logout({ commit }) {
      commit("logout");
    },
    showLoading({ commit }) {
      commit("setLoading", true);
    },
    hideLoading({ commit }) {
      commit("setLoading", false);
    },
    setKeywords({ commit }) {
      const testKeywords = ["bts", "노노재팬"];
      commit("setKeywords", testKeywords);
    },
    addKeyword({ commit }, keyword) {
      commit("addKeyword", keyword);
    },
    removeKeyword({ commit }, keyword) {
      commit("removeKeyword", keyword);
    }
  }
});

export default store;
