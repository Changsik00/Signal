<template>
  <section style="width: 100%; display: flex; align-items: center;">
    <div style="flex-grow: 1;">{{ title }} ({{ dateFormatted }} ~ {{ dateFormatted2 }})</div>
    <div class="range-selector-layer">
      <div @click="range = 'year'">1년</div>
      <div @click="range = 'half'">6개월</div>
      <div @click="range = 'quarter'">3개월</div>
      <div @click="range = 'all'">전부</div>
    </div>
  </section>
</template>

<script>
import moment from "moment";
export default {
  props: ["title"],
  data() {
    return {
      range: "all"
    };
  },
  computed: {
    dateFormatted() {
      switch (this.range) {
        case "all":
          return moment()
            .subtract(1, "months")
            .format("LL");
        case "year":
          return moment()
            .subtract(11, "months")
            .format("LL");
        case "half":
          return moment()
            .subtract(6, "months")
            .format("LL");
        case "quarter":
          return moment()
            .subtract(3, "months")
            .format("LL");
        default:
          return moment().format("LL");
      }
    },
    dateFormatted2() {
      return moment().format("LL");
    }
  },
  watch: {
    range(newValue) {
      this.$emit("change", newValue);
    }
  }
};
</script>
<style lang="scss">
.range-selector-layer {
  display: flex;
  align-items: center;
  border: 1px solid skyblue;
  border-radius: 5px;
  color: skyblue;
  font-size: 12px;
  & > div {
    cursor: pointer;
    padding: 5px 12px;
    border-right: 1px solid skyblue;
    &:nth-last-child(1) {
      margin-right: -1px;
      border-radius: 5px;
    }
  }
}
</style>
