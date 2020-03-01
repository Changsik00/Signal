<template>
  <section style="padding: 50px; ">
    <div style="display:flex;">검색량 (수집기간: 전체기간)</div>
    <div id="chart" style="width: 1000px; margin: auto; padding: 20px;">
      <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </section>
</template>
<script>
export default {
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
            horizontal: false,
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
          y: {
            formatter: function(val) {
              return "$ " + val + " thousands";
            }
          }
        }
      }
    };
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
