<template>
  <section style="width: 100%; background-color: white;">
    <div class="search-keywords-layer">
      <div class="item" :class="{ active: tabIndex == 0 }" @click="clickKeywordTab(0)">검색하기</div>
      <div
        v-for="(item, i) in searchKeywords"
        :key="i"
        class="item"
        :class="{ active: tabIndex == i + 1 }"
        @click="clickKeywordTab(i + 1)"
      >
        {{ getKeywordsTabTitle(item) }}
        <v-icon style="font-size: 20px; margin-left: 5px;" @click="showDialog(item)">close</v-icon>
      </div>
    </div>
    <div style="height: 100%; overflow-y: auto; padding-bottom: 30px;">
      <div style="max-width: 1024px; margin: 0 auto;">
        <div
          v-if="tabIndex == 0"
          style="display: flex; flex-direction: column; align-items: center;"
        >
          <div style="margin-top: 30px; width: 500px; text-align: center;">
            <div style="font-size: 36px; font-weight: bold;">빅데이터를 시각화하여 제공합니다.</div>
            <div style="margin-top: 20px;">
              <div v-for="(keyword, i) in newKeywords" :key="i">
                <v-text-field
                  v-model="newKeywords[i]"
                  :label="'keyword' + (i + 1)"
                  placeholder="분석하기 원하는 키워드를 입력하세요"
                  outline
                  flat
                ></v-text-field>
              </div>
              <div v-if="newKeywords.length < 3" @click="addKeywords">
                <div
                  style="display:flex; align-items: center; padding: 10px 20px; 
                border: 2px dotted #888888; border-radius: 5px;"
                >
                  <div
                    style="flex-grow: 1; text-align: left; color: #888888; padding-top: 4px;"
                  >비교 분석하기 원하는 키워드를 추가하세요</div>
                  <v-icon>add</v-icon>
                </div>
              </div>
            </div>
            <div style="margin-top: 30px;">
              <v-btn color="success" dark @click="drawChart">분석하기</v-btn>
              <v-btn color="blue-grey" dark @click="bookmark">즐겨찾기</v-btn>
            </div>
          </div>
        </div>
        <div v-if="keywordCheck">
          <HorizontalBarChart :keywords="currentKeywordData" />
          <LineChart :keywords="currentKeywordData" />
          <VerticalBarChart :keywords="currentKeywordData" />
          <BubbleChart :keywords="currentKeywordData" />
        </div>
      </div>
    </div>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-text>
          <div class="headline">{{ getKeywordsTabTitle2() }}</div>해당키워드를 삭제 하겠습니까?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey" dark @click="dialog = false">취소</v-btn>
          <v-btn color="success" dark @click="deleteKeyword">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import HorizontalBarChart from "./HorizontalBarChart";
import VerticalBarChart from "./VerticalBarChart";
import LineChart from "./LineChart";
import BubbleChart from "./BubbleChart";

export default {
  components: {
    HorizontalBarChart,
    LineChart,
    VerticalBarChart,
    BubbleChart
  },
  data() {
    return {
      dialog: false,
      tabIndex: 0,
      currentKeywordData: [],
      searchKeywords: [],
      newKeywords: [],
      allowKeywords: []
    };
  },
  computed: {
    ...mapGetters(["isLogin"]),
    keywordCheck() {
      return this.currentKeywordData.some(d => d.length > 0);
    }
  },
  created() {
    this.requestKeyword();
  },
  methods: {
    requestKeyword() {
      if (this.isLogin) {
        // todo api 연동
      } else {
        this.searchKeywords = JSON.parse(
          localStorage.getItem("ANALYTICS_LIST")
        );
        if (!this.searchKeywords) {
          this.searchKeywords = [
            ["삼성화재"],
            ["제주항공", "진에어"],
            ["배달의민족", "배달통", "요기요"]
          ];

          localStorage.setItem(
            "ANALYTICS_LIST",
            JSON.stringify(this.searchKeywords)
          );
        }

        let keyword = this.$route.params.keyword;
        if (keyword) {
          localStorage.setItem("ANALYTICS_KEYOWRD", keyword);
        } else {
          keyword = localStorage.getItem("ANALYTICS_KEYOWRD");
          if (!keyword) {
            keyword = "";
          }
        }
        console.log("#@# keywrod", keyword);
        this.newKeywords.push(keyword);
      }
    },
    getKeywordsTabTitle(data) {
      return data.join(" vs ");
    },
    getKeywordsTabTitle2() {
      return this.getKeywordsTabTitle(this.currentKeywordData);
    },
    clickKeywordTab(i) {
      this.tabIndex = i;
      if (this.tabIndex == 0) {
        this.currentKeywordData = this.allowKeywords;
      } else {
        this.currentKeywordData = this.searchKeywords[i - 1];
      }
    },
    showDialog(data) {
      this.currentKeywordData = data;
      this.dialog = true;
    },
    deleteKeyword() {
      this.dialog = false;
      this.searchKeywords = this.searchKeywords.filter(
        d => d.join("") != this.currentKeywordData.join("")
      );

      this.tabIndex = 0;
      this.currentKeywordData = [];
    },
    addKeywords() {
      this.newKeywords.push("");
    },
    newKeywordsEmpyCheck() {
      this.allowKeywords = this.newKeywords.filter(d => d.length != "");
      if (this.allowKeywords.length == 0) {
        this.$showToast(
          "키워드가 입력되지 않았습니다.<br>키워드를 입력해주시기 바랍니다."
        );
        return false;
      }
      return true;
    },
    bookmark() {
      if (!this.newKeywordsEmpyCheck()) return;

      this.searchKeywords.push(this.allowKeywords);
      this.tabIndex = this.searchKeywords.length;
      this.newKeywords = [""];

      if (!this.isLogin) {
        localStorage.setItem(
          "ANALYTICS_LIST",
          JSON.stringify(this.searchKeywords)
        );
      }
    },
    drawChart() {
      if (!this.newKeywordsEmpyCheck()) return;
      this.currentKeywordData = this.allowKeywords;
    }
  }
};
</script>
<style lang="scss">
.search-keywords-layer {
  display: flex;
  align-items: flex-start;
  width: 100%;
  border-bottom: 1px solid #aaaaaa;
  overflow-x: auto;
  overflow-y: hidden;
  & .item {
    display: inline-block;
    height: 50px;
    line-height: 52px;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0 20px;
    flex-shrink: 0;
    cursor: pointer;
    &.active {
      border-bottom: 2px solid cadetblue;
    }
  }
}
</style>
