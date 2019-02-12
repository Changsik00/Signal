<template>
  <div>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!$store.getters.isLogin" flat round color="primary" dark @click="login">Login</v-btn>
      <v-btn v-else flat round color="primary" dark @click="logout">Logout</v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      const params = {
        email: "peter@klaven",
        password: "cityslicka"
      };

      this.$store.dispatch("login", params);
    },
    logout() {
      this.$store.commit("logout");
    }
  }
};
</script>
