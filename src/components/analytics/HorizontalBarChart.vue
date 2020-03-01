<template>
  <section style="padding: 50px; ">
    <div style="display:flex;">
      <div style="flex-grow: 1;">
        검색량 (수집기간:
        {{ computedDateFormatted }} ~ {{ computedDateFormatted2 }})
      </div>
      <div style="margin-top: -20px; display:flex; align-items: center">
        <v-menu v-model="menu1" :close-on-content-click="false" max-width="290px" min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field
              :value="computedDateFormatted"
              prepend-icon="event"
              clearable
              readonly
              style="width: 175px;"
              v-on="on"
              @click:clear="date = null"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title locale="ko" @change="menu1 = false"></v-date-picker>
        </v-menu>
        <div style="font-size: 25px; color: #888888">&nbsp;~&nbsp;</div>
        <v-menu v-model="menu2" :close-on-content-click="false" max-width="290px" min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field
              :value="computedDateFormatted2"
              clearable
              readonly
              style="width: 140px;"
              v-on="on"
              @click:clear="date2 = null"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date2" no-title locale="ko" @change="menu2 = false"></v-date-picker>
        </v-menu>
      </div>
    </div>
    <div style="width: 1000px; margin: auto; padding: 20px;">
      <apexchart type="bar" height="250" :options="chartOptions" :series="series"></apexchart>
    </div>
  </section>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      date: null,
      date2: null,
      menu1: false,
      menu2: false,
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
  computed: {
    computedDateFormatted() {
      return this.date ? moment(this.date).format("LL") : "";
    },
    computedDateFormatted2() {
      return this.date2 ? moment(this.date2).format("LL") : "";
    }
  }
};
</script>
