<template>
  <div class="feed-column">
    <v-layout v-if="keyword" align-center class="feed-column-title">
      <v-icon class="icon">search</v-icon>
      <div>{{ keyword}}</div>
      <v-spacer></v-spacer>
      <v-btn icon style="width: 30px; height: 30px; margin: 0;" @click="removeKeyword(keyword)">
        <v-icon style="color: #b2ebf2;" @click="removeKeyword(keyword)">delete</v-icon>
      </v-btn>
    </v-layout>
    <v-layout v-if="twitterTimeline" align-center class="feed-column-title">
      <img class="icon" src="../assets/img/common/twitter-on.svg" />
      <div>Timeline</div>
    </v-layout>
    <div class="feeds-layer">
      <KeywordCard
        v-if="keyword"
        v-for="(feed, index) in feedList"
        :item="feed"
        :index="index"
        :last="feedList.length"
        :key="index"
        @detectLastPosition="detectLastPosition"
      />
      <TwitterCard
        v-if="twitterTimeline"
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
  props: ["keyword", "twitterTimeline"],
  components: {
    KeywordCard,
    TwitterCard
  },
  data() {
    return {
      feedList: [],
      total: 0,
      todayCnt: 0,
      today: null,
      start: 1,
      offset: 30,
      requestLock: false
    };
  },
  created() {
    this.requestfeed();
    this.today = new Date();
  },
  methods: {
    ...mapActions(["removeKeyword"]),
    isToday(date) {
      const d = new Date(date);
      return this.today.toDateString() == d.toDateString();
    },
    requestfeed() {
      if (!this.requestLock) {
        this.requestLock = true;
        if (this.keyword) {
          let baseURL = "https://test.signal.bz/api/news/";
          this.$axios
            .get(baseURL, {
              params: { keyword: this.keyword, start: this.start }
            })
            .then(res => {
              this.total = res.data.total;
              if (this.total > this.start) {
                res.data.items.forEach(item => {
                  this.feedList.push(item);
                  if (this.isToday(item.pubDate)) {
                    this.todayCnt++;
                  }
                });

                this.start = this.feedList.length + 1;
              }
              this.requestLock = false;
            })
            .catch(error => (this.requestLock = false));
        }

        if (this.twitterTimeline) {
          this.$axios
            .get("/twitter/timeline", {
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