<template>
  <section>
    <div
      style=" font-size: 48px;
              font-weight: bold;
              text-align: center;
              margin-top: 60px;
              color: #393f45"
    >지금 당신의 관심사를 검색하세요.</div>
    <div
      style="font-size: 24px; color: #393f45; 
             margin-top: 30px; text-align: center;"
    >
      당신의 서비스, 브랜드, 경쟁사등 다양한 소식을
      <br />카카오톡으로 쉽게 전달해드립니다.
    </div>
    <div style="display:flex; align-items:center; justify-content: center; margin-top: 30px;">
      <v-text-field v-model="keyword" solo flat class="Normal-form" placeholder="키워드를 입력하세요."></v-text-field>
      <v-btn flat dark icon class="Button-solid" @click="click">검색</v-btn>
    </div>

    <div class="home-layer-margin">
      <v-layout v-for="(item, index) in this.itemList" :key="index">
        <div class="home-layer1">
          <div class="item">
            <div style="font-weight: bold; font-size: 20px; color: #393f45">{{ item.title }}</div>
            <div>{{ item.info }}</div>
          </div>
          <div class="item">
            <v-img :src="item.imgUrl"></v-img>
          </div>
        </div>
      </v-layout>
    </div>
    <div class="home-layer1 home-layer-margin bottom">
      <v-carousel hide-delimiters light height="200" style="box-shadow:none; padding: 0 20px;">
        <v-carousel-item v-for="(item, i) in itemList2" :key="i">
          <v-layout align-center justify-center fill-height>
            <div style="text-align: center; flex-grow: 1;">
              <div style="font-weight: bold; font-size: 20px; color: #393f45">{{ item.title }}</div>
              <div v-html="item.info"></div>
            </div>
            <div style="text-align: center; flex-grow: 1;">
              <v-avatar>
                <img :src="item.imgUrl" />
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
      keyword: "",
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
            "매일 온라인에서 찾아보던 경쟁사 소식을 이제는 찾아볼 필요 없이 소식이 있을 때마다 실시간 업데이트 하여 알려드립니다.",
          imgUrl:
            "https://t1.kakaocdn.net/kakaocorp/operating/co/main-banner/3189.png"
        },
        {
          title: "실시간 이슈를 쉽고 빠르게!",
          info:
            "매일 일어난 실시간 검색어를 12시간 누적데이터 기준으로 정리해서 제공함으로써 그날의 이슈를 쉽게 확인할 수 있습니다.",
          imgUrl: "https://t1.kakaocdn.net/kakaocorp/admin/main-banner/1652"
        }
      ],
      itemList2: [
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
  height: 45px;
  border-radius: 4px;
  background-color: var(--greenblue);
}
</style>
