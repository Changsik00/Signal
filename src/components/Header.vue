<template>
  <section>
    <v-toolbar class="header">
      <img src="../assets/img/common/logo-signal.svg" class="pointer" @click="$router.push('/')" />
      <v-spacer class="ml30">
        <div v-if="isLogin">
          <v-btn
            class="text-capitalize top-button"
            outline
            round
            color="primary"
            @click="$store.state.showConnections = true"
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
      <v-btn v-if="!isLogin" flat round color="info" @click="$store.state.showLogin = true">로그인</v-btn>
      <v-btn v-else flat round color="primary" @click="logout">로그아웃</v-btn>
    </v-toolbar>
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
  methods: {
    ...mapMutations(["logout", "showMonitorSlideMenu", "hideMonitorSlideMenu"]),
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
  padding: 0 10px;
}

.top-button {
  &.active {
    border: 3px solid cadetblue !important;
  }
}
</style>
