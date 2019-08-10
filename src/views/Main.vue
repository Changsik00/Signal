<template>
  <section>
    <v-btn color="pink" dark @click.stop="drawer = !drawer">Toggle</v-btn>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </section>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ]
    };
  },
  methods: {},
  computed: {}
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
</style>
