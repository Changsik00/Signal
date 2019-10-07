<template>
  <div class="feed-column">
    <v-layout
      v-if="data.type == $store.state.FEED_TYPE.NAVER_KEY_WORD"
      align-center
      class="feed-column-title"
    >
      <v-icon class="icon">search</v-icon>
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
      v-if="data.type == $store.state.FEED_TYPE.TWITTER_MENTION"
      align-center
      class="feed-column-title"
    >
      <img class="icon" src="../assets/img/common/twitter-on.svg" />
      <div>Mention</div>
      <v-spacer></v-spacer>
      <v-btn icon style="width: 30px; height: 30px; margin: 0;" @click="removeFeed(data)">
        <v-icon style="color: #b2ebf2;">delete</v-icon>
      </v-btn>
    </v-layout>
    <div class="feeds-layer">
      <KeywordCard
        v-if="data.type == $store.state.FEED_TYPE.NAVER_KEY_WORD"
        v-for="(feed, index) in feedList"
        :item="feed"
        :index="index"
        :last="feedList.length"
        :key="index"
        @detectLastPosition="detectLastPosition"
      />
      <TwitterCard
        v-if="data.type == $store.state.FEED_TYPE.TWITTER_TIMELINE"
        v-for="(feed, index) in feedList"
        :item="feed"
        :key="index"
      />
      <TwitterCard
        v-if="data.type == $store.state.FEED_TYPE.TWITTER_MENTION"
        v-for="(feed, index) in feedList"
        :item="feed"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import KeywordCard from "./KeywordCard";
import TwitterCard from "./TwitterCard";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  props: ["data"],
  components: {
    KeywordCard,
    TwitterCard
  },
  data() {
    return {
      feedList: [],
      total: 0,
      start: 1,
      offset: 30,
      requestLock: false
    };
  },
  created() {
    this.requestfeed();
  },
  methods: {
    ...mapActions(["removeFeed"]),
    requestfeed() {
      if (!this.requestLock) {
        this.requestLock = true;
        if (this.data.type == "NAVER_KEY_WORD") {
          let baseURL = "https://test.signal.bz/api/news/";
          this.$axios
            .get(baseURL, {
              params: { keyword: this.data.data, start: this.start }
            })
            .then(res => {
              this.total = res.data.total;
              if (this.total > this.start) {
                res.data.items.forEach(item => {
                  this.feedList.push(item);
                });

                this.start = this.feedList.length + 1;
              }
              this.requestLock = false;
            })
            .catch(error => (this.requestLock = false));
        } else if (this.data.type == "TWITTER_TIMELINE") {
          this.$axios
            .get("/twitter/timeline/", {
              params: { firebase_access_token: this.$store.state.userToken }
            })
            .then(res => {
              this.feedList = res.data;
              this.requestLock = false;
            })
            .catch(error => (this.requestLock = false));
        } else if (this.data.type == "TWITTER_MENTION") {
          this.$axios
            .get("/twitter/mention/", {
              params: { firebase_access_token: this.$store.state.userToken }
            })
            .then(res => {
              this.feedList = res.data;
              this.requestLock = false;
            })
            .catch(error => (this.requestLock = false));
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