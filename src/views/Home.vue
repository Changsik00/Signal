<template>
  <section>
    <div
      style=" font-size: 36px;
              font-weight: bold;
              font-style: normal;
              text-align: center;
              margin-top: 100px;
              color: #393f45"
    >지금 당신의 관심사를 검색하세요.</div>
    <div style="color: #393f45; margin-top: 10px; text-align: center;">
      당신의 서비스, 브랜드, 경쟁사등 다양한 소식을
      <br />카카오톡으로 쉽게 전달해드립니다.
    </div>
    <div
      class="home-layer-margin"
      style="display: flex; 
                justify-content: center;  
                background-color: #f6f7f9; 
                padding: 30px 0; 
                text-align: center;"
    >
      <div>
        <div style="color: #272c31; font-size: 14px;">전달된 소식</div>
        <div style="color: #34d499; font-size: 36px;">123,323</div>
      </div>
      <div class="home-number-margin">
        <div style="color: #272c31; font-size: 14px;">전달된 소식</div>
        <div style="color: #34d499; font-size: 36px;">123,323</div>
      </div>
      <div>
        <div style="color: #272c31; font-size: 14px;">전달된 소식</div>
        <div style="color: #34d499; font-size: 36px;">123,323</div>
      </div>
    </div>
    <div class="home-layer-margin">
      <v-layout v-for="(item, index) in this.itemList" :key="index">
        <div class="home-layer1">
          <div class="item">
            <div style="font-weight: bold; font-size: 20px; color: #393f45">{{item.title}}</div>
            <div>{{item.info}}</div>
          </div>
          <div class="item">
            <v-img :src="item.imgUrl"></v-img>
          </div>
        </div>
      </v-layout>
    </div>
    <div class="home-layer-margin">
      <v-layout>
        <div class="home-layer1">
          <div
            class="item"
            style="font-size: 24px; font-weight: 300; color: #393f45"
          >이미 23,444 파트너사가 시그널을 이용하여 원하는 관심사를 받아보고 계십니다.</div>
          <div class="item">
            <div style="text-align: center">
              <v-avatar class="circle-size" v-for="(url, index) in imgList1" :key="index">
                <img :src="url" />
              </v-avatar>
            </div>
            <div style="text-align: center">
              <v-avatar class="circle-size" v-for="(url, index) in imgList2" :key="index">
                <img :src="url" />
              </v-avatar>
            </div>
          </div>
        </div>
      </v-layout>
    </div>
    <div class="home-layer1 home-layer-margin bottom">
      <v-carousel hide-delimiters light height="200" style="box-shadow:none; padding: 0 20px;">
        <v-carousel-item v-for="(img, i) in imgList3" :key="i">
          <v-layout align-center justify-center fill-height>
            <div style="text-align: center; flex-grow: 1;">
              <div>EASY {{i}}</div>
              <div>검색은 간편! 정보는 정확!</div>
              <div>
                키워드만 입력해서 검색하면 소셜미디어상에
                <br />다양한 정보를 한꺼번에 받아볼 수 있어요!
              </div>
              <div>줌마렐라 이기원 대표</div>
            </div>
            <div style="text-align: center; flex-grow: 1;">
              <v-avatar>
                <img :src="img" />
              </v-avatar>
            </div>
          </v-layout>
        </v-carousel-item>
      </v-carousel>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      itemList: [
        {
          title: "원하는 소식만 정확하게!",
          info:
            "나의 서비스나 경쟁사 뉴스 또는 평상시 관심 있었던 주제등 키워드를 지정하여 원하는 소식만 정확하게 전달해 드립니다.",
          imgUrl: "https://t1.kakaocdn.net/kakaocorp/admin/main-banner/1657"
        },
        {
          title: "경쟁사 소식을 실시간으로!",
          info:
            "매일 온라인에서 찾아보던 경쟁사 소식을 이제는 찾아볼 필요 없이 소식이 있을 때마다 실시간 업데이트 하여 카카오톡으로 알려드립니다.",
          imgUrl:
            "https://t1.kakaocdn.net/kakaocorp/operating/co/main-banner/3189.png"
        },
        {
          title: "카카오톡으로 쉽고 빠르게!",
          info:
            "회원가입이나 로그인 없이 평상시 사용하던 카카오톡에서 키워드 입력만으로 쉽게 받아볼 수 있습니다.",
          imgUrl: "https://t1.kakaocdn.net/kakaocorp/admin/main-banner/1652"
        }
      ],
      imgList1: [
        "https://picsum.photos/510/300?image=1",
        "https://picsum.photos/510/300?image=10",
        "https://picsum.photos/510/300?image=20"
      ],
      imgList2: [
        "https://picsum.photos/510/300?image=30",
        "https://picsum.photos/510/300?image=40",
        "https://picsum.photos/510/300?image=50"
      ],
      imgList3: [
        "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
      ]
    };
  },
  methods: {},
  computed: {
    isColumnWhenXs() {
      const bindText = {};

      if (this.$vuetify.breakpoint.xs) {
        bindText.column = true;
      }

      return bindText;
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
</style>
