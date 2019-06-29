<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Login</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout justify-center>
          <v-btn @click="authenticate('github')">auth Github</v-btn>
          <v-btn @click="authenticate('facebook')">auth Facebook</v-btn>
          <v-btn @click="authenticate('google')">auth Google</v-btn>
          <v-btn @click="authenticate('twitter')">auth Twitter</v-btn>
        </v-layout>
        <div class="sns-result">
          <div>
            <strong>
              AccessToken :
              <br>
            </strong>
            {{accessToken}}
          </div>

          <div>
            <strong>
              Json :
              <br>
            </strong>
            {{snsResult}}
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      dialog: false,
      snsResult: "",
      accessToken: ""
    };
  },
  methods: {
    showDialog() {
      this.dialog = true;
    },
    hideDialog() {
      this.dialog = false;
    },
    authenticate(sns) {
      // https://firebase.google.com/docs/auth/web/facebook-login?hl=ko
      let provider = null;
      switch (sns) {
        case "facebook":
          provider = new firebase.auth.FacebookAuthProvider();
          provider.addScope("publish_pages");
          break;

        case "twitter":
          provider = new firebase.auth.TwitterAuthProvider();
          break;
      }

      firebase.auth().useDeviceLanguage();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          var user = result.user;
          console.log("#@# success", result);
          this.snsResult = result;
          this.accessToken = result.credential.accessToken;
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          console.log("#@# error", error);
        });
    },
    createUserWithEmailAndPassword() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.replace("home");
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
    },
    signInWithEmailAndPassword() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.replace("home");
        })
        .catch(err => {
          alert("Oops. " + err.message);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.sns-result {
  & > div {
    margin: 50px;
  }
}
</style>
