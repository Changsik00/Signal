<template>
  <section>
    <v-toolbar class="header">
      <img src="../assets/img/common/logo-signal.svg"/>
      <v-spacer class="ml30">
         <v-btn class="text-capitalize" outline round color="primary" @click="connections">Connections</v-btn>
      </v-spacer>
      <v-btn v-if="!$store.getters.isLogin" flat round color="info" @click="login">로그인</v-btn>
      <v-btn v-else flat round color="primary" @click="logout">로그아웃</v-btn>
    </v-toolbar>
    <Login ref="login" />
    <Connections ref="connections" />
  </section>
</template>

<script>
import Login from "./Login";
import Connections from "./Connections";

export default {
  components: {
    Login,
    Connections
  },
  methods: {
    login() {
      this.$refs.login.showDialog();
    },
    connections() {
      this.$refs.connections.showDialog();
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
<style lang="scss">
.header {
  height: 62px;
  padding: 0 20px;
}
</style>
