<template>
  <section style="text-align: left;">
    <div style="font-size: 18px; font-weight: bold;">
      키워드 툴이란 어떤것일까요?
    </div>
    <div
      class="grey6"
      style="margin-top: 10px; background-color: #f9f9f9; padding: 25px;"
    >
      수천개의 키워드를 검색량 대비 경쟁 컨텐츠량으로 DataBase 정보를 분석하여
      나에게 가장 맞는 키워드를 추천해드리는 서비스입니다.
      <br />
      <br />온라인상에 다양한 검색엔진으로 부터 고객유입을 얻을려면 올바른
      키워드를 중심으로 작성 해야 합니다. 온라인상에 우리의 잠재고객이 많이 찾고
      검색하는 키워드를 사용해야 한다는 의미입니다.
      <br />
      <br />고객이 사용하는 키워드를 사용해야 여러분이 운영하는 서비스에
      방문객을 획기적으로 증가시킬 수 있습니다.
    </div>
    <div style="margin-top: 50px; font-size: 18px; font-weight: bold;">
      좋은 키워드의 기준은 무엇일까요?
    </div>
    <div class="grey6 mt5">
      좋은 키워드란 사용자가
      <span class="accent">검색은 많이</span>하는데 노출되는
      <span class="accent">경쟁 컨텐츠가 적은</span> 키워드가 좋은 키워드입니다.
      <table style="width: 100%; margin-top: 30px">
        <tr>
          <th>키워드 검색량</th>
          <th>경쟁 컨텐츠량</th>
          <th>고객이 유입될 확률</th>
        </tr>
        <tr>
          <td>높음</td>
          <td>높음</td>
          <td>보통</td>
        </tr>
        <tr style="background-color: orange;" class="grey7">
          <td>높음</td>
          <td>적음</td>
          <td>높음</td>
        </tr>
        <tr>
          <td>적음</td>
          <td>높음</td>
          <td>낮음</td>
        </tr>
        <tr>
          <td>적음</td>
          <td>적음</td>
          <td>보통</td>
        </tr>
      </table>
    </div>
    <div style="margin-top: 50px; font-size: 18px; font-weight: bold;">
      키워드 툴 특징은 무엇인가요?
    </div>
    <div class="flex">
      <div class="keyword-tool-text">
        <img src="~@/assets/img/home/ico-service-4.svg" />
        <div>
          <div style="font-size: 18px; font-weight: bold">
            수천개 추천 키워드 제공
          </div>
          <div style="font-size: 16px; margin-top: 10px;">
            DataBase에서 수천개의 키워드를 제공함으로써 사용자가 원하는 키워드를
            선택할 수 있습니다.
          </div>
        </div>
      </div>
      <div class="keyword-tool-text ml-0-30-30">
        <img src="~@/assets/img/home/ico-service-4.svg" />
        <div>
          <div style="font-size: 18px; font-weight: bold">
            검증된 데이터
          </div>
          <div style="font-size: 16px; margin-top: 10px;">
            네이버, 유튜브등 실제 검색엔진에 사용되어지고 있는 데이터를 이용하여
            세분화 및 정교화시킵니다.
          </div>
        </div>
      </div>
      <div class="keyword-tool-text">
        <img src="~@/assets/img/home/ico-service-4.svg" />
        <div>
          <div style="font-size: 18px; font-weight: bold">
            키워드 점수
          </div>
          <div style="font-size: 16px; margin-top: 10px;">
            고객이 실제 검색한 검색량과 현재 온라인상에 퍼져있는 경쟁 컨텐츠량을
            정량화하여 보기 쉽게 제공합니다.
          </div>
        </div>
      </div>
      <div class="keyword-tool-text ml-0-30-30">
        <img src="~@/assets/img/home/ico-service-4.svg" />
        <div>
          <div style="font-size: 18px; font-weight: bold">
            상위 컨텐츠
          </div>
          <div style="font-size: 16px; margin-top: 10px;">
            실제 해당 키워드를 검색 했을때 온라인상에 노출되어지는 컨텐츠를
            순서대로 보여드려 경쟁 컨텐츠의 퀄리티를 확인할 수 있습니다.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
table,
th,
td {
  padding: 6px;
  width: 33.33%;
  text-align: center !important;
  border: 1px solid black;
}
th {
  font-weight: bold;
  background-color: whitesmoke;
}

.keyword-tool-text {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 30px;

  @include tablet {
    width: calc(50% - 30px);
  }
  & > :nth-child(2) {
    margin-left: 20px;
  }
}

.flex {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  @include tablet {
    flex-direction: row;
  }
}
</style>
