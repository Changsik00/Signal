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
    <div style="height: 100%; overflow-y: auto; padding: 100px 0;">
      <div v-if="tabIndex == 0" style="display: flex; flex-direction: column; align-items: center;">
        <div style="width: 500px; text-align: center;">
          빅데이터를 시각화하여 제공합니다.
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
        <LineChart :keywords="currentKeywordData"/>
        <VerticalBarChart :keywords="currentKeywordData"/>
        <BubbleChart :keywords="currentKeywordData"/>
      </div>
    </div>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-text>
          <div class="headline">{{ getKeywordsTabTitle2() }}</div>해당키워드를 삭제 하겠습니까?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">취소</v-btn>
          <v-btn color="primary" text @click="deleteKeyword">확인</v-btn>
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
    ...mapGetters(["isLoading"]),
    keywordCheck() {
      return this.currentKeywordData.some(d => d.length > 0);
    }
  },
  created() {
    this.searchKeywords = [
      ["프래쉬코드"],
      ["다방", "직방"],
      ["배달의민족", "배달통", "요기요"]
    ];

    const keyword = this.$route.params.keyword;
    if (keyword) {
      this.newKeywords.push(keyword)
    }
  },
  methods: {
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
        this.$showToast("키워드가 입력되지 않았습니다.<br>키워드를 입력해주시기 바랍니다.");
        return false;
      }
      return true;
    }, 
    bookmark() {
      if (!this.newKeywordsEmpyCheck()) return
      
      this.searchKeywords.push(this.allowKeywords);
      this.tabIndex = this.searchKeywords.length;
      this.newKeywords = [""];
    },
    drawChart() {
      if (!this.newKeywordsEmpyCheck()) return

      this.currentKeywordData = this.allowKeywords;
      console.log("#@# currentKeywordData", this.currentKeywordData);
      
    }
  }
};
</script>
<style lang="scss">
.search-keywords-layer {
  display: flex;
  border-bottom: 1px solid #aaaaaa;
  display: flex;
  align-items: center;
  & .item {
    padding: 10px 20px;
    cursor: pointer;
    &.active {
      border-bottom: 2px solid cadetblue;
    }
  }
}
</style>
