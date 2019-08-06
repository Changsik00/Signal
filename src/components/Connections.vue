<template>
    <v-dialog v-model="dialog" width="500" transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="primary">
                <v-toolbar-title>Connections</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <div style="padding: 50px 30px;">
                <div class="headline">SNS 계정 연결</div>
                <v-layout class="mt20" row>
                    <div class="m20 pointer">
                        <v-layout v-if="isFacebookConneted">
                            <img class="icon-sns-connection" src="../assets/img/common/facebook-on.svg" />
                            <span class="ml10 subtitle-2 font-weight-light">연결</span>
                        </v-layout>
                        <v-layout v-else @click="authenticateSNS('facebook')">
                            <img class="icon-sns-connection" src="../assets/img/common/facebook-off.svg" />
                            <span class="ml10 subtitle-2 font-weight-light">연결안됨</span>
                        </v-layout>
                    </div>
                    <div class="m20 pointer">
                        <v-layout v-if="isTwitterConneted">
                            <img class="icon-sns-connection" src="../assets/img/common/twitter-on.svg" />
                            <span class="ml10 subtitle-2 font-weight-light">연결</span>
                        </v-layout>
                        <v-layout v-else @click="authenticateSNS('twitter')">
                            <img class="icon-sns-connection" src="../assets/img/common/twitter-off.svg" />
                            <span class="ml10 subtitle-2 font-weight-light">연결안됨</span>
                        </v-layout>
                    </div>
                    <div class="m20">
                        <v-layout>
                            <img class="icon-sns-connection" src="../assets/img/common/instagram.svg" />
                            <span class="ml10 subtitle-2 font-weight-light">(서비스 준비중)</span>
                        </v-layout>
                    </div>
                </v-layout>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import firebase from "firebase";
export default {
    data() {
        return {
            dialog: false,
            isFacebookConneted: false,
            isTwitterConneted: false
        };
    },
    created() {
        firebase.auth().useDeviceLanguage();
    },
    methods: {
        showDialog() {
            this.dialog = true;
        },
        hideDialog() {
            this.dialog = false;
        },
        authenticateSNS(sns) {
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

                    console.log("#@# result", result);
                })
                .catch(error => {
                    if (error.code == "auth/account-exists-with-different-credential") {
                        console.log("#@# error.code", error.code);
                    }

                    if (
                        error.credential &&
                        error.credential.accessToken &&
                        error.credential.accessToken.length > 0
                    ) {
                        console.log("#@# credential.accessToken", error.credential.accessToken);
                    }
                });
        }
    }
};
</script>

<style lang="scss">
.icon-sns-connection {
    width: 20px;
    height: 20px;
    cursor: pointer;
}
</style>
