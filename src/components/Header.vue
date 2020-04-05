<template>
  <section>
    <v-toolbar class="header">
      <img
        src="../assets/img/common/logo-signal.svg"
        class="pointer"
        @click="$router.push('/')"
      />
      <v-layout v-if="$route.path != '/'" class="ml30">
        <v-btn
          class="text-capitalize top-button"
          :class="{ active: $store.state.currentMode == 'ANALYTICS' }"
          outline
          round
          color="primary"
          @click="clickAnalytics"
          >분석</v-btn
        >
        <v-btn
          class="text-capitalize top-button"
          :class="{ active: $store.state.currentMode == 'MONITOR' }"
          outline
          round
          color="primary"
          @click="clickMonitor"
          >모니터</v-btn
        >
        <v-btn
          class="text-capitalize top-button"
          :class="{ active: $store.state.currentMode == 'TREND' }"
          outline
          round
          color="primary"
          @click="clickTrend"
          >트랜드</v-btn
        >
        <!-- <v-btn
          class="text-capitalize top-button"
          :class="{ active: $store.state.currentMode == 'POSTS' }"
          outline
          round
          color="primary"
          @click="clickPosts"
          >Posts
        </v-btn>-->
        <!-- <v-btn
          class="text-capitalize top-button"
          outline
          round
          color="primary"
          @click="clickNewPost"
        >
          New Post
        </v-btn>-->
      </v-layout>
      <v-layout>
        <v-spacer></v-spacer>
        <v-layout v-if="isLogin">
          <v-spacer></v-spacer>
          <!-- <v-btn
            class="text-capitalize top-button"
            outline
            round
            color="primary"
            @click="$store.state.showConnections = true"
            >연결</v-btn
          > -->
          <v-btn flat round color="primary" @click="logout">로그아웃</v-btn>
        </v-layout>
        <v-btn
          v-else
          flat
          round
          color="info"
          @click="$store.state.showLogin = true"
          >로그인</v-btn
        >
      </v-layout>
    </v-toolbar>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-text>
          로그인이 필요한 서비스입니다.<br />
          로그인 페이지로 가시겠습니까?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey" dark @click="dialog = false">취소</v-btn>
          <v-btn
            color="success"
            dark
            @click="
              $store.state.showLogin = true;
              dialog = false;
            "
            >확인</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      index: 0
    };
  },
  computed: {
    ...mapGetters(["isLogin", "monitorSlideMenu"])
  },
  created() {
    if (!this.isLogin) {
      this.$store.state.currentMode = "ANALYTICS";
    }
  },
  methods: {
    ...mapMutations(["logout", "showMonitorSlideMenu", "hideMonitorSlideMenu"]),
    clickAnalytics() {
      this.hideMonitorSlideMenu();
      this.$store.state.currentMode = "ANALYTICS";
    },
    clickMonitor() {
      if (!this.isLogin) {
        this.dialog = true;
      } else {
        this.$store.state.currentMode = "MONITOR";
        if (this.monitorSlideMenu) {
          this.hideMonitorSlideMenu();
        } else {
          this.showMonitorSlideMenu();
        }
      }
    },
    clickPosts() {
      this.hideMonitorSlideMenu();
      this.$store.state.currentMode = "POSTS";
    },
    clickNewPost() {
      this.hideMonitorSlideMenu();
      this.$store.state.showNewPost = true;
    },
    clickTrend() {
      this.hideMonitorSlideMenu();
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
