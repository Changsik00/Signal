<template>
  <section>
    <v-toolbar app class="header">
      <img src="../assets/img/common/logo-signal.svg" alt="logo">
      <v-spacer></v-spacer>
      <v-btn flat round color="primary" dark @click="main">주요기능</v-btn>
      <v-btn v-if="!$store.getters.isLogin" flat round color="primary" dark @click="login">로그인</v-btn>
      <v-btn v-else flat round color="primary" dark @click="logout">로그아웃</v-btn>
    </v-toolbar>
    <Login ref="login"/>
  </section>
</template>

<script>
import Login from "./Login";

export default {
  components: {
    Login
  },
  methods: {
    login() {
      this.$refs.login.showDialog();
    },
    logout() {
      this.$store.commit("logout");
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
        })
        .catch(function(error) {
          // An error happened.
        });
    },
    main() {
      console.log("#@# goto main");
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  height: 62px;
  padding: 0 20px;
}
</style>
