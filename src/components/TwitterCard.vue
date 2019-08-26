<template >
  <div style="background-color: var(--ice-blue); padding-bottom: 5px;">
    <v-layout
      column
      style="padding: 20px; background-color: white"
    >
      <!-- <div style="font-size: 18px; font-weight: bold;" v-html="item.title"></div>
      <div style="font-size: 14px; color: #9da6af">{{dateToFormat(item.pubDate)}}</div>
      <div class="mt10" style="word-break: break-all;" v-html="item.description"></div>
      <div class="see-more">
        <a @click="seeMore">See More</a>
      </div>
      <v-img
        v-if="ogImage.length > 1"
        class="feed-image"
        @click="seeMore"
        :aspect-ratio="2 / 1"
        :src="ogImage"
      ></v-img> -->
      <div class="mt10" style="word-break: break-all;" v-html="item.text"></div>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  }
};
</script>