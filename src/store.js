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
    feeds: [],
    snsConnect: {
      facebook: false,
      facebookAccessToken: "",
      twitter: false,
      twitterTimeline: false,
      twitterAccessTotken: "",
      twitterName: "",
      twitterSecret: ""
    },
    FEED_TYPE: {
      NAVER_KEY_WORD: "NAVER_KEY_WORD",
      TWITTER_KEY_WORD: "TWITTER_KEY_WORD",
      TIWTTER_TIMELINE: "TIWTTER_TIMELINE"
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
    removeFeed(state, feed) {
      state.feeds = _.filter(
        state.feeds,
        d => !(d.data == feed.data && d.type == feed.type)
      );
    },
    setFeeds(state) {
      let dummyFeeds = [];
      if (state.feeds.length == 0) {
        dummyFeeds.push({ type: "NAVER_KEY_WORD", data: "bts" });
        dummyFeeds.push({ type: "NAVER_KEY_WORD", data: "블랙핑크" });
        dummyFeeds.push({ type: "TIWTTER_TIMELINE", data: "" });
      }
      state.feeds = dummyFeeds;
    },
    addFeed(state, feed) {
      state.feeds.push(feed);
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
    setFeeds({ commit }) {
      commit("setFeeds");
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
        // axios.post("/twitter/timeline/", params).then(response2 => {
        //   if (response2.data.success) {
        //     console.log("#@# twitter2", response2);
        //   }
        // });
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
