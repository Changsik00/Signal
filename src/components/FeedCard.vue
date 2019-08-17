<template >
  <div style="background-color: var(--ice-blue); padding-bottom: 5px;">
    <v-layout
      v-observe-visibility="visibilityChanged"
      column
      style=" padding: 20px; background-color: white"
    >
      <div class="feed-title">
        <img src="../assets/img/common/information.svg" style="width:30px; height:30px;" />
        <div style="margin-left: 10px;">
          <div style="font-weight: bold;" v-html="item.title"></div>
          <div style="font-size: 14px; color: #9da6af">{{dateToFormat(item.pubDate)}}</div>
        </div>
      </div>

      <div class="mt10" v-html="item.description"></div>
      <div class="see-more">
        <a @click="seeMore">See More</a>
      </div>
      <v-img
        class="feed-image"
        @click="seeMore"
        v-if="ogImage.length > 1"
        :aspect-ratio="2 / 1"
        :src="ogImage"
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
    let baseURL = "https://www.signal.bz/api/ogimage/?url=";
    if (
      window.location.href.startsWith("http://localhost") ||
      window.location.href.startsWith("https://test.signal.bz")
    ) {
      baseURL = "https://test.signal.bz/api/ogimage/?url=";
    }

    this.axios
      .get(baseURL + this.item.link)
      .then(res => {
        if (res.data.image.startsWith("http")) {
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
          : "0" + (parseInt(d.getMinutes() / 5) * 5).toString())
      );
    }
  }
};
</script>

<style lang="scss">
.feed-title {
  display: flex;
}

.feed-desc {
  margin-top: 10px;
}

.seeM-more {
  padding-top: 20px;
  text-decoration: underline;
}

.feed-image {
  margin-top: 10px;
  cursor: pointer;
  width: 100%;
}
</style>
