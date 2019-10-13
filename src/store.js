import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import axios from "axios";
import firebase from "firebase";
import { stat } from "fs";
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
    userId: localStorage.getItem("id"),
    userToken: localStorage.getItem("access_token"),
    monitorSlideMenu: false,
    feeds: [],
    snsConnect: {
      facebook: localStorage.getItem("facebook"),
      twitter: localStorage.getItem("twitter")
    },
    FEED_TYPE: {
      NAVER_KEY_WORD: "NAVER_KEY_WORD",
      TWITTER_KEY_WORD: "TWITTER_KEY_WORD",
      TWITTER_TIMELINE: "TWITTER_TIMELINE",
      TWITTER_MENTIONS: "TWITTER_MENTIONS",
      FACEBOOK_POSTS: "FACEBOOK_POSTS",
      FACEBOOK_MENTIONS: "FACEBOOK_MENTIONS",
      FACEBOOK_SEARCH: "FACEBOOK_SEARCH"
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
    getNaverKeywords(state) {
      return state.feeds.filter(d => d.type == "NAVER_KEY_WORD");
    },
    getTwitterKeywords(state) {
      return state.feeds.filter(d => d.type == "TWITTER_KEY_WORD");
    },
    getFeeds(state) {
      if (state.feeds == null || state.feeds == "") {
        return [];
      }
      return state.feeds;
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
    showMonitorSlideMenu(state) {
      state.monitorSlideMenu = true;
    },
    hideMonitorSlideMenu(state) {
      state.monitorSlideMenu = false;
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
    login(state, data) {
      localStorage.setItem("id", data.login_id);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("facebook", data.facebook);
      localStorage.setItem("twitter", data.twitter);
      state.userId = data.login_id;
      state.userToken = data.access_token;
      state.snsConnect.facebook = data.facebook;
      state.snsConnect.twitter = data.twitter;
      state.showLogin = false;
      if (data.feed_list) state.feeds = JSON.parse(data.feed_list);
    },
    logout(state) {
      state.userToken = null;
      state.showLogin = false;
      state.showConnections = false;
      firebase.auth().signOut();
      localStorage.setItem("id", "");
      localStorage.setItem("access_token", "");
      localStorage.setItem("facebook", "");
      localStorage.setItem("twitter", "");
      router.push({ name: "home" });
    },
    removeFeed(state, feed) {
      state.feeds = _.filter(
        state.feeds,
        d => !(d.data == feed.data && d.type == feed.type)
      );
    },
    addFeed(state, feed) {
      state.feeds.push(feed);
      // localStorage.setItem("feeds", JSON.stringify(state.feeds));
    },
    twiiterConnection(state, params) {
      state.snsConnect.twitter = true;
      state.snsConnect.twitterAccessTotken = params.access_token;
      state.snsConnect.twitterName = params.name;
      state.snsConnect.twitterSecret = params.secret;
    },
    facebookConnection(state, params) {
      state.snsConnect.facebook = true;
      state.snsConnect.facebookAccessTotken = params.access_token;
    },
    feedSwap(state, dropResult) {
      // console.log("feedSwap1", state.feeds);
      // const removedObj = state.feeds[dropResult.removedIndex];
      // const addedObj = state.feeds[dropResult.addedIndex];
      // state.feeds[dropResult.removedIndex] = addedObj;
      // state.feeds[dropResult.addedIndex] = removedObj;
      // console.log("feedSwap2", state.feeds);
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
        commit("login", response.data);
        router.push({ name: "main" });
      });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("logout");
    },
    addFeed({ commit }, feed) {
      commit("addFeed", feed);
    },
    removeFeed({ commit }, feed) {
      commit("removeFeed", feed);
    },
    requestTwitterConnection({ commit }, params) {
      axios.post("/twitter/users/", params).then(response => {
        commit("twiiterConnection", params);
      });
    },
    requestFacebookConnection({ commit }, params) {
      axios.post("/facebook/users/", params).then(response => {
        commit("facebookConnection", params);
      });
    }
  }
});

export default store;
