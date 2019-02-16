import Vue from "vue";
import Vuex from "vuex";
import VueAxios from "vue-axios";
import axios from "axios";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

// https://github.com/axios/axios
axios.defaults.timeout = 3000;
axios.defaults.baseURL = "https://reqres.in/api/";

axios.interceptors.request.use(config => {
  store.dispatch("showLoading");
  return config;
});

axios.interceptors.response.use(response => {
  store.dispatch("hideLoading");
  return response;
});

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
      const loginApi = "login";
      Vue.axios.post(loginApi, params).then(response => {
        commit("setToken", response.data);
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
