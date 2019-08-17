<template>
  <section>
    <v-toolbar class="header">
      <img src="../assets/img/common/logo-signal.svg" />
      <v-spacer class="ml30">
        <div v-if="isLogin">
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
        </div>
      </v-spacer>
      <v-btn v-if="!isLogin" flat round color="info" @click="login">로그인</v-btn>
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
import firebase from "firebase";
export default {
  components: {
    Login,
    Connections
  },
  computed: {
    ...mapGetters(["isLogin", "monitorSlideMenu"])
  },
  data() {
    return {
      index: 0
    };
  },
  created() {
    firebase.auth().useDeviceLanguage();
  },
  methods: {
    ...mapMutations(["showMonitorSlideMenu"]),
    login() {
      this.$refs.login.showDialog();
    },
    logout() {
      this.$store.dispatch("logout");
      firebase.auth().signOut();
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
