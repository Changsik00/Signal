<template>
  <div class="feed-column">
    <v-layout v-if="keyword" align-center class="feed-column-title">
      <v-icon class="icon">search</v-icon>
      <div>{{ keyword}}</div>
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
    isToday(date) {
      const d = new Date(date);
      return this.today.toDateString() == d.toDateString();
    },
    requestfeed() {
      if (!this.requestLock) {
        this.requestLock = true;
        if (this.keyword) {
          let baseURL = "https://www.signal.bz/api/news/";
          if (
            window.location.href.startsWith("http://localhost") ||
            window.location.href.startsWith("https://test.signal.bz")
          ) {
            baseURL = "https://test.signal.bz/api/news/";
          }
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
            // .get("/twitter/timeline", {
            //   params: { firebase_access_token: this.$store.state.userToken }
            // })
            .get("/twitter/timeline")
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
  display: inline-block;
  width: 360px;
  height: 100%;
  margin: 0px 2px;
}

.feed-column-title {
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
  width: 360px;
  overflow-y: auto;
  height: 100%;
}

.pl4 {
  padding-left: 14px;
}
</style>