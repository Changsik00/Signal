<template>
  <section>
    <v-layout>
      columns
    </v-layout>

    <v-navigation-drawer v-model="monitorSlideMenu" absolute temporary right width="320">
      <v-layout align-center row style="padding: 10px 0; background-color: whitesmoke;">
        <div style="font-size: 20px; font-weight: bold; margin-left: 20px;">Select a column type</div>
        <v-spacer></v-spacer>
        <v-btn icon @click="hideMonitorSlideMenu">
          <v-icon>close</v-icon>
        </v-btn>
      </v-layout>
      <div class="side-menu">
        <div class="title">Search</div>
        <div>keyword 1</div>
      </div>
      <div class="side-menu">
        <div class="title">facebook</div>
        <div class="pointer">Visitor Posts</div>
        <div class="pointer">Page Mentions</div>
        <div class="pointer">Page Search</div>
      </div>
      <div class="side-menu">
        <div class="title">Twitter</div>
        <div class="pointer">Mentions</div>
        <div class="pointer">Timeline</div>
        <div class="pointer">Likes</div>
        <div class="pointer">Keyword Search</div>
        <div class="pointer">User Search</div>
        <div class="pointer">Lists</div>
      </div>
    </v-navigation-drawer>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["showMonitorSlideMenu", "hideMonitorSlideMenu"])
  },
  computed: {
    ...mapGetters(["monitorSlideMenu"])
  },
  created() {
    console.log("#@# monitorSlideMenu", this.monitorSlideMenu);
  }
};
</script>

<style lang="scss">
.home-number-margin {
  margin: 0 30px;
  @include tablet {
    margin: 0 90px;
  }
}
.main-layer {
  max-width: $desktop-width;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.side-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  border-bottom: 1px solid #dedede;

  & > .title {
    margin: 0;
    padding: 0 20px;
    margin-bottom: 10px;
    &:hover {
      background-color: white !important;
    }
  }
  & > div {
    width: 100%;
    padding: 10px 30px;
    &:hover {
      background-color: whitesmoke;
    }
  }
}
</style>
