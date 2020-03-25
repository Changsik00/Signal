<template>
  <section style="padding: 50px; ">
    <div style="display:flex; align-items: center;">
      <ChartRagneSelector :title="'채널별 컨텐츠량'" @change="rangeChange" />
    </div>
    <div id="chart" style="width: 1000px; margin: auto; padding: 20px;">
      <apexchart
        type="bar"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </section>
</template>

<script>
import dayjs from "dayjs";
import ChartRagneSelector from "./ChartRagneSelector";
export default {
  components: { ChartRagneSelector },
  props: ["keywords"],
  data() {
    return {
      chartData: [],
      series: [],
      chartOptions: {
        plotOptions: {
          bar: {
            columnWidth: "40%"
            // endingShape: "rounded"
          }
        },
        stroke: {
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          // categories: []
          categories: ["뉴스", "카페", "블로그"]
        }
      }
    };
  },
  computed: {
    allData() {
      if (_.isEmpty(this.chartData)) {
        return [];
      } else {
        const data = [];
        this.chartData.forEach(d => {
          const count = _.sumBy(d.data, d2 => d2.pcCount);
          data.push(count);
        });
        return data;
      }
    },
    year() {
      return this.getData(this.chartData, 12);
    },
    halfData() {
      return this.getData(this.chartData, 6);
    },
    quarter() {
      return this.getData(this.chartData, 3);
    }
  },
  watch: {
    keywords(value, old) {
      if (_.isEqual(value, old)) {
        return;
      }
      this.setData();
    }
  },
  created() {
    this.setData();
  },
  methods: {
    rangeChange(currentRange) {
      switch (currentRange) {
        case "all":
          break;
        case "year":
          break;
        case "half":
          break;
        case "quarter":
          break;
      }
    },
    getData(chartData, period) {
      if (_.isEmpty(chartData)) {
        return [];
      } else {
        const data = [];
        const targetDate = dayjs()
          .subtract(period, "month")
          .add(1, "day");
        chartData.forEach(d => {
          const count = _.sumBy(
            d.data.filter(d2 => dayjs(d2.period) >= targetDate),
            d2 => d2.pcCount
          );
          data.push(count);
        });
        return data;
      }
    },
    setData() {
      this.series = [];
      const categories = [];
      this.chartData = [];
      const params = {
        keyword: this.keywords.join(",")
      };
      this.$axios.get("/naver/channel_counts/", { params }).then(res => {
        const data = [];
        for (let [key, value] of Object.entries(res.data)) {
          for (let [k, v] of Object.entries(value)) {
            data.push({ name: k, data: [] });
          }
          break;
        }
        for (let [key, value] of Object.entries(res.data)) {
          categories.push(key);
          for (let [k, v] of Object.entries(value)) {
            data.forEach(d => {
              if (d.name == k) d.data.push(v);
            });
          }
        }
        this.updateChart(data, categories);
        this.chartData = res.data;
      });
    },
    updateChart(series, categories) {
      if (categories) {
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            xaxis: { categories }
          }
        };
      }
      this.series = series;
    }
  }
};
</script>

<style lang="scss" scoped>
.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.x.axis path {
  display: none;
}

.x.axis {
  font-size: 15px;
}
</style>
