<template>
  <div class="feed-column">
    <v-layout
      v-if="data.type == $store.state.FEED_TYPE.NAVER_KEY_WORD"
      align-center
      class="feed-column-title"
    >
      <img class="icon" src="../assets/img/common/naver2-on.svg" />
      <div>{{ data.data }}</div>
      <v-spacer></v-spacer>
      <v-btn icon style="width: 30px; height: 30px; margin: 0;" @click="removeFeed(data)">
        <v-icon style="color: #b2ebf2;">delete</v-icon>
      </v-btn>
    </v-layout>
    <v-layout
      v-if="data.type == $store.state.FEED_TYPE.TWITTER_KEY_WORD"
      align-center
      class="feed-column-title"
    >
      <img class="icon" src="../assets/img/common/twitter-on.svg" />
      <div>{{ data.data}}</div>
      <v-spacer></v-spacer>
      <v-btn icon style="width: 30px; height: 30px; margin: 0;" @click="removeFeed(data)">
        <v-icon style="color: #b2ebf2;">delete</v-icon>
      </v-btn>
    </v-layout>
    <v-layout
      v-if="data.type == $store.state.FEED_TYPE.TWITTER_TIMELINE"
      align-center
      class="feed-column-title"
    >
      <img class="icon" src="../assets/img/common/twitter-on.svg" />
      <div>Timeline</div>
      <v-spacer></v-spacer>
      <v-btn icon style="width: 30px; height: 30px; margin: 0;" @click="removeFeed(data)">
        <v-icon style="color: #b2ebf2;">delete</v-icon>
      </v-btn>
    </v-layout>
    <v-layout
      v-if="data.type == $store.state.FEED_TYPE.TWITTER_MENTIONS"
      align-center
      class="feed-column-title"
    >
      <img class="icon" src="../assets/img/common/twitter-on.svg" />
      <div>Mentions</div>
      <v-spacer></v-spacer>
      <v-btn icon style="width: 30px; height: 30px; margin: 0;" @click="removeFeed(data)">
        <v-icon style="color: #b2ebf2;">delete</v-icon>
      </v-btn>
    </v-layout>
    <v-layout
      v-if="data.type == $store.state.FEED_TYPE.FACEBOOK_POSTS"
      align-center
      class="feed-column-title"
    >
      <img class="icon" src="../assets/img/common/facebook-on.svg" />
      <div>Page Posts</div>
      <v-spacer></v-spacer>
      <v-btn icon style="width: 30px; height: 30px; margin: 0;" @click="removeFeed(data)">
        <v-icon style="color: #b2ebf2;">delete</v-icon>
      </v-btn>
    </v-layout>
    <v-layout
      v-if="data.type == $store.state.FEED_TYPE.FACEBOOK_MENTIONS"
      align-center
      class="feed-column-title"
    >
      <img class="icon" src="../assets/img/common/facebook-on.svg" />
      <div>Mentions</div>
      <v-spacer></v-spacer>
      <v-btn icon style="width: 30px; height: 30px; margin: 0;" @click="removeFeed(data)">
        <v-icon style="color: #b2ebf2;">delete</v-icon>
      </v-btn>
    </v-layout>
    <div class="feeds-layer">
      <KeywordCard
        v-if="data.type == $store.state.FEED_TYPE.NAVER_KEY_WORD"
        v-for="(feed, index) in data.feedList"
        :item="feed"
        :index="index"
        :last="data.feedList.length"
        :key="index"
        @detectLastPosition="detectLastPosition"
      />
      <TwitterCard
        v-if="data.type == $store.state.FEED_TYPE.TWITTER_KEY_WORD
         || data.type == $store.state.FEED_TYPE.TWITTER_TIMELINE 
         || data.type == $store.state.FEED_TYPE.TWITTER_MENTIONS"
        v-for="(feed, index) in data.feedList"
        :item="feed"
        :key="index"
      />
      <FacebookCard
        v-if="data.type == $store.state.FEED_TYPE.FACEBOOK_POSTS 
         || data.type == $store.state.FEED_TYPE.FACEBOOK_MENTIONS"
        v-for="(feed, index) in data.feedList"
        :item="feed"
        :key="index"
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
  props: ["data"],
  components: {
    KeywordCard,
    TwitterCard,
    FacebookCard
  },
  data() {
    return {
      total: 0,
      start: 1,
      offset: 10,
      requestLock: false
    };
  },
  created() {
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
            baseURL = "/naver/news/";
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
                  signal_id: this.$store.state.userId,
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