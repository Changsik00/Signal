/* eslint-disable vue/order-in-components */
<template>
  <section style="width: 100%; background-color: white;">
    <div class="search-keywords-layer">
      <div class="item" :class="{ active: tabIndex == 0 }" @click="tabIndex = 0">검색하기</div>
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
    <div
      v-if="tabIndex == 0"
      style="margin-top: 100px; display: flex; flex-direction: column;
            align-items: center;"
    >
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
          <div v-if="newKeywords.length < 4" @click="addKeywords">
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
          <v-btn color="success" dark>분석하기</v-btn>
          <v-btn color="blue-grey" dark @click="bookmark">즐겨찾기</v-btn>
        </div>
      </div>
    </div>
    <div v-else style="margin-top: 0px;">결과</div>

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
export default {
  data() {
    return {
      dialog: false,
      tabIndex: 0,
      currentSearchKeywordIndexData: [],
      searchKeywords: [],
      newKeywords: [""]
    };
  },
  computed: {
    ...mapGetters(["isLoading"])
  },
  created() {
    this.searchKeywords = [
      ["프래쉬코드"],
      ["다방", "직방"],
      ["배달의민족", "배달통", "요기요"]
    ];
  },
  methods: {
    getKeywordsTabTitle(data) {
      return data.join(" vs ");
    },
    getKeywordsTabTitle2() {
      return this.getKeywordsTabTitle(this.currentSearchKeywordIndexData);
    },
    clickKeywordTab(i) {
      this.tabIndex = i;
    },
    showDialog(data) {
      this.currentSearchKeywordIndexData = data;
      this.dialog = true;
    },
    deleteKeyword() {
      this.dialog = false;
      this.searchKeywords = this.searchKeywords.filter(
        d => d.join("") != this.currentSearchKeywordIndexData.join("")
      );
      setTimeout(() => (this.tabIndex = 0), 0);
    },
    addKeywords() {
      this.newKeywords.push("");
    },
    bookmark() {
      const newkeyword = this.newKeywords.filter(d => d.length != "");
      if (newkeyword.length > 0) {
        this.searchKeywords.push(newkeyword);
        this.newKeywords = [""];
      } else {
        this.$showToast(
          "키워드가 입력되지 않았습니다. 키워드를 입력해주시기 바랍니다."
        );
      }
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
