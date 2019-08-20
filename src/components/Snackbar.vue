<template>
  <v-snackbar v-model="isSnackbarShow" :multi-line="true" :top="true" :timeout="0">
    <div v-html="getSnackbarMessage"></div>
    <v-icon dark @click="hideSnackbar">close</v-icon>
  </v-snackbar>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isSnackbarShow", "getSnackbarMessage"])
  },
  methods: {
    hideSnackbar() {
      this.$hideSnackbar();
    }
  }
};
</script>