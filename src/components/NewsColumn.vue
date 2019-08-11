<template>
  <div class="keywordListColumn">
    <div class="keywordListCardTitle">
      <span class="Text6-1">{{ keyword}}</span>
      <span class="Text6-5 pl4">Today : {{this.todayCnt }}</span>
    </div>
    <div class="keywordListLayer">
      <NewsCard
        :item="news"
        :index="index"
        :last="newsList.length"
        @detectLastPosition="detectLastPosition"
        v-for="(news, index) in newsList"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import NewsCard from "./NewsCard";
import { ScrollContainer, ScrollItem } from "vue-scrollmonitor";
export default {
  props: ["keyword"],
  components: {
    NewsCard,
    ScrollContainer,
    ScrollItem
  },
  data() {
    return {
      newsList: [],
      total: 0,
      todayCnt: 0,
      today: null,
      start: 1,
      offset: 30,
      requestLock: false
    };
  },
  created() {
    this.requestNews();
    this.today = new Date();
  },
  methods: {
    isToday(date) {
      console.log("#@# date", date);
      const d = new Date(date);
      console.log("#@# d", d);
      console.log("#@# today", this.today);
      return this.today.toDateString() == d.toDateString();
    },
    requestNews() {
      if (!this.requestLock) {
        this.requestLock = true;
        this.$store.dispatch("showLoading");
        this.axios
          .get("/news/", {
            params: { keyword: this.keyword, start: this.start }
          })
          .then(res => {
            this.total = res.data.total;
            if (this.total > this.start) {
              res.data.items.forEach(item => {
                this.newsList.push(item);
                if (this.isToday(item.pubDate)) {
                  this.todayCnt++;
                }
              });

              this.start = this.newsList.length + 1;
            }
            this.$store.dispatch("hideLoading");
            this.requestLock = false;
          })
          .catch(error => (this.requestLock = false));
      }
    },
    detectLastPosition() {
      if (this.total - this.start > this.offset) {
        this.requestNews();
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