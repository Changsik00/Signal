<template>
  <v-app>
    <Header />
    <v-content>
      <HelloWorld />
    </v-content>
     <Footer />
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data() {
    return {
      //
    };
  }
};
</script>
