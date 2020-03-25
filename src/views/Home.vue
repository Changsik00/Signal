<template>
  <section>
    <div
      style=" font-size: 48px;
                              font-weight: bold;
                              text-align: center;
                              margin-top: 60px;
                              color: #393f45"
    >
      지금 당신의 관심사를 검색하세요.
    </div>
    <div
      style="font-size: 24px; color: #393f45; 
                             margin-top: 30px; text-align: center;"
    >
      당신의 서비스, 브랜드, 경쟁사등 다양한 소식을
      <br />카카오톡으로 쉽게 전달해드립니다.
    </div>
    <div
      style="display:flex; align-items:center; justify-content: center; margin-top: 30px;"
    >
      <v-text-field
        v-model="keyword"
        solo
        flat
        class="Normal-form"
        placeholder="키워드를 입력하세요."
      ></v-text-field>
      <v-btn flat dark class="Button-solid" @click="search">검색</v-btn>
    </div>

    <div style="margin-top: 50px; display: flex; justify-content: center;">
      <div style="width: 190px; text-align: center;">
        <img src="~@/assets/img/home/ico-main-1.svg" />
        <div style=" font-size: 16px; font-weight: bold; color: #393f45;">
          분석
        </div>
      </div>
      <div style="width: 190px; text-align: center;">
        <img src="~@/assets/img/home/ico-main-2.svg" />
        <div style=" font-size: 16px; font-weight: bold; color: #393f45;">
          모니터링
        </div>
      </div>
      <div style="width: 190px; text-align: center;">
        <img src="~@/assets/img/home/ico-main-3.svg" />
        <div style=" font-size: 16px; font-weight: bold; color: #393f45;">
          트랜드
        </div>
      </div>
      <div style="width: 190px; text-align: center;">
        <img src="~@/assets/img/home/ico-main-4.svg" />
        <div style=" font-size: 16px; font-weight: bold; color: #393f45;">
          이슈어
        </div>
      </div>
      <div style="width: 190px; text-align: center;">
        <img src="~@/assets/img/home/ico-main-5.svg" />
        <div style=" font-size: 16px; font-weight: bold; color: #393f45;">
          칸반보드
        </div>
      </div>
    </div>
    <div
      style="margin-top: 50px; background-color: #24c185; 
                                padding: 30px; text-align: center; color: #ffffff;"
    >
      <div style="font-size: 30px; font-weight: bold;">
        키워드 데이터를 한 곳에서 확인하세요!
      </div>
      <div style="font-size: 16px; font-weight: bold;">
        온라인상에 흩어져 있던 키워드 데이터를 한 곳으로 모아드립니다.
        <br />내가 관심을 가지고 있던 키워드를 한 눈에 확인할 수 있고, 새로운
        데이터를 실시간으로 알려드립니다.
      </div>
    </div>
    <div style="margin-top: 50px; display:flex; justify-content: center;">
      <div
        style="display:flex; flex-direction: column; width: 240px; align-items: center;"
      >
        <img width="40" src="~@/assets/img/home/ico-insta.png" />
        <img src="~@/assets/img/home/img-insta.png" />
      </div>
      <div
        style="margin-top: 78px; display:flex; flex-direction: column; width: 240px; align-items: center;"
      >
        <img width="40" src="~@/assets/img/home/ico-twitter.png" />
        <img src="~@/assets/img/home/img-twitter.png" />
      </div>
      <div
        style="display:flex; flex-direction: column; width: 240px; align-items: center;"
      >
        <img width="40" src="~@/assets/img/home/ico-facebook.png" />
        <img src="~@/assets/img/home/img-facebook.png" />
      </div>
      <div
        style="margin-top: 78px; display:flex; flex-direction: column; width: 240px; align-items: center;"
      >
        <img width="40" src="~@/assets/img/home/ico-naver.png" />
        <img src="~@/assets/img/home/img-naver.png" />
      </div>
    </div>
    <div
      style="margin-top: 150px; display: flex; justify-content: center; align-items: center;"
    >
      <div style="flex-grow: 1; max-width: 470px;">
        <div style="color: #24c185; font-size: 18px; font-weight: bold;">
          분석
        </div>
        <div style="font-size: 36px; font-weight: bold;">
          키워드 데이터를 정확하게!
        </div>
        <div style="margin-top: 20px; font-size: 16px;">
          관심 산업 또는 제품에 대한 검색량 추이, 연관어 데이터를 제공하여 현재
          키워드 상태와 앞으로의 전망을 명확하게 판단할 수 있습니다.
        </div>
      </div>
      <img
        style="flex-grow: 1; max-width: 470px;"
        src="~@/assets/img/home/img-data-1.svg"
      />
    </div>
    <div
      style="margin-top: 150px; display: flex; justify-content: center; align-items: center;"
    >
      <div style="flex-grow: 1; max-width: 470px;">
        <div style="color: #24c185; font-size: 18px; font-weight: bold;">
          모니터링
        </div>
        <div style="font-size: 36px; font-weight: bold;">
          경쟁사 소식을 실시간으로!
        </div>
        <div style="margin-top: 20px; font-size: 16px;">
          매일 온라인에서 찾아보던 경쟁사 소식을 이제는 찾아볼 필요 없이 소식이
          있을 때마다 실시간 업데이트하여 알려드립니다.
        </div>
      </div>
      <img
        style="flex-grow: 1; max-width: 470px; width: auto;"
        src="~@/assets/img/home/img-data-2.svg"
      />
    </div>
    <div
      style="margin-top: 150px; display: flex; justify-content: center; align-items: center;"
    >
      <div style="flex-grow: 1; max-width: 470px;">
        <div style="color: #24c185; font-size: 18px; font-weight: bold;">
          트렌드
        </div>
        <div style="font-size: 36px; font-weight: bold;">
          실시간 이슈를 쉽고 빠르게!
        </div>
        <div style="margin-top: 20px; font-size: 16px;">
          매일 일어나는 실시간 검색어를 12시간 누적데이터 기준으로 정리해
          제공함으로써 그날의 이슈를 쉽게 확인할 수 있습니다.
        </div>
      </div>
      <img
        style="flex-grow: 1; max-width: 470px; width: auto;"
        src="~@/assets/img/home/img-data-3.svg"
      />
    </div>
    <div style="margin-top: 50px; background-color: #f0f0f0; padding: 50px 0;">
      <div style="text-align: center; font-size: 36px; font-weight: bold;">
        우리의 서비스는 원칙이 있습니다.
      </div>
      <div style="margin-top: 80px; display: flex; justify-content: center;">
        <div style="width: 320px; text-align: center;">
          <img src="~@/assets/img/home/ico-service-1.svg" />
          <div style="font-size: 18px;">정확한 데이터</div>
          <div style="font-size: 16px; margin-top: 10px;">
            사용자가 원하는 데이터를 설저한 키워드에 맞춰 정확하게 제공합니다.
          </div>
        </div>
        <div style="width: 320px; text-align: center;">
          <img src="~@/assets/img/home/ico-service-2.svg" />
          <div style="font-size: 18px;">사용자 중심 디자인</div>
          <div style="font-size: 16px; margin-top: 10px;">
            한눈에 다양한 데이터를 쉽고 빠르게 이해할 수 있도록 디자인 합니다.
          </div>
        </div>
        <div style="width: 320px; text-align: center;">
          <img src="~@/assets/img/home/ico-service-3.svg" />
          <div style="font-size: 18px;">서비스 업데이트</div>
          <div style="font-size: 16px; margin-top: 10px;">
            보다 퀘적한 환경에서 사용할 수 있게 지속적인 서비스 업데이트를
            합니다.
          </div>
        </div>
      </div>
      <div style="margin-top: 80px; display: flex; justify-content: center;">
        <div style="width: 320px; text-align: center;">
          <img src="~@/assets/img/home/ico-service-4.svg" />
          <div style="font-size: 18px;">신속한 응답률</div>
          <div style="font-size: 16px; margin-top: 10px;">
            문의하신 내용은 접수순서대로 최대한 빠르게 처리합니다.
          </div>
        </div>
        <div style="width: 320px; text-align: center;">
          <img src="~@/assets/img/home/ico-service-5.svg" />
          <div style="font-size: 18px;">자동화 툴</div>
          <div style="font-size: 16px; margin-top: 10px;">
            한번만 키워드를 입력하면 추가로 입력할 필요없이 관심 키워드를
            지속적으로 받을 수 있습니다.
          </div>
        </div>
        <div style="width: 320px; text-align: center;">
          <img src="~@/assets/img/home/ico-service-6.svg" />
          <div style="font-size: 18px;">상담 봇</div>
          <div style="font-size: 16px; margin-top: 10px;">
            채팅 상담봇을 이용하여 간단한 문제는 스스로 확인할 수 있으며, 1:1
            상담을 통해서도 다양한 문제에 답변을 받을 수 있습니다.
          </div>
        </div>
      </div>
    </div>
    <v-carousel
      height="auto"
      hide-delimiters
      light
      style="box-shadow:none; max-width: 1024px; margin: auto; padding-top: 50px"
    >
      <v-carousel-item v-for="(item, i) in itemList" :key="i">
        <v-layout align-center fill-height style="padding: 0 70px;">
          <div style="text-align: left; flex-grow:1;">
            <div
              style="width: 75px; text-align: center; color: #24c185; border-radius: 2px; 
                                       border: solid 1px #24c185; padding: 2px 5px;"
            >
              EASY
            </div>
            <div style="font-weight: bold; font-size: 20px; color: #393f45">
              {{ item.title }}
            </div>
            <div v-html="item.info"></div>
          </div>

          <div
            style="min-width: 166px;
                                      min-height: 166px;
                                      margin: auto;
                                      border-radius: 50%;
                                      border: solid 1px #979797;
                                      background-color: #979797;"
          ></div>
        </v-layout>
      </v-carousel-item>
    </v-carousel>
    <div
      style="margin-top: 50px; background-color: #f0f0f0; padding: 50px 0; text-align: center"
    >
      <div style="font-size: 36px; font-weight: 300;">
        모든 소셜미디어 관리를 한 곳에서 시작하세요!
      </div>
      <div
        style="font-size: 18px; font-weight: 300; margin: 20px auto 0 auto; max-width: 1024px;"
      >
        키워드 검색량, 모니터링, 이슈트래킹, 통계까지 복잡하고 어려웠던
        소셜미디어 관리를 이제는 시그널에서 쉽고 빠르게 관리할 수 있도록
        도와드립니다.
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import Footer from "../components/Footer";
export default {
  components: { Footer },
  data() {
    return {
      keyword: "",
      selectItem: "",
      selectItems: ["뉴스", "블로그", "카페"],
      itemList: [
        {
          title: "EASY  검색은 간편! 정보는 정확!",
          info:
            "키워드만 입력해서 검색하면 소셜미디어상에<br>다양한 정보를 한꺼번에 받아볼 수 있어요!",
          imgUrl: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          title: "ONE  많은 소셜미디어 계정 관리를 하나의 채널에서!",
          info:
            "페이스북, 인스타, 트위터등 관리해야할 많은<br>소셜미디어를 하나의의 채널에서 관리할 수 있어 편리해요!",
          imgUrl: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          title: "SAVE  시간을 절약 할 수 있어요!",
          info:
            "다양한 소셜미디어 채널에 글을 한번에<br>작성할 수 있어 시간을 절약할 수 있어요!",
          imgUrl: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          title: "DATA 경쟁사를 알게 되었어요!",
          info:
            "항상 궁금했지만 알 수 없었던 경쟁사와<br>우리의 현재 상황을 명확하게 인지할 수있게 되었어요.",
          imgUrl: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ]
    };
  },
  created() {
    this.resetSearch();
  },
  methods: {
    search() {
      if (this.keyword.length > 0) {
        this.$router.push({
          name: "main",
          params: { keyword: this.keyword, type: this.selectItem }
        });
        this.resetSearch();
      }
    },
    resetSearch() {
      this.selectItem = this.selectItems[0];
      this.keyword = "";
    }
  }
};
</script>

<style lang="scss">
.home-layer-margin {
  margin-top: 60px;
  @include tablet {
    margin-top: 100px;
  }
  &.bottom {
    margin-bottom: 60px;
    @include tablet {
      margin-bottom: 100px;
    }
  }
}

.home-number-margin {
  margin: 0 30px;
  @include tablet {
    margin: 0 90px;
  }
}

.home-layer1 {
  max-width: $desktop-width;
  width: 100%;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @include tablet {
    flex-direction: row;
  }
  & > .item {
    width: 100%;
    padding: 10px 20px;
    @include tablet {
      width: 50%;
      padding: 0 20px;
    }
  }
}

.circle-size {
  width: 60px !important;
  height: 60px !important;
  margin: 5px 10px;
  @include tablet {
    width: 80px !important;
    height: 80px !important;
    margin: 10px;
  }
  @include desktop {
    margin: 10px 20px;
  }
}

.Normal-form {
  width: 330px;
  max-width: 330px;
  height: 50px;
  border-radius: 4px;
  border: solid 1px #dbdbdb;
}

.Button-solid {
  width: 120px;
  height: 50px;
  border-radius: 4px;
  background-color: var(--greenblue);
}
</style>
