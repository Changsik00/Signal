<template>
  <section style="width: 100%; display: flex; align-items: center;">
    <div style="flex-grow: 1;">
      <span style="font-size: 20px; font-weight: bold">{{ title }}</span> ({{
        dateFormatted
      }}
      ~ {{ dateFormatted2 }})
      <div style="color: #8a8a8a">
        {{ subTitle }}
      </div>
    </div>
    <div class="range-selector-layer">
      <div @click="range = 'year'">1년</div>
      <div @click="range = 'half'">6개월</div>
      <div @click="range = 'quarter'">3개월</div>
      <div @click="range = 'all'">전부</div>
    </div>
  </section>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: ["title", "subTitle", "start", "end"],
  data() {
    return {
      range: "all"
    };
  },
  computed: {
    dateFormatted() {
      switch (this.range) {
        case "all":
          return dayjs(this.start).format("YYYY-MM-DD");
        case "year":
          return dayjs(this.end)
            .subtract(1, "year")
            .add(1, "day")
            .format("YYYY-MM-DD");
        case "half":
          return dayjs(this.end)
            .subtract(6, "month")
            .add(1, "day")
            .format("YYYY-MM-DD");
        case "quarter":
          return dayjs(this.end)
            .subtract(3, "month")
            .add(1, "day")
            .format("YYYY-MM-DD");
        default:
          return dayjs(this.end).format("YYYY-MM-DD");
      }
    },
    dateFormatted2() {
      return dayjs(this.end).format("YYYY-MM-DD");
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
