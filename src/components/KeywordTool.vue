실제 해당 키워드를 검색 했을때 온라인상에 노출되어지는 컨텐츠를 순서대로
보여드려 경쟁 컨텐츠의 퀄리티를 확인할 수 있습니다.<template>
  <section style="background-color: white; width: 100%; height: 100%; overflow-y: auto">
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
        <div style="display:flex; align-items: center; justify-content: center; margin-top: -10px">
          <v-text-field v-model="keyword" solo flat class="search-form" placeholder="키워드를 입력하세요."></v-text-field>
          <v-btn flat dark class="search-button" @click="search">검색</v-btn>
        </div>
        <!-- <div v-if="keyword == ''" style="margin-top: 80px;"> -->
        <div v-if="false" style="margin-top: 80px;">
          <KeywordToolInfo />
        </div>
        <div style="margin-top: 120px; display:flex; position: relative; align-items: center;">
          <div class="top-chart-rect">
            <div class="keyword-tool-label">
              키워드 점수
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                <div style="padding: 10px;">
                  키워드검색량과 경쟁 컨텐츠량을 시그널의 알고리즘으로 계산하여 사용자가 알기쉽게 보여 드립니다.
                  <br />*실시간데이터이기 때문에 점수가 변동될수있습니다.
                </div>
              </v-tooltip>
            </div>
            <apexchart height="350" type="radialBar" :options="chartOptions" :series="series"></apexchart>
          </div>
          <div class="keyword-tool-divider"></div>
          <div class="top-chart-rect">
            <div class="keyword-tool-label">
              키워드 검색량
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                <div style="padding: 10px;">
                  키워드의 총 검색량을 보여드려, 해당 키워드를 사용자가 얼마나 검색을 하는지 확인할 수 있습니다.
                  <br />*실시간데이터이기 때문에 점수가 변동될수있습니다.
                </div>
              </v-tooltip>
            </div>
            <apexchart height="350" type="radialBar" :options="chartOptions" :series="series"></apexchart>
          </div>
          <div class="keyword-tool-divider"></div>
          <div class="top-chart-rect">
            <div class="keyword-tool-label">
              경쟁 컨텐츠량
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                <div style="padding: 10px;">
                  키워드를 검색했을때 온라인상에 노출되어지는 경쟁 컨텐츠량을 보여드려 얼마나 많은 경쟁 컨텐츠가 있는지 알려드립니다.
                  <br />*실시간데이터이기 때문에 점수가 변동될수있습니다.
                </div>
              </v-tooltip>
            </div>
            <apexchart height="350" type="radialBar" :options="chartOptions" :series="series"></apexchart>
          </div>
        </div>
        <div>
          <div id="half-donut"></div>
        </div>
        <div class="mt50">
          <div class="keyword-tool-label">
            키워드 Top3 노출 컨텐츠
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">help</v-icon>
              </template>
              <div style="padding: 10px;">
                온라인상에 키워드 입력시 가장 먼저 화면상에 노출되어지는 컨텐츠 정보를 확인하여 경쟁자의 컨텐츠 퀄리티를 확인할 수 있습니다.
                <br />* 실시간 데이터이기 때문에 순서가 변동될 수 있습니다.
              </div>
            </v-tooltip>
          </div>
        </div>
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
      colors: ["#1B5E20", "#7CB342", "#FDD835", "#F57C00", "#E64A19"],
      series: [75],
      chartOptions: {
        chart: {
          type: "radialBar",
          width: 200,
          height: 200
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#f6f6f6"
            },
            hollow: {
              size: "80%"
            },
            dataLabels: {
              name: {
                color: "#888"
              },
              value: {
                offsetY: -40,
                fontSize: "40px",
                formatter: function(val) {
                  return parseInt(val);
                }
              }
            }
          }
        },
        grid: {
          padding: {
            top: 20
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            colorStops: [
              {
                offset: 0,
                color: "#33691E"
              },
              {
                offset: 20,
                color: "#64DD17"
              },
              {
                offset: 40,
                color: "#FFD600"
              },
              {
                offset: 60,
                color: "#FFAB00"
              },
              {
                offset: 80,
                color: "#FF6D00"
              },
              {
                offset: 100,
                color: "#DD2C00"
              }
            ]
          }
        },
        stroke: {
          lineCap: "round"
        },
        labels: ["Average Results"]
      }
    };
  },
  created() {
    // https://apexcharts.com/vue-chart-demos/radialbar-charts/semi-circle-gauge/
    // http://bl.ocks.org/headwinds/c8730e6df1ad408c3aa102d663a16cf5
    // https://buefy.org/documentation/table/
    // https://vuetifyjs.com/ko/components/data-tables/
    // https://www.materialui.co/colors
    // https://gist.github.com/volodalexey/4e75aa8911c8bf764f1c169985c178b3
  },
  methods: {
    search() {}
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
  align-self: start;
  font-size: 18px;
  & > .v-icon {
    z-index: 10;
    margin-left: 5px;
    cursor: pointer;
  }
}

.keyword-tool-divider {
  width: 1px;
  height: 150px;
  background-color: $grey4;
}

.top-chart-rect {
  width: calc(33.33% - 1px);
  height: 220px;
  display: flex;
  padding: 0 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
