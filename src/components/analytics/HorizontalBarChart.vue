<template>
  <section style="padding: 50px; ">
    <div style="display:flex; align-items: center;">
      <ChartRagneSelector :title="'검색량'" @change="rangeChange" />
    </div>
    <div style="width: 1000px; margin: auto; padding: 20px;">
      <apexchart type="bar" height="250" :options="chartOptions" :series="series"></apexchart>
    </div>
  </section>
</template>
<script>
import ChartRagneSelector from "./ChartRagneSelector";
export default {
  components: { ChartRagneSelector },
  data() {
    return {
      range: "all",
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "40%",
            endingShape: "rounded"
          }
        },
        xaxis: {
          categories: ["배달의민족", "요기요", "배달통"]
        },
        fill: {
          colors: [
            ({ value, dataPointIndex }) => {
              if (dataPointIndex == 0) {
                return "#008FFB";
              } else if (dataPointIndex == 1) {
                return "#00E396";
              } else if (dataPointIndex == 2) {
                return "#FEB019";
              } else {
                return "#FF4560";
              }
            }
          ]
        },
        yaxis: {
          labels: {
            style: {
              fontSize: "12px",
              fontWeight: 400
            }
          }
        },
        tooltip: {
          enabled: false
        }
      },
      series: [
        {
          name: "검색량",
          data: [30, 40, 50]
        }
      ]
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
