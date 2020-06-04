<template>
  <section style="background-color: white; width: 100%; height: 100%; overflow-y: auto;">
    <section class="container">
      <div class="sg-title mt30 center">
        가장 가치있는
        <br />키워드를 찾아드립니다.
      </div>
      <div style="margin-top: 30px; padding: 30px;">
        <v-radio-group v-model="radios" :row="true" class="justify-center">
          <v-radio label="Naver" value="Naver"></v-radio>
          <v-radio label="Youtube" value="Youtube"></v-radio>
          <v-radio label="Instagram" value="Instagram"></v-radio>
          <v-radio label="Twitter" value="Twitter"></v-radio>
        </v-radio-group>
        <div style="display:flex; align-items: center; justify-content: center; margin-top: -10px">
          <v-text-field v-model="keyword" solo flat class="search-form" placeholder="키워드를 입력하세요."></v-text-field>
          <v-btn flat dark class="search-button" @click="search">검색</v-btn>
        </div>
        <KeywordToolInfo v-if="test" style="margin-top: 80px;" />
        <div v-else>
          <div style="margin-top: 120px; font-size: 20px;">
            <span class="accent">{{keyword}}</span> 키워드 현황
          </div>
          <div class="top-chart-layer">
            <div class="top-chart-rect">
              <div class="keyword-tool-label">
                키워드 점수
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on">help</v-icon>
                  </template>
                  <div style="padding: 10px;">
                    키워드검색량과 경쟁 컨텐츠량을 시그널의 알고리즘으로 계산하여
                    사용자가 알기쉽게 보여 드립니다.
                    <br />*실시간데이터이기 때문에 점수가 변동될수있습니다.
                  </div>
                </v-tooltip>
              </div>
              <apexchart width="140%" :options="chartOptions1" :series="series1"></apexchart>
            </div>
            <div class="top-chart-rect">
              <div class="keyword-tool-label">
                키워드 검색량
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on">help</v-icon>
                  </template>
                  <div style="padding: 10px;">
                    키워드의 총 검색량을 보여드려, 해당 키워드를 사용자가 얼마나
                    검색을 하는지 확인할 수 있습니다.
                    <br />*실시간데이터이기 때문에 점수가 변동될수있습니다.
                  </div>
                </v-tooltip>
              </div>
              <apexchart width="140%" :options="chartOptions2" :series="series2"></apexchart>
            </div>
            <div class="top-chart-rect">
              <div class="keyword-tool-label">
                경쟁 컨텐츠량
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on">help</v-icon>
                  </template>
                  <div style="padding: 10px;">
                    키워드를 검색했을때 온라인상에 노출되어지는 경쟁 컨텐츠량을
                    보여드려 얼마나 많은 경쟁 컨텐츠가 있는지 알려드립니다.
                    <br />*실시간데이터이기 때문에 점수가 변동될수있습니다.
                  </div>
                </v-tooltip>
              </div>
              <apexchart width="140%" :options="chartOptions3" :series="series3"></apexchart>
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
                  온라인상에 키워드 입력시 가장 먼저 화면상에 노출되어지는 컨텐츠
                  정보를 확인하여 경쟁자의 컨텐츠 퀄리티를 확인할 수 있습니다.
                  <br />* 실시간 데이터이기 때문에 순서가 변동될 수 있습니다.
                </div>
              </v-tooltip>
            </div>
            <b-table class="mt30" :data="top3TableData" :columns="top3TableColumns"></b-table>
          </div>
          <div class="mt50">
            <div style="font-size: 20px;">
              <span class="accent">{{keyword}}</span> 추천 키워드 (4,343 검색)
            </div>
            <b-table
              class="mt30"
              :paginated="true"
              :pagination-simple="false"
              :per-page="10"
              :sort-icon="'arrow-up'"
              :sort-icon-size="'is-small'"
              :default-sort-direction="'desc'"
              :data="keywordTableData"
              :columns="keywordTableColumns"
              default-sort="point"
            ></b-table>
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
      test: true,
      keyword: "",
      radios: "Naver",
      colors: ["#1B5E20", "#7CB342", "#FDD835", "#F57C00", "#E64A19"],
      labels: ["매우 나쁨", "나쁨", "보통", "좋음", "매우 좋음"],
      series1: [0],
      series2: [0],
      series3: [0],
      chartOptions: {
        chart: {
          type: "radialBar"
        },
        colors: ["#E64A19"],
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
        stroke: {
          lineCap: "round"
        },
        labels: [""]
      },
      chartOptions1: {},
      chartOptions2: {},
      chartOptions3: {},
      top3TableColumns: [
        {
          field: "no",
          label: "NO",
          width: "40",
          numeric: true,
          centered: true
        },
        {
          field: "blog_name",
          label: "블로그 이름",
          centered: true
        },
        {
          field: "title",
          label: "제목",
          centered: true
        },
        {
          field: "visitor_count",
          label: "방문자수",
          centered: true
        }
      ],
      top3TableData: [
        {
          no: 1,
          blog_name: "윤마의 요지경",
          title: "체험단 리뷰나왔어요",
          visitor_count: 200
        },
        {
          no: 2,
          blog_name: "제이슨 스토리",
          title: "배달의 민족 후기",
          visitor_count: 300
        },
        {
          no: 3,
          blog_name: "킥커",
          title: "요기요 어때 후기",
          visitor_count: 2333
        }
      ],
      keywordTableColumns: [
        {
          field: "keyword",
          label: "키워드",
          centered: true,
          sortable: true
        },
        {
          field: "point",
          label: "키워드 점수",
          centered: true,
          sortable: true
        },
        {
          field: "search_count",
          label: "키워드 검색량",
          centered: true,
          sortable: true
        },
        {
          field: "content_count",
          label: "경쟁 컨텐츠량",
          centered: true,
          sortable: true
        }
      ],
      keywordTableData: [
        {
          keyword: "배달의민족폰트",
          point: 95,
          search_count: 2342,
          content_count: 13513
        },
        {
          keyword: "배달의민족매각",
          point: 100,
          search_count: 52323,
          content_count: 52156
        },
        {
          keyword: "배달의민족주식",
          point: 55,
          search_count: 5223,
          content_count: 567883
        },
        {
          keyword: "배달의민족수수료",
          point: 65,
          search_count: 5252,
          content_count: 36573
        },
        {
          keyword: "배달의민족폰트",
          point: 125,
          search_count: 3465,
          content_count: 15784
        },
        {
          keyword: "배달의민족매각",
          point: 45,
          search_count: 5682,
          content_count: 13313
        },
        {
          keyword: "배달의민족주식",
          point: 75,
          search_count: 9731,
          content_count: 6831
        },
        {
          keyword: "배달의민족수수료",
          point: 335,
          search_count: 2415,
          content_count: 4444
        },
        {
          keyword: "배달의민족폰트",
          point: 95,
          search_count: 2342,
          content_count: 13513
        },
        {
          keyword: "배달의민족매각",
          point: 92,
          search_count: 6783,
          content_count: 55555
        },
        {
          keyword: "배달의민족주식",
          point: 95,
          search_count: 1414,
          content_count: 112313
        },
        {
          keyword: "배달의민족수수료",
          point: 97,
          search_count: 3578,
          content_count: 3253
        },
        {
          keyword: "배달의민족폰트",
          point: 95,
          search_count: 2342,
          content_count: 13513
        },
        {
          keyword: "배달의민족매각",
          point: 35,
          search_count: 25473,
          content_count: 64362
        },
        {
          keyword: "배달의민족주식",
          point: 15,
          search_count: 242,
          content_count: 26426
        },
        {
          keyword: "배달의민족수수료",
          point: 45,
          search_count: 2472,
          content_count: 132123
        },
        {
          keyword: "배달의민족폰트",
          point: 95,
          search_count: 2342,
          content_count: 13513
        },
        {
          keyword: "배달의민족매각",
          point: 78,
          search_count: 1111,
          content_count: 45345
        },
        {
          keyword: "배달의민족주식",
          point: 34,
          search_count: 3333,
          content_count: 6322
        },
        {
          keyword: "배달의민족수수료",
          point: 234,
          search_count: 5555,
          content_count: 2324
        }
      ]
    };
  },
  watch: {
    keyword(value) {
      if (value == "") {
        this.test = true;
      }
    }
  },
  created() {
    // https://apexcharts.com/docs/chart-types/radialbar-gauge/
    this.setData();
  },
  methods: {
    getLevel(data) {
      if (data < 20) {
        return 0;
      } else if (data >= 20 && data < 40) {
        return 1;
      } else if (data >= 40 && data < 60) {
        return 2;
      } else if (data >= 60 && data < 80) {
        return 3;
      } else if (data >= 80) {
        return 4;
      }
    },
    setData() {
      this.series1 = [50];
      let level = this.getLevel(this.series1[0]);
      this.chartOptions1 = {
        ...this.chartOptions,
        ...{
          colors: [this.colors[level]],
          labels: [this.labels[level]]
        }
      };
      this.series2 = [24];
      level = this.getLevel(this.series2[0]);
      this.chartOptions2 = {
        ...this.chartOptions,
        ...{
          colors: [this.colors[level]],
          labels: [this.labels[level]]
        }
      };
      this.series3 = [78];
      level = this.getLevel(this.series3[0]);
      this.chartOptions3 = {
        ...this.chartOptions,
        ...{
          colors: [this.colors[level]],
          labels: [this.labels[level]]
        }
      };
    },
    search() {
      // todo request api
      this.test = false;
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

.top-chart-layer {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @include tablet {
    flex-direction: row;
  }
}

.top-chart-rect {
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  @include tablet {
    width: calc(33.33% - 1px);
  }
}
</style>
