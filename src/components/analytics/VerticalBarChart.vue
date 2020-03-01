<template>
  <section style="padding: 50px; ">
    <div style="display:flex; align-items: center;">
      <ChartRagneSelector :title="'채널별 컨텐츠량'" @change="rangeChange" />
    </div>
    <div id="chart" style="width: 1000px; margin: auto; padding: 20px;">
      <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </section>
</template>
<script>
import ChartRagneSelector from "./ChartRagneSelector";
export default {
  components: { ChartRagneSelector },
  data() {
    return {
      // https://apexcharts.com/vue-chart-demos/column-charts/basic/
      series: [
        {
          name: "배달의민족",
          data: [44, 55, 57, 56]
        },
        {
          name: "요기요",
          data: [76, 85, 101, 98]
        },
        {
          name: "배달통",
          data: [35, 41, 36, 28]
        }
      ],
      chartOptions: {
        plotOptions: {
          bar: {
            columnWidth: "40%",
            endingShape: "rounded"
          }
        },
        stroke: {
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: ["뉴스", "카페", "블로그", "기타"]
        },
        tooltip: {
          enabled: false
        }
      }
    };
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
