실제 해당 키워드를 검색 했을때 온라인상에 노출되어지는 컨텐츠를 순서대로
보여드려 경쟁 컨텐츠의 퀄리티를 확인할 수 있습니다.<template>
  <section
    style="background-color: white; width: 100%; height: 100%; overflow-y: auto"
  >
    <section class="container">
      <div class="sg-title mt30 center">
        가장 가치있는
        <br />키워드를 찾아드립니다.
      </div>
      <div style="margin-top: 30px; padding: 30px; text-align: center;">
        <v-radio-group v-model="radios" :row="true" class="justify-center">
          <v-radio label="Youtube" value="Youtube"></v-radio>
          <v-radio label="Naver" value="Naver"></v-radio>
          <v-radio label="Instagram" value="Instagram"></v-radio>
          <v-radio label="Twitter" value="Twitter"></v-radio>
        </v-radio-group>
        <div
          style="display:flex; align-items: center; justify-content: center; margin-top: -10px"
        >
          <v-text-field
            v-model="keyword"
            solo
            flat
            class="search-form"
            placeholder="키워드를 입력하세요."
          ></v-text-field>
          <v-btn flat dark class="search-button" @click="search">검색</v-btn>
        </div>
        <!-- <div v-if="keyword == ''" style="margin-top: 80px;"> -->
        <div v-if="false" style="margin-top: 80px;">
          <KeywordToolInfo />
        </div>

        <div>
          <apexchart
            height="350"
            type="radialBar"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
        <div>
          <div id="half-donut"></div>
        </div>
        <section>
          <div class="keyword-tool-label">
            키워드 Top3 노출 컨텐츠
            <v-icon>help</v-icon>
          </div>
          <v-data-table
            dark
            :headers="headers"
            :items="desserts"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.calories }}</td>
              <td class="text-xs-right">{{ props.item.fat }}</td>
              <td class="text-xs-right">{{ props.item.carbs }}</td>
              <td class="text-xs-right">{{ props.item.protein }}</td>
              <td class="text-xs-right">{{ props.item.iron }}</td>
            </template>
          </v-data-table>
        </section>
      </div>
    </section>
  </section>
</template>
<script>
import KeywordToolInfo from "./KeywordToolInfo";
export default {
  components: { KeywordToolInfo },
  data() {
    return {
      radios: "Youtube",
      keyword: "",
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
      ],
      series: [76],
      chartOptions: {
        chart: {
          type: "radialBar",
          offsetY: -20,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#f0f0f0",
              strokeWidth: "98%",
              margin: 5 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true
              },
              value: {
                offsetY: -10,
                fontSize: "30px"
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 25, 75, 100]
          }
        },
        labels: ["Average Results"]
      }
    };
  },
  created() {
    this.drawHalfDonot();

    // https://v15.vuetifyjs.com/ko/components/data-tables
    // https://vuetifyjs.com/ko/components/data-tables/
    // https://zbciok.eu/java/index.php/2019/09/10/vue-js-v-data-tablevuetify-crud-example/
  },
  methods: {
    search() {},
    drawHalfDonot() {
      // https://stackoverflow.com/questions/18198252/d3-arc-gradient
      // http://bl.ocks.org/mbostock/5100636
      // https://bl.ocks.org/adamjanes/53eedf0b915fd8b20f04fd08bc24ff00
    }
  }
};
</script>
<style lang="scss">
.v-radio {
  margin: 10px;
}

.keyword-tool-label {
  display: flex;
  color: $grey6;
  font-size: 18px;

  & > .v-icon {
    cursor: pointer;
  }
}
</style>
