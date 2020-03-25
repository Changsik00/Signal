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
import dayjs from "dayjs";
import ChartRagneSelector from "./ChartRagneSelector";
export default {
  components: { ChartRagneSelector },
  props: ["keywords"],
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
          categories: []
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
          data: []
        }
      ],
      chartData: []
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
          this.updateChart(this.allData);
          break;
        case "year":
          this.updateChart(this.year);
          break;
        case "half":
          this.updateChart(this.halfData);
          break;
        case "quarter":
          this.updateChart(this.quarter);
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
      this.chartOptions.xaxis.categories = [];
      this.series[0].data = [];
      this.chartData = [];
      const params = {
        keyword: this.keywords.join(","),
        start_date: dayjs()
          .subtract(3, "year")
          .format("YYYY-MM"),
        end_date: dayjs().format("YYYY-MM")
      };
      this.$axios.get("/naver/trend/", { params }).then(res => {
        const categories = [];
        const data = [];
        res.data.forEach(d => {
          categories.push(d.name);
          const count = _.sumBy(d.data, d2 => d2.pcCount);
          data.push(count);
        });
        this.updateChart(data, categories);

        this.chartData = res.data;
      });
    },
    updateChart(data, categories) {
      if (categories) {
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            xaxis: { categories }
          }
        };
      }
      this.series = [{ name: "검색량", data }];
    }
  }
};
</script>
