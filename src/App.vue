<template>
  <v-app>
    <Header/>
    <v-content>
      <router-view/>
    </v-content>
    <Footer v-if="!isLogin" />
    <Loading/>
    <Snackbar/>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  computed: {
    ...mapGetters(["isLogin"])
  },
};
</script>


