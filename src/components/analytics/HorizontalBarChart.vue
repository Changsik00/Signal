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
    <div id="chart">
      <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
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
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
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
