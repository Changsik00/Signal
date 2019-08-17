<template>
  <section>
    <v-layout class="main-layer">
      <FeedColumn :keyword="keyword" v-for="keyword in keywords" :key="keyword" />
    </v-layout>

    <v-navigation-drawer
      v-model="$store.state.monitorSlideMenu"
      absolute
      temporary
      right
      width="320"
    >
      <v-layout align-center row style="padding: 10px 0; background-color: whitesmoke;">
        <div style="font-size: 20px; font-weight: bold; margin-left: 20px;">Select a column type</div>
        <v-spacer></v-spacer>
        <v-btn icon @click="hideMonitorSlideMenu">
          <v-icon>close</v-icon>
        </v-btn>
      </v-layout>
      <div class="side-menu">
        <div class="title">Search</div>
        <div>keyword 1</div>
      </div>
      <div class="side-menu">
        <div class="title">facebook</div>
        <div class="pointer" @click="facebook('VisitorPosts')">Visitor Posts</div>
        <div class="pointer" @click="facebook('PageMentions')">Page Mentions</div>
        <div class="pointer" @click="facebook('PageSearch')">Page Search</div>
      </div>
      <div class="side-menu">
        <div class="title">Twitter</div>
        <div class="pointer" @click="twitter('Mentions')">Mentions</div>
        <div class="pointer" @click="twitter('Timeline')">Timeline</div>
        <div class="pointer" @click="twitter('Likes')">Likes</div>
        <div class="pointer" @click="twitter('KeywordSearch')">Keyword Search</div>
        <div class="pointer" @click="twitter('UserSearch')">User Search</div>
        <div class="pointer" @click="twitter('Lists')">Lists</div>
      </div>
    </v-navigation-drawer>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import FeedColumn from "../components/FeedColumn";

export default {
  components: {
    FeedColumn
  },
  data() {
    return {
      ConnectionState: {
        facebook: false,
        twitter: false
      },
      keywords: ["bts", "no no japan"]
    };
  },
  methods: {
    ...mapMutations(["hideMonitorSlideMenu"]),
    facebook(type) {
      if (!this.ConnectionState.facebook) {
        this.$showToast("facebook 연결이 안되어 있습니다.");
        return;
      }
      switch (type) {
        case "VisitorPosts":
          break;
        case "PageMentions":
          break;
        case "PageSearch":
          break;
      }
    },
    twitter(type) {
      // if (!this.ConnectionState.twitter) {
      //   this.$showToast("twitter 연결이 안되어 있습니다.");
      //   return;
      // }
      switch (type) {
        case "Mentions":
          break;
        case "Timeline":
          console.log("#@# Timeline")
          this.axios.get("/twitter/timeline").then(result =>{
            console.log("#@# Timeline result" , result.data)
          });
          
          break;
        case "Likes":
          break;
        case "KeywordSearch":
          break;
        case "UserSearch":
          break;
        case "Lists":
          break;
      }
    }
  },
  computed: {
    ...mapGetters(["monitorSlideMenu"])
  },
  created() {}
};
</script>

<style lang="scss">
.main-layer {
  margin: auto;
  padding: 20px;
  display: flex;
  padding: 0;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: #393f45;
}

.side-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  border-bottom: 1px solid #dedede;

  & > .title {
    margin: 0;
    padding: 0 20px;
    margin-bottom: 10px;
    &:hover {
      background-color: white !important;
    }
  }
  & > div {
    width: 100%;
    padding: 10px 30px;
    &:hover {
      background-color: whitesmoke;
    }
  }
}
</style>
