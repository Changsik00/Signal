<template>
  <section style="padding: 50px; ">
    <div style="display:flex; align-items: center;">
      <ChartRagneSelector :title="'검색량 추이'" @change="rangeChange" />
    </div>
    <div id="chart" style="width: 1000px; margin: auto; padding: 20px;">
      <apexchart height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </section>
</template>
<script>
import ChartRagneSelector from "./ChartRagneSelector";
export default {
  components: { ChartRagneSelector },
  data() {
    return {
      series: [
        {
          name: "배달의민족",
          data: [
            [1327359600000, 30.95],
            [1327446000000, 31.34],
            [1327532400000, 31.18],
            [1327618800000, 31.05],
            [1327878000000, 31.0],
            [1327964400000, 30.95],
            [1328050800000, 31.24],
            [1328137200000, 31.29],
            [1328223600000, 31.85],
            [1328482800000, 31.86],
            [1328569200000, 32.28],
            [1328655600000, 32.1],
            [1328742000000, 32.65],
            [1328828400000, 32.21],
            [1329087600000, 32.35],
            [1329174000000, 32.44],
            [1329260400000, 32.46],
            [1329346800000, 32.86],
            [1329433200000, 32.75],
            [1329778800000, 32.54],
            [1329865200000, 32.33],
            [1329951600000, 32.97],
            [1330038000000, 33.41],
            [1330297200000, 33.27],
            [1330383600000, 33.27],
            [1330470000000, 32.89],
            [1330556400000, 33.1],
            [1330642800000, 33.73],
            [1330902000000, 33.22],
            [1330988400000, 31.99],
            [1331074800000, 32.41],
            [1331161200000, 33.05],
            [1331247600000, 33.64]
          ]
        },
        {
          name: "요기요",
          data: [
            [1327359600000, 20.95],
            [1327446000000, 21.34],
            [1327532400000, 21.18],
            [1327618800000, 21.05],
            [1327878000000, 21.0],
            [1327964400000, 20.95],
            [1328050800000, 31.24],
            [1328137200000, 21.29],
            [1328223600000, 41.85],
            [1328482800000, 21.86],
            [1328569200000, 42.28],
            [1328655600000, 42.1],
            [1328742000000, 42.65],
            [1328828400000, 32.21],
            [1329087600000, 32.35],
            [1329174000000, 32.44],
            [1329260400000, 32.46],
            [1329346800000, 32.86],
            [1329433200000, 22.75],
            [1329778800000, 22.54],
            [1329865200000, 22.33],
            [1329951600000, 22.97],
            [1330038000000, 23.41],
            [1330297200000, 23.27],
            [1330383600000, 33.27],
            [1330470000000, 32.89],
            [1330556400000, 23.1],
            [1330642800000, 23.73],
            [1330902000000, 23.22],
            [1330988400000, 21.99],
            [1331074800000, 22.41],
            [1331161200000, 23.05],
            [1331247600000, 43.64]
          ]
        }
      ],
      chartOptions: {
        chart: {
          type: "area",
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: "zoom"
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          type: "datetime",
          min: new Date(1327359600000).getTime(),
          tickAmount: 6,
          labels: {
            format: "yyyy/MM/dd"
          }
        },
        tooltip: {
          x: {
            format: "yyyy/MM/dd"
          }
        }
      }
    };
  },
  created() {
    this.setData();
  },
  methods: {
    rangeChange(currentRange) {
      console.log("#@# line", currentRange);
      switch (currentRange) {
        case "all":
          this.chartOptions = {
            xaxis: {
              min: new Date("25 Jan 2012").getTime(),
              max: new Date("27 Feb 2012").getTime()
            }
          };
          break;
        case "year":
          this.chartOptions = {
            xaxis: {
              min: new Date("28 Feb 2012").getTime(),
              max: new Date("05 Mar 2012").getTime()
            }
          };
          break;
        case "half":
          this.chartOptions = {
            xaxis: {
              min: new Date("27 Feb 2012").getTime(),
              max: new Date("08 Mar 2012").getTime()
            }
          };
          break;
        case "quarter":
          this.chartOptions = {
            xaxis: {
              min: undefined,
              max: undefined
            }
          };
          break;
      }
    }
  }
};
</script>
