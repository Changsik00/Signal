<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-btn round color="primary" dark @click="gotoAbout">goto about page</v-btn>
        <v-btn round color="primary" dark @click="test">Button2</v-btn>
      </v-flex>
      <v-flex xs12>
        <v-img
          :src="require('../assets/img/logo.svg')"
          class="my-3"
          contain
          height="200">
        </v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Vuetify</h1>
        <p class="subheading font-weight-regular">
            For help and collaboration with other Vuetify developers,
          <br />
            please join our online
          <a href="https://community.vuetifyjs.com" target="_blank">
            Discord Community
          </a>
        </p>
      </v-flex>

      <v-flex mb-5 xs12>
        <h2 class="headline font-weight-bold mb-3">What's next?</h2>
      </v-flex>

      <v-flex xs12 mb-5>
        <h2 class="headline font-weight-bold mb-3">Important Links</h2>
      </v-flex>

      <v-flex xs12 mb-5>
        <h2 class="headline font-weight-bold mb-3">Ecosystem</h2>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    gotoAbout() {
      // this.$router.push({ name: "about" });
      this.$store.dispatch("showLoading");
    },
    test() {
      // this.$router.push({ name: "about" });
      this.$store.dispatch("hideLoading");
    }
  }
};
</script>