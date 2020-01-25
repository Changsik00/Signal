<template>
  <div style="background-color: var(--ice-blue); padding-bottom: 5px;">
    <v-layout
      v-observe-visibility="visibilityChanged"
      column
      style="padding: 20px; background-color: white"
    >
      <div style="font-size: 18px; font-weight: bold;" v-html="item.title"></div>
      <div
        v-if="item.pubDate"
        style="font-size: 14px; color: #9da6af"
        v-html="dateToFormat(item.pubDate)"
      ></div>
      <div
        v-if="item.postdate"
        style="font-size: 14px; color: #9da6af"
        v-html="dateToFormat2(item.postdate)"
      ></div>
      <div class="mt10" style="word-break: break-all;" v-html="item.description"></div>
      <div class="see-more">
        <a @click="seeMore">See More</a>
      </div>
      <v-img
        v-if="ogImage.length > 1"
        class="feed-image"
        :aspect-ratio="2 / 1"
        :src="ogImage"
        @click="seeMore"
      ></v-img>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ["item", "index", "last"],
  data() {
    return {
      ogImage: ""
    };
  },
  created() {
    let baseURL = "/naver/ogimage/?url=";
    this.$axios
      .get(baseURL + this.item.link)
      .then(res => {
        if (
          res.data.image.startsWith("http") &&
          (res.data.image.endsWith("png") || res.data.image.endsWith("jpg"))
        ) {
          this.ogImage = res.data.image;
        }
      })
      .catch(error => {});
  },
  methods: {
    seeMore() {
      window.open(this.item.link);
    },
    visibilityChanged(isVisible, entry) {
      if (isVisible)
        if (this.last - this.index < 4) {
          this.$emit("detectLastPosition");
        }
    },
    dateToFormat(pubDate) {
      var d = new Date(pubDate);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDate();
      return (
        d.getFullYear().toString() +
        "년" +
        ((d.getMonth() + 1).toString().length == 2
          ? (d.getMonth() + 1).toString()
          : "0" + (d.getMonth() + 1).toString()) +
        "월" +
        (d.getDate().toString().length == 2
          ? d.getDate().toString()
          : "0" + d.getDate().toString()) +
        "일 " +
        (d.getHours().toString().length == 2
          ? d.getHours().toString()
          : "0" + d.getHours().toString()) +
        ":" +
        ((parseInt(d.getMinutes() / 5) * 5).toString().length == 2
          ? (parseInt(d.getMinutes() / 5) * 5).toString()
          : "0" + (parseInt(d.getMinutes() / 5) * 5).toString()) +
        this.checkToday(year, month, day)
      );
    },
    dateToFormat2(postdate) {
      const year = postdate.substring(0, 4);
      const month = postdate.substring(4, 6);
      const day = postdate.substring(6, 8);

      return (
        postdate.substring(0, 4) +
        "년" +
        postdate.substring(4, 6) +
        "월" +
        postdate.substring(6, 8) +
        "일 " +
        this.checkToday(year, month, day)
      );
    },
    checkToday(y, m, d) {
      var now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();

      if (y == year && m == month && d == day) {
        return ' <span style="font-weight: bold; color: red"> Today </span>';
      }
      return "";
    }
  }
};
</script>

<style lang="scss">
.see-more {
  padding-top: 10px;
  text-decoration: underline;
}

.feed-image {
  margin-top: 10px;
  cursor: pointer;
  width: 100%;
}
</style>
