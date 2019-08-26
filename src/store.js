import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import axios from "axios";
import firebase from "firebase";
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

const store = new Vuex.Store({
  state: {
    showLogin: false,
    showConnections: false,
    loadingCheckSum: 0,
    loadingTimeout: null,
    snackbar: false,
    snackbarMessage: "",
    snackbarTimeout: null,
    userToken: localStorage.getItem("access_token"),
    monitorSlideMenu: false,
    keyowrds: [],
    snsConnect: {
      facebook: false,
      facebookAccessToken: "",
      twitter: false,
      twitterTimeline: false,
      twitterAccessTotken: "",
      twitterName: "",
      twitterSecret: ""
    }
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
      state.showLogin = false;
    },
    logout(state) {
      state.userToken = null;
      state.showLogin = false;
      state.showConnections = false;
      firebase.auth().signOut();
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
    },
    twiiterConnection(state, params) {
      console.log("#@# twiiterConnection", params);
      state.snsConnect.twitter = true;
      state.snsConnect.twitterAccessTotken = params.access_token;
      state.snsConnect.twitterName = params.name;
      state.snsConnect.twitterSecret = params.secret;
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
      const loginApi = "/firebase/auth/";
      axios.post(loginApi, params).then(response => {
        commit("setToken", response.data.access_token);
        router.push({ name: "main" });
      });
    },
    logout({ commit }) {
      firebase.auth().signOut();
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
    },
    requestTwitterConnection({ commit }, params) {
      console.log("#@# requestTwitterConnection", params);
      axios.post("/twitter/users/", params).then(response => {
        console.log("#@# twiiterConnection axios", response);
        // if (response.data.success) {
        commit("twiiterConnection", params);
        // }
      });
    }
  }
});

export default store;
