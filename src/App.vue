<template>
  <v-app>
    <Header />
    <v-content>
      <router-view />
    </v-content>
    <Loading />
    <Snackbar />
    <Login />
    <Connections />
    <NewPost />
  </v-app>
</template>

<script>
import Header from "./components/Header";
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    Header
  },
  computed: {
    ...mapGetters(["isLogin"])
  }
};
</script>
