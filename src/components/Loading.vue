<template>
  <div v-if="showLoading" class="loading-container">
    <div class="loading">
      <half-circle-spinner :animation-duration="1000" :size="60" :color="'#24c185'"/>
    </div>
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";
export default {
  components: {
    HalfCircleSpinner
  },
  name: "Loading",
  computed: {
    showLoading() {
      return this.$store.state.loading;
    }
  }
};
</script>
<style lang="scss" scoped>
.loading-container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform: -webkit-translate(-50%, -50%);
  transform: -moz-translate(-50%, -50%);
  transform: -ms-translate(-50%, -50%);
}
</style>
