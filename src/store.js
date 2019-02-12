import Vue from "vue";
import Vuex from "vuex";
import VueAxios from "vue-axios";
import axios from "axios";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: {
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
    }
  },
  actions: {
    login({ commit }, params) {
      const loginApi = "https://reqres.in/api/login";
      Vue.axios.post(loginApi, params).then(response => {
        console.log("#@# response", response);
        commit("setToken", response.data);
      });
    }
  }
});
