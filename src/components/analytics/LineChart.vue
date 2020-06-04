<template>
  <section style="padding: 50px; ">
    <div style="display:flex; align-items: center;">
      <ChartRagneSelector
        :title="'검색량 추이'"
        :sub-title="'기간별 키워드의 검색량을 보여드림으로써 트렌드의 흐름을 파악할 수 있습니다.'"
        :start="start"
        :end="end"
        @change="rangeChange"
      />
    </div>
    <div id="chart" style="width: 1000px; margin: auto; padding: 20px;">
      <apexchart height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </section>
</template>
<script>
import dayjs from "dayjs"
import ChartRagneSelector from "./ChartRagneSelector"
export default {
  components: { ChartRagneSelector },
  props: ["keywords"],
  data() {
    return {
      start: null,
      end: null,
      series: [],
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
          min: dayjs()
            .subtract(3, "year")
            .$d.getTime(),
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
    }
  },
  watch: {
    keywords(value, old) {
      if (_.isEqual(value, old)) {
        return
      }
      this.setData()
    }
  },
  created() {
    this.setData()
  },
  methods: {
    rangeChange(currentRange) {
      switch (currentRange) {
        case "all":
          this.chartOptions = {
            xaxis: {
              min: undefined
            }
          }
          break
        case "year":
          this.chartOptions = {
            xaxis: {
              min: dayjs()
                .subtract(12, "month")
                .add(1, "day")
                .$d.getTime()
            }
          }
          break
        case "half":
          this.chartOptions = {
            xaxis: {
              min: dayjs()
                .subtract(6, "month")
                .add(1, "day")
                .$d.getTime()
            }
          }
          break
        case "quarter":
          this.chartOptions = {
            xaxis: {
              min: dayjs()
                .subtract(3, "month")
                .add(1, "day")
                .$d.getTime()
            }
          }
          break
      }
    },
    setData() {
      this.series = []
      const series = []
      this.chartData = []
      const params = {
        keyword: this.keywords.join(","),
        start_date: dayjs()
          .subtract(3, "year")
          .format("YYYY-MM"),
        end_date: dayjs()
          .subtract(1, "month")
          .format("YYYY-MM")
      }
      this.$axios.get("/naver/trend/", { params }).then(res => {
        this.start = res.data[0].data[0].period
        this.end = res.data[0].data[res.data[0].data.length - 1].period
        res.data.forEach(d => {
          const data = d.data.map(d2 => [dayjs(d2.period).$d.getTime(), d2.pcCount])
          series.push({ name: d.name, data })
        })
        this.series = series
      })
    }
  }
}
</script>
