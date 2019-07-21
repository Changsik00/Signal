import Vue from "vue";
import Vuex from "vuex";
import VueAxios from "vue-axios";
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
Vue.use(VueAxios, axios);

// https://github.com/axios/axios
axios.defaults.timeout = 3000;
axios.defaults.baseURL = "https://reqres.in/api/";

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
    Vue.toasted.show("axios error");
    return Promise.reject(error.response);
  }
);

const store = new Vuex.Store({
  state: {
    loading: false,
    userToken: null
  },
  getters: {
    isLogin(state) {
      return state.userToken != null;
    }
  },
  mutations: {
    setToken(state, userToken) {
      state.userToken = userToken;
    },
    logout(state) {
      state.userToken = null;
    },
    setLoading(state, visible) {
      state.loading = visible;
    }
  },
  actions: {
    login({ commit }, params) {
      const loginApi = "https://reqres.in//api/login";
      Vue.axios.post(loginApi, params).then(response => {
        console.log("#@# login", response);
        commit("setToken", "asdfasf");
      });
    },
    showLoading({ commit, state }) {
      if (!state.loading) {
        commit("setLoading", true);
        setTimeout(() => (state.loading = false), 5000);
      }
    },
    hideLoading({ commit }) {
      commit("setLoading", false);
    }
  }
});

export default store;
