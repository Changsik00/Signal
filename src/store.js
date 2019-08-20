import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loadingCheckSum: 0,
    loadingTimeout: null,
    snackbar: false,
    snackbarMessage: "",
    snackbarTimeout: null,
    userToken: localStorage.getItem("access_token"),
    monitorSlideMenu: false,
    keyowrds: []
  },
  getters: {
    isLoading(state) {
      return state.loadingCheckSum > 0;
    },
    isSnackbarShow(state) {
      return state.snackbar;
    },
    getSnackbarMessage(state) {
      return state.snackbarMessage;
    },
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
    showLoading(state) {
      state.loadingCheckSum = state.loadingCheckSum + 1;
      if (state.loadingTimeout) {
        clearTimeout(state.loadingTimeout);
      }
      state.loadingTimeout = setTimeout(() => {
        state.loadingTimeout = null;
        state.loadingCheckSum = 0;
      }, 10000);
    },
    hideLoading(state) {
      state.loadingCheckSum = state.loadingCheckSum - 1;
      if (state.loadingCheckSum <= 0) {
        clearTimeout(state.loadingTimeout);
        state.loadingTimeout = null;
        state.loadingCheckSum = 0;
      }
    },
    showSnackbar(state, message) {
      state.snackbar = true;
      state.snackbarMessage = message;
      clearTimeout(state.snackbarTimeout);
      state.snackbarTimeout = setTimeout(() => {
        state.snackbar = false;
        state.snackbarMessage = "";
        state.snackbarTimeout = null;
      }, 5000);
    },
    hideSnackbar(state) {
      state.snackbar = false;
      state.snackbarMessage = "";
      clearTimeout(state.snackbarTimeout);
      state.snackbarTimeout = null;
    },
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
    showLoading({ commit }) {
      commit("showLoading");
    },
    hideLoading({ commit }) {
      commit("hideLoading");
    },
    showSnackbar({ commit }, message) {
      commit("showSnackbar", message);
    },
    hideSnackbar({ commit }) {
      commit("hideSnackbar");
    },
    login({ commit }, params) {
      // const loginApi = "/firebase/auth/";
      // axios.post(loginApi, params).then(response => {
      //   commit("setToken", response.data.access_token);
      //   router.push({ name: "main" });
      // });
      commit("setToken", params.access_token);
      router.push({ name: "main" });
    },
    logout({ commit }) {
      commit("logout");
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
