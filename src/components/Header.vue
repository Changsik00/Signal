<template>
  <section>
    <v-toolbar class="header">
      <img src="../assets/img/common/logo-signal.svg" class="pointer" @click="$router.push('/')" />
      <v-layout v-if="isLogin" class="ml30">
        <v-btn
          class="text-capitalize top-button"
          outline round color="primary"
          @click="$store.state.showConnections = true">
          Connections
        </v-btn>
        <v-btn
          class="text-capitalize top-button"
          :class="{'active' : $store.state.currentMode == 'MONITOR'}"
          outline round color="primary"
          @click="clickMonitor">
          Monitor
        </v-btn>
        <v-btn
          class="text-capitalize top-button"
          :class="{'active' : $store.state.currentMode == 'POSTS'}"
          outline round color="primary"
          @click="clickPosts">Posts
        </v-btn>
        <v-spacer />
        <v-btn
          class="text-capitalize top-button"
          :class="{'active' : $store.state.currentMode == 'TREND'}"
          outline round color="primary"
          @click="clickTrend">
          Trend
        </v-btn>
        <v-btn
          class="text-capitalize top-button"
          outline round color="primary"
          @click="clickNewPost">
          New Post
        </v-btn>
        <v-btn 
          flat round color="primary" 
          @click="logout"> 로그아웃
        </v-btn>
      </v-layout>
      <v-layout v-else>
        <v-spacer></v-spacer>
        <v-btn 
          flat round color="info" 
          @click="$store.state.showLogin = true">
          로그인
        </v-btn>
      </v-layout>
    </v-toolbar>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import firebase from "firebase";
export default {
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
    clickMonitor() {
      this.$store.state.currentMode = "MONITOR";
      if (this.monitorSlideMenu) {
        this.hideMonitorSlideMenu();
      } else {
        this.showMonitorSlideMenu();
      }
    },
    clickPosts() {
      this.$store.state.currentMode = "POSTS";
    },
    clickNewPost() {
      this.$store.state.showNewPost = true;
    },
    clickTrend() {
      this.$store.state.currentMode = "TREND";
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
