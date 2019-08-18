<template>
  <section>
    <v-layout class="main-layer">
      <FeedColumn :keyword="keyword" v-for="keyword in getKeywords" :key="keyword" />
    </v-layout>

    <v-navigation-drawer
      v-model="$store.state.monitorSlideMenu"
      absolute
      temporary
      right
      width="320"
    >
      <v-layout align-center style="padding: 10px 0; background-color: whitesmoke;">
        <div style="font-size: 20px; font-weight: bold; margin-left: 15px;">Select a column type</div>
        <v-spacer></v-spacer>
        <v-btn icon @click="hideMonitorSlideMenu">
          <v-icon>arrow_forward</v-icon>
        </v-btn>
      </v-layout>
      <div class="side-menu">
        <div class="title">Search</div>
        <v-layout align-center class="menu" v-for="keyword in getKeywords" :key="keyword">
          {{keyword}}
          <v-spacer></v-spacer>
          <v-btn icon style="width: 30px; height: 30px; margin: 0;" @click="removeKeyword(keyword)">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-layout>
        <v-layout v-if="getKeywords.length < 3" align-center style="width: 100%; padding: 10px">
          <b-input style="flex-grow: 1" type="text" v-model="searchKeyword" />
          <div v-if="!searchOn">
            <v-btn icon style="margin: 0 0 0 10px" @click="search">
              <v-icon style="font-size: 30px; color: #393f45; cursor: pointer;">search</v-icon>
            </v-btn>
          </div>
          <div v-else>
            <v-btn icon style="margin: 0 0 0 10px" @click="acceptKeyword">
              <v-icon style="font-size: 30px; color: #393f45; cursor: pointer;">check_circle</v-icon>
            </v-btn>
            <v-btn icon style="margin: 0 0 0 10px" @click="cancelKeyword">
              <v-icon style="font-size: 30px; color: #393f45; cursor: pointer;">remove_circle</v-icon>
            </v-btn>
          </div>
        </v-layout>
      </div>
      <div v-if="!searchOn" class="side-menu line">
        <v-layout align-center class="title">
          <img src="../assets/img/common/facebook-off.svg" style="width: 25px; margin-right: 5px;" />
          Facebook
        </v-layout>
        <div class="menu" @click="facebook('VisitorPosts')">Visitor Posts</div>
        <div class="menu" @click="facebook('PageMentions')">Page Mentions</div>
        <div class="menu" @click="facebook('PageSearch')">Page Search</div>
      </div>
      <div v-if="!searchOn" class="side-menu line">
        <v-layout align-center class="title">
          <img src="../assets/img/common/twitter-off.svg" style="width: 25px; margin-right: 5px;" />
          Twitter
        </v-layout>
        <div class="menu" @click="twitter('Mentions')">Mentions</div>
        <div class="menu" @click="twitter('Timeline')">Timeline</div>
        <div class="menu" @click="twitter('Likes')">Likes</div>
        <div class="menu" @click="twitter('KeywordSearch')">Keyword Search</div>
        <div class="menu" @click="twitter('UserSearch')">User Search</div>
        <div class="menu" @click="twitter('Lists')">Lists</div>
      </div>
      <div v-if="searchOn" class="side-menu line">
        <div v-for="(news, i) in searchPreviewList" :key="i" style="padding: 10px; margin-bottom: 20px">
          <div v-html="news.title" style="font-size: 16px; font-weight: bold;"></div>
          <div class="mt10" style="font-size: 14px;" v-html="news.description"></div>
        </div>
      </div>
    </v-navigation-drawer>
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
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
      searchKeyword: "",
      searchOn: false,
      searchPreviewList: []
    };
  },
  computed: {
    ...mapGetters(["monitorSlideMenu", "getKeywords"])
  },
  created() {
    this.setKeywords();
  },
  methods: {
    ...mapMutations(["hideMonitorSlideMenu"]),
    ...mapActions(["setKeywords", "removeKeyword", "addKeyword"]),
    search() {
      if (this.searchKeyword.length == 0) {
        this.$showToast("검색어를 입력해 주세요!");
        return;
      }

      if (this.searchKeyword.length <= 2) {
        this.$showToast("너무 짧은 단어입니다.");
        this.searchKeyword = "";
        return;
      }

      if (_.find(this.getKeywords, d => d == this.searchKeyword)) {
        this.$showToast("존재하는 검색어 입니다.");
        this.searchKeyword = "";
        return;
      }

      this.searchPreviewList = [];
      let baseURL = "https://www.signal.bz/api/news/";
      if (
        window.location.href.startsWith("http://localhost") ||
        window.location.href.startsWith("https://test.signal.bz")
      ) {
        baseURL = "https://test.signal.bz/api/news/";
      }
      this.$store.dispatch("showLoading");
      this.axios
        .get(baseURL, {
          params: { keyword: this.searchKeyword, start: 1 }
        })
        .then(res => {
          res.data.items.forEach(item => {
            this.searchPreviewList.push(item);
          });
          this.$store.dispatch("hideLoading");
          this.searchOn = true;
        });
    },
    acceptKeyword() {
      this.searchOn = false;
      this.addKeyword(this.searchKeyword);
      this.searchKeyword = "";
    },
    cancelKeyword() {
      this.searchOn = false;
      this.searchKeyword = "";
    },
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
          console.log("#@# Timeline");
          this.axios.get("/twitter/timeline").then(result => {
            console.log("#@# Timeline result", result.data);
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
  }
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
  padding: 20px 0;

  &.line {
    border-top: 1px solid #dedede;
  }

  & > .title {
    width: 100%;
    margin: 0;
    padding: 0 15px;
    margin-bottom: 10px;
    text-align: left;
    color: #393f45;
  }
  & > .menu {
    width: 100%;
    padding: 10px 10px 10px 20px;
    cursor: pointer;
    &:hover {
      background-color: whitesmoke;
    }
  }
}
</style>
