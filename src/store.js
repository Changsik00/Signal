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
    currentMode: "",
    showLogin: false,
    showConnections: false,
    showNewPost: false,
    loadingCheckSum: 0,
    loadingTimeout: null,
    snackbar: false,
    snackbarMessage: "",
    snackbarTimeout: null,
    userId: localStorage.getItem("id"),
    userToken: localStorage.getItem("access_token"),
    monitorSlideMenu: false,
    feeds: null,
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
      return state.feeds.filter(d => d.type.startsWith("NAVER_KEY_WORD"));
    },
    getTwitterKeywords(state) {
      return state.feeds.filter(d => d.type == "TWITTER_KEY_WORD");
    },
    getFeeds(state) {
      if (state.feeds == null) {
        const params = {
          signal_id: state.userId,
          access_token: state.userToken
        };
        axios.get("/firebase/user/feed_list/", { params }).then(response => {
          try {
            store.commit("setFeeds", JSON.parse(response.data));
          } catch (e) {}
        });
      } else {
        return state.feeds;
      }
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
      if (data?.data != "") {
        try {
          state.feeds = JSON.parse(data.data);
        } catch (e) {}
      } else {
        state.feeds = [];
      }
    },
    logout(state) {
      state.userToken = null;
      state.showLogin = false;
      state.showConnections = false;
      state.showNewPost = false;
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
      const params = {
        signal_id: state.userId,
        access_token: state.userToken,
        data: JSON.stringify(state.feeds)
      };
      if (status.isLogin) {
        axios.post("/firebase/user/feed_list/", params);
      }
    },
    addFeed(state, feed) {
      if (feed.type == null || feed.type == "") {
        return;
      }
      feed.feedList = [];
      if (!status.isLogin && state.feeds == null) {
        state.feeds = [];
      }
      state.feeds.push(feed);
      const temp = state.feeds
        .filter(d => d.type != null && d.type != "")
        .map(d => {
          return { data: d.data, type: d.type, feedList: [] };
        });
      const params = {
        signal_id: state.userId,
        access_token: state.userToken,
        data: JSON.stringify(temp)
      };
      if (status.isLogin) {
        axios.post("/firebase/user/feed_list/", params);
      }
    },
    setFeeds(state, feeds) {
      if (feeds == "" || feeds.length == 0) {
        state.feeds = [];
      } else {
        feeds = feeds.filter(d => d.type != null && d.type != "");
        state.feeds = feeds;
      }
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
      const removedObj = state.feeds[dropResult.removedIndex];
      state.feeds.splice(dropResult.removedIndex, 1);
      state.feeds.splice(dropResult.addedIndex, 0, removedObj);
      const temp = state.feeds;
      state.feeds = [];
      state.feeds = temp;

      const params = {
        signal_id: state.userId,
        access_token: state.userToken,
        data: JSON.stringify(state.feeds)
      };
      if (status.isLogin) {
        axios.post("/firebase/user/feed_list/", params);
      }
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
