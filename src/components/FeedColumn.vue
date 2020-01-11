<template>
  <div class="feed-column">
    <v-layout align-center class="feed-column-title">
      <img class="icon" :src="iconImage" style="border-radius: 50%;" />
      <div>{{ title }}</div>
      <v-spacer></v-spacer>
      <v-btn
        icon
        style="width: 30px; height: 30px; margin: 0;"
        @click="removeFeed(data)"
      >
        <v-icon style="color: #b2ebf2;">delete</v-icon>
      </v-btn>
    </v-layout>
    <div class="feeds-layer">
      <KeywordCard
        v-for="(feed, index) in data.feedList"
        v-if="data.type.startsWith($store.state.FEED_TYPE.NAVER_KEY_WORD)"
        :key="index"
        :item="feed"
        :index="index"
        :last="data.feedList.length"
        @detectLastPosition="detectLastPosition"
      />
      <TwitterCard
        v-for="(feed, index) in data.feedList"
        v-if="
          data.type == $store.state.FEED_TYPE.TWITTER_KEY_WORD ||
            data.type == $store.state.FEED_TYPE.TWITTER_TIMELINE ||
            data.type == $store.state.FEED_TYPE.TWITTER_MENTIONS
        "
        :key="index"
        :item="feed"
      />
      <FacebookCard
        v-for="(feed, index) in data.feedList"
        v-if="
          data.type == $store.state.FEED_TYPE.FACEBOOK_POSTS ||
            data.type == $store.state.FEED_TYPE.FACEBOOK_MENTIONS
        "
        :key="index"
        :item="feed"
      />
    </div>
  </div>
</template>

<script>
import KeywordCard from "./KeywordCard";
import TwitterCard from "./TwitterCard";
import FacebookCard from "./FacebookCard";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    KeywordCard,
    TwitterCard,
    FacebookCard
  },
  props: ["data"],
  data() {
    return {
      total: 0,
      start: 1,
      offset: 10,
      requestLock: false,
      iconImage: "",
      title: ""
    };
  },
  created() {
    switch (this.data.type) {
      case "NAVER_KEY_WORD":
      case "NAVER_KEY_WORD_NEWS":
        this.iconImage = require("../assets/img/common/naver2-on.svg");
        this.title = this.data.data;
        break;

      case "NAVER_KEY_WORD_CAFE":
        this.iconImage = require("../assets/img/common/naver-cafe.png");
        this.title = this.data.data;
        break;

      case "NAVER_KEY_WORD_BLOG":
        this.iconImage = require("../assets/img/common/naver-blog.png");
        this.title = this.data.data;
        break;

      case "TWITTER_KEY_WORD":
        this.iconImage = require("../assets/img/common/twitter-on.svg");
        this.title = this.data.data;
        break;

      case "TWITTER_TIMELINE":
        this.iconImage = require("../assets/img/common/twitter-on.svg");
        this.title = "Timeline";
        break;

      case "TWITTER_MENTIONS":
        this.iconImage = require("../assets/img/common/twitter-on.svg");
        this.title = "Mentions";
        break;

      case "FACEBOOK_POSTS":
        this.iconImage = require("../assets/img/common/facebook-on.svg");
        this.title = "Page Posts";
        break;

      case "FACEBOOK_MENTIONS":
        this.iconImage = require("../assets/img/common/facebook-on.svg");
        this.title = "Mentions";
        break;
    }

    this.data.feedList = [];
    this.requestfeed();
  },
  methods: {
    ...mapActions(["removeFeed"]),
    requestfeed() {
      if (!this.requestLock) {
        this.requestLock = true;
        let baseURL = "";
        switch (this.data.type) {
          case "NAVER_KEY_WORD":
          case "NAVER_KEY_WORD_NEWS":
          case "NAVER_KEY_WORD_BLOG":
          case "NAVER_KEY_WORD_CAFE":
            if (this.data.type == "NAVER_KEY_WORD_CAFE") {
              baseURL = "/naver/cafe_search/";
            } else if (this.data.type == "NAVER_KEY_WORD_BLOG") {
              baseURL = "/naver/blog_search/";
            } else {
              baseURL = "/naver/news/";
            }

            this.$axios
              .get(baseURL, {
                params: { keyword: this.data.data, start: this.start }
              })
              .then(res => {
                this.total = res.data.total;
                if (this.total > this.start) {
                  res.data.items.forEach(item => {
                    this.data.feedList.push(item);
                  });
                  this.start = this.data.feedList.length + 1;
                }
                this.requestLock = false;
              })
              .catch(error => (this.requestLock = false));

            break;
          case "TWITTER_KEY_WORD":
            this.$axios
              .post("/twitter/user_keywords/", {
                firebase_access_token: this.$store.state.userToken,
                signal_id: this.$store.state.userId,
                text: this.data.data
              })
              .then(res => {
                this.data.feedList = res.data;
                this.requestLock = false;
              })
              .catch(error => (this.requestLock = false));
            break;
          case "TWITTER_TIMELINE":
            this.$axios
              .get("/twitter/timeline/", {
                params: {
                  firebase_access_token: this.$store.state.userToken,
                  signal_id: this.$store.state.userId
                }
              })
              .then(res => {
                this.data.feedList = res.data;
                this.requestLock = false;
              })
              .catch(error => (this.requestLock = false));
            break;
          case "TWITTER_MENTIONS":
            this.$axios
              .get("/twitter/mention/", {
                params: {
                  firebase_access_token: this.$store.state.userToken,
                  signal_id: this.$store.state.userId
                }
              })
              .then(res => {
                this.data.feedList = res.data;
                this.requestLock = false;
              })
              .catch(error => (this.requestLock = false));
            break;

          case "FACEBOOK_POSTS":
            this.$axios
              .get("/facebook/page_posts/", {
                params: {
                  firebase_access_token: this.$store.state.userToken,
                  signal_id: this.$store.state.userId
                }
              })
              .then(res => {
                this.data.feedList = res.data;
                this.requestLock = false;
              })
              .catch(error => (this.requestLock = false));
            break;
          case "FACEBOOK_MENTIONS":
            this.$axios
              .get("/facebook/page_mentions/", {
                params: {
                  firebase_access_token: this.$store.state.userToken,
                  signal_id: this.$store.state.userId
                }
              })
              .then(res => {
                this.data.feedList = res.data;
                this.requestLock = false;
              })
              .catch(error => (this.requestLock = false));
            break;
        }
      }
    },
    detectLastPosition() {
      if (this.total - this.start > this.offset) {
        this.requestfeed();
      }
    }
  }
};
</script>

<style lang="scss">
.feed-column {
  display: flex;
  flex-direction: column;
  width: 360px;
  height: 100%;
  margin-right: 4px;
  overflow: hidden;
}

.feed-column-title {
  max-height: 50px;
  height: 50px;
  padding: 10px;
  background-color: $greenblue2;

  & > .icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    color: #b2ebf2;
  }
  & > div {
    font-size: 20px;
    font-weight: bold;
    color: #b2ebf2;
  }
}

.feeds-layer {
  flex-grow: 1;
  overflow-y: auto;
}

.pl4 {
  padding-left: 14px;
}
</style>
