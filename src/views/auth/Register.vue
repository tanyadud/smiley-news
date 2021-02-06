<template>
  <div class="bg">
    <section class="registration container">
      <h2 class="registration-title">Ready to make real change?</h2>
      <p
        class="registration-subtitle"
      >Let’s set up your profile and start matching you with others doing social and environmental good.</p>
      <h3>New to smiley movement? Join below</h3>

      <div class="login-btns-wrap login">
        <div class="v-google-login">
          <GoogleLogin :params="params" :onSuccess="onSuccess">
            <svg
              width="17.999998"
              height="18.00001"
              viewBox="0 0 4.7624997 4.7625026"
              xmlns:svg="http://www.w3.org/2000/svg"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(-46.041083,-203.86351)">
                <g transform="matrix(0.00892606,0,0,0.00874948,46.041529,203.86367)">
                  <path
                    style="fill:#4285f4"
                    d="m 533.5,278.4 c 0,-18.5 -1.5,-37.1 -4.7,-55.3 H 272.1 v 104.8 h 147 c -6.1,33.8 -25.7,63.7 -54.4,82.7 v 68 h 87.7 c 51.5,-47.4 81.1,-117.4 81.1,-200.2 z"
                  />
                  <path
                    style="fill:#34a853"
                    d="m 272.1,544.3 c 73.4,0 135.3,-24.1 180.4,-65.7 l -87.7,-68 c -24.4,16.6 -55.9,26 -92.6,26 -71,0 -131.2,-47.9 -152.8,-112.3 H 28.9 v 70.1 c 46.2,91.9 140.3,149.9 243.2,149.9 z"
                  />
                  <path
                    style="fill:#fbbc04"
                    d="m 119.3,324.3 c -11.4,-33.8 -11.4,-70.4 0,-104.2 V 150 H 28.9 c -38.6,76.9 -38.6,167.5 0,244.4 z"
                  />
                  <path
                    style="fill:#ea4335"
                    d="m 272.1,107.7 c 38.8,-0.6 76.3,14 104.4,40.8 v 0 L 454.2,70.8 C 405,24.6 339.7,-0.8 272.1,0 169.2,0 75.1,58 28.9,150 l 90.4,70.1 c 21.5,-64.5 81.8,-112.4 152.8,-112.4 z"
                  />
                </g>
              </g>
            </svg>Gmail login
          </GoogleLogin>
        </div>

        <v-facebook-login
          :button-style="{background: '#fff', color: '#000'}"
          app-id="486208715194516"
          @login="onFacebookLogin"
          @sdk-init="onFacebookSDKinit"
        >
          <template slot="login">
            <div>
              <span>
                <svg
                  version="1.1"
                  viewBox="0 0 4.7625042 4.7625001"
                  height="18"
                  width="18.000015"
                  xmlns:svg="http://www.w3.org/2000/svg"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="translate(-46.300006,-202.84821)">
                    <path
                      style="fill:#3a559f;"
                      d="m 46.300006,202.84821 v 4.7625 h 2.536322 v -1.83965 h -0.620015 v -0.751 h 0.620015 v -0.63071 c 0,-0.45869 0.371841,-0.83053 0.830534,-0.83053 h 0.648178 v 0.67531 h -0.463804 c -0.145749,0 -0.26391,0.11817 -0.26391,0.26392 v 0.52202 h 0.716062 l -0.09896,0.751 H 49.58733 v 1.83964 h 1.47518 v -4.7625 z"
                    />
                  </g>
                </svg>
              </span>facebook login
            </div>
          </template>
          <template slot="logout">
            <div>
              <span>
                <svg
                  version="1.1"
                  viewBox="0 0 4.7625042 4.7625001"
                  height="18"
                  width="18.000015"
                  xmlns:svg="http://www.w3.org/2000/svg"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="translate(-46.300006,-202.84821)">
                    <path
                      style="fill:#3a559f;"
                      d="m 46.300006,202.84821 v 4.7625 h 2.536322 v -1.83965 h -0.620015 v -0.751 h 0.620015 v -0.63071 c 0,-0.45869 0.371841,-0.83053 0.830534,-0.83053 h 0.648178 v 0.67531 h -0.463804 c -0.145749,0 -0.26391,0.11817 -0.26391,0.26392 v 0.52202 h 0.716062 l -0.09896,0.751 H 49.58733 v 1.83964 h 1.47518 v -4.7625 z"
                    />
                  </g>
                </svg>
              </span>facebook logout
            </div>
          </template>
        </v-facebook-login>

        <!--        <button class="socnet-login-btns login-with-linkedin-btn">-->
        <!--          <span>-->
        <!--            <svg version="1.1" viewBox="0 0 18 18" height="18" width="18" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg">-->
        <!--              <path style="fill:#3a559f;" d="m 15.782004,1.0847458 c 0.73824,0 1.33664,0.598016 1.33664,1.336632 V 15.748106 c 0,0.73824 -0.598,1.33664 -1.33664,1.33664 H 2.4552761 c -0.7382,0 -1.336632,-0.598 -1.336632,-1.33664 V 2.4213778 c 0,-0.7382 0.598016,-1.336632 1.336632,-1.336632 z m -3.8484,6 c -1.13552,0 -1.91248,0.50192 -2.2583994,1.08504 l -0.056601,0.1036 v -1.08864 h -2.166624 v 7.6666402 h 2.3333035 v -3.71368 c 0,-1.2446402 0.4583204,-2.0363202 1.5600004,-2.0363202 0.75984,0 1.07864,0.67192 1.10488,1.8697602 l 0.0023,0.16656 v 3.71368 h 2.333281 v -4.23432 C 14.785288,8.3307458 14.238348,7.0847458 11.933608,7.0847458 Z m -6.1482959,0 h -2.333328 v 7.6666402 h 2.333328 z m -1.166664,-4 c -0.828336,0 -1.5,0.671664 -1.5,1.5 0,0.828336 0.671664,1.5 1.5,1.5 0.828336,0 1.5,-0.671664 1.5,-1.5 0,-0.828336 -0.671664,-1.5 -1.5,-1.5 z" />-->
        <!--            </svg>-->
        <!--          </span>linkedin login-->
        <!--        </button>-->
      </div>

      <h3>via email</h3>

      <form class="registration-wrap" @submit.prevent="onSubmit">
        <label for="reg-firstname">
          First Name
          <input
            type="text"
            name="reg-firstname"
            id="reg-firstname"
            placeholder
            v-model="firstName"
          />
        </label>

        <label for="reg-lastname">
          Last Name
          <input
            type="text"
            name="reg-lastname"
            id="reg-lastname"
            placeholder
            v-model="lastName"
          />
        </label>

        <div class="full-width">
          <label for="reg-email">
            Email Address
            <input
              type="email"
              name="reg-email"
              id="reg-email"
              minlength="8"
              placeholder
              v-model="email"
            />
          </label>
        </div>

        <label for="reg-password">
          Create Password
          <input
            type="password"
            name="reg-password"
            id="reg-password"
            minlength="8"
            placeholder
            v-model="password"
          />
        </label>

        <label for="confirm-reg-password">
          Confirm Password
          <input
            type="password"
            name="confirm-reg-password"
            id="confirm-reg-password"
            placeholder
            v-model="confirmPassword"
          />
        </label>
        <div class="pledge-that full-width">
          <p>I pledge that:</p>
          <ul>
            <li>I understand the Smiley Movement is about collaboration to create real impact and positive change the world.</li>
            <li>I will be positive and proactive in my comments and always look for solutions.</li>
            <li>I will aim to help other people and organisations reach their goals.</li>
          </ul>
        </div>
        <label class="register-checkbox full-width">
          I am 16 years or older
          <input type="checkbox" v-model="isAdult" />
          <span class="register-checkmark">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.91006 10.4959L3.7071 8.29291C3.31658 7.90239 2.68342 7.90239 2.29289 8.29291C1.90237 8.68343 1.90237 9.3166 2.29289 9.70712L5.29288 12.7071C5.7168 13.131 6.4159 13.0892 6.7863 12.6178L13.7863 4.61786C14.1275 4.18359 14.0521 3.55494 13.6178 3.21372C13.1835 2.87251 12.5549 2.94795 12.2136 3.38222L5.91006 10.4959Z"
                fill="#000"
              />
            </svg>
          </span>
        </label>
        <label class="register-checkbox">
          I accept the following
          <a href="#">Terms and Conditions</a>
          <input type="checkbox" v-model="accept" />
          <span class="register-checkmark">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.91006 10.4959L3.7071 8.29291C3.31658 7.90239 2.68342 7.90239 2.29289 8.29291C1.90237 8.68343 1.90237 9.3166 2.29289 9.70712L5.29288 12.7071C5.7168 13.131 6.4159 13.0892 6.7863 12.6178L13.7863 4.61786C14.1275 4.18359 14.0521 3.55494 13.6178 3.21372C13.1835 2.87251 12.5549 2.94795 12.2136 3.38222L5.91006 10.4959Z"
                fill="#000"
              />
            </svg>
          </span>
        </label>
        <div class="register-btn-wrap full-width">
          <button
            class="register-btn"
            type="submit"
            name="submit"
            value="register"
            :disabled="!isAdult || !accept"
          >Register</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import axios from "@/axios-auth";
import router from "@/router";

import GoogleLogin from "vue-google-login";
import VFacebookLogin from "vue-facebook-login-component";

export default {
  name: "Register",
  components: {
    GoogleLogin,
    VFacebookLogin
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAdult: false,
      accept: false,
      params: {
        client_id:
          "537115227293-55um2kpnf71di2kabtijfls730b56r9l.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      const formData = {
        full_name: this.firstName + " " + this.lastName,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirmPassword
      };

      // console.log(formData);
      this.$store
        .dispatch("user/signUp", formData)
        .then(res => {
          router.push({
            name: "register-2"
          });
        })
        .catch(error => {
          this.$swal({ text: error });
        });
    },
    onSuccess(googleUser) {
      let token = googleUser.uc.access_token;
      this.$store
        .dispatch("user/loginGoogle", token)
        .then(res => {
          console.log("Login Google success", res);
        })
        .catch(error => {
          this.$swal({ text: error });
        });
    },
    onFacebookLogin(res) {
      console.log("onFacebookLogin: Faceboook onLogin event", res);
      if (res.authResponse !== null) {
        let token = res.authResponse.accessToken;
        if (token !== undefined && token !== null) {
          this.$store
            .dispatch("user/loginFacebook", token)
            .then(res => {
              console.log("Login Facebook success", res);
            })
            .catch(error => {
              this.$swal({ text: error });
            });
        }
      } else {
        console.log("onFacebookLogin: Response error");
      }
    },
    onFacebookSDKinit(payload) {
      let response = payload.FB.getAuthResponse();
      if (response !== undefined && response !== null) {
        let token = response.accessToken;
        this.$store
          .dispatch("user/loginFacebook", token)
          .then(res => {
            console.log("Login Facebook success", res);
          })
          .catch(error => {
            this.$swal({ text: error });
          });
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/scss/sections/_page-register";

.bg {
  background-image: url("/img/register-bg.jpg");
  background-size: cover;
  padding-top: 48px;
  padding-bottom: 96px;
  color: #fff;
}

.registration {
  margin-bottom: 0px;
  margin-top: 0px;

  h3 {
    color: #fff;
  }

  .registration-title {
    color: #fff;
  }
  .registration-subtitle {
    color: #fff;
  }

  .registration-wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;

    .full-width {
      grid-column: 1 / span 2 !important;
    }

    .pledge-that {
      p,
      li {
        color: #fff;
      }
    }
    label {
      color: #fff;
      width: 100%;
    }
    .register-checkbox {
      color: #fff;

      a {
        color: #fff;
      }
    }
  }
}
</style>