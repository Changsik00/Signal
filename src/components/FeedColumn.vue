<template>
  <div class="keywordListColumn">
    <div class="keywordListCardTitle">
      <span class="Text6-1">{{ keyword}}</span>
      <span class="Text6-5 pl4">Today : {{this.todayCnt }}</span>
    </div>
    <div class="keywordListLayer">
      <FeedCard
        :item="feed"
        :index="index"
        :last="feedList.length"
        @detectLastPosition="detectLastPosition"
        v-for="(feed, index) in feedList"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import FeedCard from "./FeedCard";
export default {
  props: ["keyword"],
  components: {
    FeedCard
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
            this.$store.dispatch("hideLoading");
            this.requestLock = false;
          })
          .catch(error => (this.requestLock = false));
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

<style lang="scss" scoped>
.keywordListColumn {
  display: inline-block;
  width: 360px;
  height: 100%;
  margin: 0px 2px;
}

.keywordListCardTitle {
  padding: 10px 25px;
  background-color: var(--ice-blue);
}

.keywordListLayer {
  width: 360px;
  overflow-y: auto;
  height: 100%;
}

.pl4 {
  padding-left: 14px;
}
</style>