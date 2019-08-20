<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-layout column style="padding: 0; height: 100%; background-color: white;">
      <v-toolbar dark color="primary">
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <div style="background-color: white;">
        <v-layout
          v-if="!showSignUp && !showFindPassword"
          justify-center
          column
          style="width: 300px; margin: 100px auto 0 auto; padding-bottom: 100px;"
        >
          <form class="mt30" @submit.prevent="authenticateEmail">
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
            <v-btn type="submit" class="mt30" block color="secondary">로그인</v-btn>
          </form>
          <v-layout align-center class="mt20">
            <div @click="showFindPassword = true" class="login-link">비밀번호를 잊으셨나요?</div>
            <v-spacer></v-spacer>
            <div @click="showSignUp = true" class="login-link">회원가입</div>
          </v-layout>

          <div class="mt30 line"></div>
          <div style="display: flex; justify-content: space-between; padding: 30px;">
            <img
              class="icon-sns-login"
              @click="authenticateSNS('facebook')"
              src="../assets/img/common/facebook-on.svg"
            />
            <img
              class="icon-sns-login"
              @click="authenticateSNS('twitter')"
              src="../assets/img/common/twitter-on.svg"
            />
            <img
              class="icon-sns-login"
              @click="authenticateSNS('google')"
              src="../assets/img/common/google.svg"
            />
          </div>
        </v-layout>
        <v-layout v-if="showSignUp" justify-center column style="width: 300px; margin:50px auto;">
          <div class="login-link" @click="showSignUp = false">&lt; 로그인으로 이동</div>
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
            <v-btn type="submit" class="mt30" block color="secondary">회원 가입</v-btn>
          </form>

          <div class="mt30 line"></div>
          <div style="display: flex; justify-content: space-between; padding: 30px;">
            <img
              class="icon-sns-login"
              @click="authenticateSNS('facebook')"
              src="../assets/img/common/facebook-on.svg"
            />
            <img
              class="icon-sns-login"
              @click="authenticateSNS('twitter')"
              src="../assets/img/common/twitter-on.svg"
            />
            <img
              class="icon-sns-login"
              @click="authenticateSNS('google')"
              src="../assets/img/common/google.svg"
            />
          </div>
        </v-layout>
        <v-layout
          v-if="showFindPassword"
          justify-center
          column
          style="width: 300px; margin:50px auto;"
        >
          <div class="login-link" @click="showFindPassword = false">&lt; 로그인으로 이동</div>
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
            <v-btn type="submit" class="mt30" block color="secondary">요청</v-btn>
          </form>
        </v-layout>
      </div>
    </v-layout>
  </v-dialog>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      dialog: false,
      email: "",
      password: "",
      confirmPassword: "",
      showFindPassword: false,
      showSignUp: false
    };
  },
  created() {
    firebase.auth().useDeviceLanguage();
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case "setToken":
          this.dialog = this.isLogin;
          break;
      }
    });
  },
  methods: {
    showDialog() {
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.dialog = true;
      this.showFindPassword = false;
      this.showSignUp = false;
    },
    hideDialog() {
      this.dialog = false;
    },
    sendResetPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .catch(error => {
          this.$showToast("Error : " + error.message);
        });
    },
    authenticateEmail() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(result => {
          const params = {
            login_id: result.user.email,
            access_token: result.user.refreshToken,
            type: "email"
          };
          this.$store.dispatch("login", params);
        })
        .catch(error => {
          this.$showToast("Error : " + error.message);
        });
    },
    authenticateSNS(sns) {
      let provider = null;
      switch (sns) {
        case "facebook":
          provider = new firebase.auth.FacebookAuthProvider();
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
          const params = {
            login_id: result.user.email,
            // access_token: result.credential.accessToken,
            access_token: result.user.refreshToken,
            type: sns
          };
          this.$store.dispatch("login", params);
        })
        .catch(error => {
          console.log("#@# error", error);
          this.$showToast("Error : " + error.message);
        });
    },
    signUp() {
      this.$validator.validateAll().then(validate => {
        if (validate) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(
              result => {
                const params = {
                  login_id: result.user.email,
                  access_token: result.user.refreshToken,
                  type: "email"
                };
                this.$store.dispatch("login", params);
              },
              error => {
                console.log("#@# error", error);
                this.$showToast("Error : " + error.message);
              }
            )
            .catch(error => {
              console.log("#@# err", error);
              this.$showToast("Error : " + error.message);
            });
        } else {
          this.$showToast("필수 항목을 확인 해 주세요!");
        }
      });
    }
  }
};
</script>
<style lang="scss">
.sns-result {
  & > div {
    margin: 50px;
  }
}

.icon-sns-login {
  cursor: pointer;
  width: 50px;
  height: 50px;
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
