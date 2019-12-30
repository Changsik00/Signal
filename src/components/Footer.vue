<template>
  <v-footer height="auto">
    <div class="footer">
      <v-layout>
        <img src="../assets/img/common/logo-signal-mono.svg" alt />
        <div class="ml20">
          <div>시그널은 원하는 소식을 가장 빠르고 정확하게 전달하여 사용자분들의 성공을 도와드립니다.</div>
          <div>(주)시그널랩 : 서울시 서초구 강남대로 479 피치트리</div>
          <v-layout class="mt20">
            <div class="link" @click="$router.push({name:'terms'})">서비스 이용약관</div>
            <div class="ml20 link" @click="$router.push({name:'privacy'})">개인정보 처리방침</div>
          </v-layout>
        </div>
      </v-layout>
    </div>
  </v-footer>
</template>
<style lang="scss" scoped>
.footer {
  width: 100%;
  background-color: $charcoal-grey;
  padding: 30px 50px;
  color: $ice-blue;

  & .link  {
    display: inline-block;
    border-bottom: 1px solid $ice-blue;
    cursor: pointer;
  }
}
</style>
