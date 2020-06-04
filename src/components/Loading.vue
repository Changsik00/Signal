<template>
  <div v-if="isLoading" class="loading-container">
    <div class="loading">
      <half-circle-spinner :animation-duration="1000" :size="60" :color="'#24c185'" />
    </div>
  </div>
</template>

<script>
// https://github.com/epicmaxco/epic-spinners
import { HalfCircleSpinner } from "epic-spinners"
import { mapGetters } from "vuex"
export default {
  components: {
    HalfCircleSpinner
  },
  computed: {
    ...mapGetters(["isLoading"])
  }
}
</script>
<style lang="scss" scoped>
.loading-container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
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