<template>
  <v-dialog
    v-model="$store.state.showNewPost"
    width="80%"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar color="white">
        <v-toolbar-title>Select SNS</v-toolbar-title>
        <v-layout style="margin-left: 20px;">
          <v-btn icon @click="facebook = !facebook">
            <img v-if="facebook" class="icon-sns-new-post" src="../assets/img/common/facebook-on.svg" />
            <img v-else class="icon-sns-new-post" src="../assets/img/common/facebook-off.svg" />
          </v-btn>
          <v-btn icon @click="twitter = !twitter">
            <img v-if="twitter" class="icon-sns-new-post" src="../assets/img/common/twitter-on.svg" />
            <img v-else class="icon-sns-new-post" src="../assets/img/common/twitter-off.svg" />
          </v-btn>
          <v-btn icon>
            <img class="icon-sns-new-post" src="../assets/img/common/instagram.svg" />
          </v-btn>
        </v-layout>
        <v-spacer></v-spacer>
        <v-btn icon @click="$store.state.showNewPost = false">
          <v-icon color="black">close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-layout style="padding: 20px;">
        <v-spacer style="margin-right: 20px;">
          <textarea 
            v-model="message" 
            placeholder="it nice day ~"
            style="width: 100%; height: 100%;
                   padding: 10px;
                   border: 2px solid #f0f0f0;
            ">
          </textarea>
          <v-layout>
            image
            emoji
          </v-layout>
        </v-spacer>
        <div>
          <v-date-picker v-model="datePicker" color="#A9A9A9" ></v-date-picker>
          <div>
            시간
          </div>
        </div>
        
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      message: '',
      facebook: false,
      twitter: false,
      instagram: false,
      datePicker: new Date().toISOString().substr(0, 10)
    };
  },
  methods: {
  }
};
</script>

<style lang="scss">
.icon-sns-new-post {
  width: 42px;
  height: 42px;
}

</style>
