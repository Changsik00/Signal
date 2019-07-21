<template>
  <v-dialog v-model="dialog" fullscreen scrollable transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-layout
        v-if="!showSignUp && !showFindPassword"
        justify-center
        column
        style="width: 300px; margin: 100px auto;"
      >
        <h3 class="title" style="text-align: center">한 계정으로 모든 서비스 액세스</h3>
        <form class="mt30" @submit.prevent="signInWithEmailAndPassword">
          <b-field
            label="Email"
            :type="{'is-danger': errors.has('email')}"
            :message="errors.first('email')"
          >
            <b-input type="email" v-model="email" name="email" v-validate="'required|email'" />
          </b-field>

          <b-field
            label="Password"
            :type="{'is-danger': errors.has('password')}"
            :message="errors.first('password')"
          >
            <b-input
              type="password"
              v-model="password"
              name="password"
              v-validate="'required|min:8'"
            />
          </b-field>
          <v-btn type="submit" class="mt30" block :loading="loading" color="secondary">로그인</v-btn>
        </form>
        <v-layout align-center class="mt20">
          <div @click="showFindPassword = true" class="login-link">비밀번호를 잊으셨나요?</div>
          <v-spacer></v-spacer>
          <div @click="showSignUp = true" class="login-link">회원가입</div>
        </v-layout>

        <div class="mt30 line"></div>
        <div class="mt30">
          <div @click="authenticateSNS('google')" class="mt30 google-login"></div>
        </div>
      </v-layout>
      <v-layout v-if="showSignUp" justify-center column style="width: 300px; margin:50px auto;">
        <div class="login-link" @click="showSignUp = false">< 로그인으로 이동</div>
        <form class="mt50" @submit.prevent="signUp">
          <b-field
            label="Email"
            :type="{'is-danger': errors.has('email')}"
            :message="errors.first('email')"
          >
            <b-input type="email" v-model="email" name="email" v-validate="'required|email'" />
          </b-field>

          <b-field
            label="Password"
            :type="{'is-danger': errors.has('password')}"
            :message="errors.first('password')"
          >
            <b-input
              type="password"
              v-model="password"
              name="password"
              v-validate="'required|min:8'"
            />
          </b-field>

          <b-field
            label="Confirm password"
            :type="{'is-danger': errors.has('confirm-password')}"
            :message="[{
              'The confirm password field is required' : errors.firstByRule('confirm-password', 'required'),
              'The confirm password is not valid' : errors.firstByRule('confirm-password', 'is')
            }]"
          >
            <b-input
              type="password"
              v-model="confirmPassword"
              name="confirm-password"
              v-validate="{ required: true, is: password }"
            />
          </b-field>
          <v-btn type="submit" class="mt30" block :loading="loading" color="secondary">회원 가입</v-btn>
        </form>

        <div class="mt30 line"></div>
        <div class="mt30">
          <div @click="authenticateSNS('google')" class="mt30 google-login"></div>
        </div>
      </v-layout>
      <v-layout
        v-if="showFindPassword"
        justify-center
        column
        style="width: 300px; margin:50px auto;"
      >
        <div class="login-link" @click="showFindPassword = false">< 로그인으로 이동</div>
        <h3 class="mt30">
          등록된 이메일로 패스워드 변경
          <br />메일을 요청할 수 있습니다.
        </h3>
        <form class="mt50" @submit.prevent="sendResetPassword">
          <b-field
            label="Email"
            :type="{'is-danger': errors.has('email')}"
            :message="errors.first('email')"
          >
            <b-input type="email" v-model="email" name="email" v-validate="'required|email'" />
          </b-field>
          <v-btn type="submit" class="mt30" block :loading="loading" color="secondary">요청</v-btn>
        </form>
      </v-layout>
    </v-card>
  </v-dialog>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      dialog: false,
      snsResult: "",
      accessToken: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      showFindPassword: false,
      showSignUp: false
    };
  },
  created() {
    firebase.auth().useDeviceLanguage();
  },
  methods: {
    showDialog() {
      this.dialog = true;
      this.showFindPassword = false;
      this.showSignUp = false;
    },
    hideDialog() {
      this.dialog = false;
    },
    createUser() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(success => {
          console.log("#@# success", success.user.email);
        })
        .catch(error => {
          console.log("#@# error", error);
          this.$showToast(error.code + "<br>" + error.message);
        });
    },
    sendResetPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .catch(error => {
          this.$showToast(error.code + "<br>" + error.message); // An error happened.
        });
    },
    authenticateEmail() {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => {
          this.$showToast(error.code + "<br>" + error.message);
        });
    },
    authenticateSNS(sns) {
      this.snsResult = "";
      this.accessToken = "";

      // https://firebase.google.com/docs/auth/web/facebook-login?hl=ko
      let provider = null;
      switch (sns) {
        case "facebook":
          provider = new firebase.auth.FacebookAuthProvider();
          provider.addScope("manage_pages,publish_pages,pages_show_list");
          break;

        case "twitter":
          provider = new firebase.auth.TwitterAuthProvider();
          break;

        case "google":
          provider = new firebase.auth.GoogleAuthProvider();
          break;

        case "instagram":
          provider = new firebase.auth.FacebookAuthProvider();
          // provider.addScope("manage_pages,instagram_basic,instagram_content_publish");
          provider.addScope("manage_pages,instagram_basic");
          break;
      }

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          var user = result.user;
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
          result => {
            console.log("#@# result", result);
            this.$router.replace("home");
          },
          err => {
            console.log("#@# err", err);
            this.$showToast("Error : " + err.message);
          }
        )
        .catch(err => {
          console.log("#@# err", err);
          this.$showToast("Error : " + err.message);
        });
    },
    signInWithEmailAndPassword() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.replace("home");
        })
        .catch(err => {
          this.$showToast("Error : " + err.message);
        });
    },
    signUp() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.createUserWithEmailAndPassword();
        } else {
          this.$showToast("필수 항목을 확인 해 주세요!");
        }
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

.google-login {
  display: inline-block;
  margin: auto;
  width: 300px;
  height: 72px;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(../assets/img/login/btn_google_signin_light_normal_web@2x.png);
  cursor: pointer;
  &:hover {
    background-image: url(../assets/img/login/btn_google_signin_light_pressed_web@2x.png);
  }
}

.login-link {
  display: inline-block;
  cursor: pointer;
  color: #999999;
  &:hover {
    color: #333333;
  }
}
</style>
