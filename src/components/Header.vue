<template>
  <section>
    <v-toolbar class="header">
      <img src="../assets/img/common/logo-signal.svg" />
      <v-spacer class="ml30">
        <v-btn
          class="text-capitalize top-button"
          outline
          round
          color="primary"
          @click="connections"
        >Connections</v-btn>
        <v-btn
          class="text-capitalize top-button"
          :class="{'active' : index == 0}"
          exact
          outline
          round
          color="primary"
          @click="monitor"
        >Monitor</v-btn>
      </v-spacer>
      <v-btn v-if="!$store.getters.isLogin" flat round color="info" @click="login">로그인</v-btn>
      <v-btn v-else flat round color="primary" @click="logout">로그아웃</v-btn>
    </v-toolbar>
    <Login ref="login" />
    <Connections ref="connections" />
  </section>
</template>

<script>
import Login from "./Login";
import Connections from "./Connections";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    Login,
    Connections
  },
  computed: {
    ...mapGetters(["isLogin", "monitorSlideMenu"])
  },
  watch: {
    isLogin(newValue, oldValue) {
      if (!newValue) {
        console.log("#@# isLogin", newValue, oldValue);
        this.hideDialog();
      }
      return newValue;
    }
  },
  data() {
    return {
      index: 0
    };
  },
  methods: {
    ...mapMutations(["showMonitorSlideMenu"]),
    login() {
      this.$refs.login.showDialog();
    },
    hideDialog() {
      this.$refs.login.hideDialog();
    },
    connections() {
      this.$refs.connections.showDialog();
    },
    monitor() {
      if (this.monitorSlideMenu) {
        this.hideMonitorSlideMenu();
      } else {
        this.showMonitorSlideMenu();
      }
    },
    logout() {
      this.$store.commit("logout");
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
        })
        .catch(function(error) {
          // An error happened.
        });
    },
    main() {
      console.log("#@# goto main");
    }
  }
};
</script>
<style lang="scss">
.header {
  height: 62px;
  padding: 0 30px !important;
}

.top-button {
  &.active {
    border: 3px solid cadetblue !important;
  }
}
</style>
