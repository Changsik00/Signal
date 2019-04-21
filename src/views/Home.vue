<template>
  <v-container class="mainArea1" fluid pa-0>
        <v-layout align-center justify-center pt68>
            <v-flex Text1-1>{{ itemList.title }}</v-flex>
        </v-layout>
        <v-layout align-center justify-center column pt10>
            <v-flex Text1-2>{{ itemList.info }}</v-flex>
        </v-layout>
        <br>
        <v-layout align-center justify-center>
            <v-flex xs5 offset-xs2>
                <v-layout style="max-height:75px;">
                    <v-text-field v-if="isSizePc" solo flat class="Normal-form" placeholder="원하시는 키워드를 입력하세요 :)"></v-text-field>
                    <v-text-field v-else solo flat class="Normal-form" placeholder="키워드를 입력하세요 :)"></v-text-field>
                </v-layout>
            </v-flex>
            <v-flex xs4>
                <v-btn v-if="isSizePc" flat dark class="Button-solid">검색</v-btn>
                <v-btn v-else flat dark icon class="Button-solid">
                    <i class="material-icons">search</i>
                </v-btn>
            </v-flex>
        </v-layout>
        <v-flex class="GrayBoxPadding">
            <div class="grey lighten-4 GrayBox">
                <v-layout align-center justify-center v-bind="isColumnWhenXs">
                    <!-- <v-flex xs3></v-flex> -->
                    <v-flex xs2 v-for="(item, index) in this.itemList.cntInfoList" :key="index">
                        <v-layout align-center column>
                            <v-flex Text1-5 pt24>{{ item.title }}</v-flex>
                            <v-flex Text1-6 pt1>{{ getCount(item.count) }}</v-flex>
                        </v-layout>
                    </v-flex>
                    <!-- <v-flex xs3></v-flex> -->
                </v-layout>
            </div>
        </v-flex>
    </v-container>
</template>
<script>
export default {
  data() {
        return {
            itemList: {
                title: "지금 당신의 관심사를 검색하세요",
                info: "당신의 서비스, 브랜드, 경쟁사등 다양한 소식을 카카오톡으로 쉽게 전달해드립니다.",
                cntInfoList: [{
                        title: "전달된 소식",
                        count: 123456
                    },
                    {
                        title: "관심 키워드",
                        count: 4321
                    },
                    {
                        title: "사용자 수",
                        count: 567
                    }
                ]
            }
        };
    },
    methods: {
        getCount(count) {
            return count.toLocaleString();
        }
    },
    computed: {
        isColumnWhenXs() {
            const bindText = {};

            if (this.$vuetify.breakpoint.xs) {
                bindText.column = true;
            }

            return bindText;
        },
        isSizePc() {
            return !this.$vuetify.breakpoint.xs;
        }
    }
};
</script>
<style lang="scss" scoped>
.home {
  padding: 60px 0;
}
.title {
  font-size: 36px !important;
  font-weight: bold;
  color: $charcoal-grey;
}

.sub-title {
  color: $charcoal-grey;
  font-size: 16px;
}

.Normal-form {
  display: inline-block;
  vertical-align: middle;
  width: 330px;
  height: 50px;
  border-radius: 4px;
  border: solid 1px #dbdbdb;
  background-color: white;
}

.Button-solid {
  width: 120px;
  height: 50px;
  border-radius: 4px;
  background-color: $greenblue;
  font-size: 16px;
  color: white;
}
</style>
