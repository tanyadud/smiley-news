<template>
  <div class="bg">
    <section class="registration-step-4 container">
      <div class="registration-progress">
        <div class="registration-progress__item done">Get Started</div>
        <div class="registration-progress__item done">About You</div>
        <div class="registration-progress__item done">Looking for</div>
        <div class="registration-progress__item active">Join the Smiley Community</div>
      </div>
      <h2
        class="registration-title"
      >Tell us what you care about most in order to customize the best experience for you (you can select more than one interest)</h2>
      <p class="registration-subtitle"></p>

      <form class="registration-4" v-if="goals.length > 0" @submit.prevent="submitGoals">
        <!-- <div class=""> -->
        <carousel
          class="interest-list owl-carousel"
          id="owl-carousel"
          :items="4"
          :margin="20"
          :loop="true"
          :autoplay="false"
          :autoplayTimeout="2000"
          :smartSpeed="500"
          :slideBy="4"
          :nav="false"
          :responsive="{657:{center: true,autoWidth: true,margin: -25}}"
        >
          <div class="interest-item" v-for="goal in goals" :key="'goal-'+goal.id">
            <label class="interest">
              <img :src="$settings.images_path.goals + 's_' + goal.image" alt="icon" />
              <input type="checkbox" :value="goal.id" name="goals_checkbox[]" v-model="user.goals" />
              <div class="checkbox"></div>
            </label>
          </div>
        </carousel>
        <!-- </div> -->
        <div class="input-row">
          <label>
            <span>How did you hear about us? *</span>
            <select v-model="user.survey" required>
              <option selected disabled>Select option</option>
              <option value="1">Social Media</option>
              <option value="2">Google (Bing, etc) search</option>
              <option value="3">I attended a Smiley Movement event</option>
              <option value="4">From a friend</option>
              <option value="5">I received an email from Smiley Movement</option>
              <option value="6">I received a call from Smiley Movement</option>
              <option value="7">Other (Please specify)</option>
            </select>
          </label>
          <label v-if="user.survey == 7" for="survey_other">
            <span>
              <br />
            </span>
            <input
              type="text"
              name="survey_other"
              id="survey_other"
              v-model="user.survey_other"
              placeholder="Specify here"
              required
            />
          </label>
        </div>
        <div class="input-row">
          <label style="width: 100%;">
            <span>Add a photo so that friends and colleagues can recognise you *</span>
            <input
              type="file"
              class="file-input"
              ref="fileInput"
              id="organisationLogo"
              @input="onSelectFile"
              accept=".png, .jpg, .jpeg"
              required
            />
          </label>
        </div>
        <div class="input-row">
          <label style="width: 100%;">
            <span>Add a short bio</span>
            <textarea style="height: 300px;" minlength="32" maxlength="254" v-model="user.bio"></textarea>
          </label>
        </div>
        <div class="register-btn-wrap">
          <button
            class="complete-btn"
            type="submit"
            name="submit"
            value="complete-profile"
          >Complete Profile</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import axios from "@/axios-auth";
import router from "@/router";

import $ from "jquery";
import carousel from "vue-owl-carousel2";

export default {
  data() {
    return {
      goals: [],
      selectedGoals: [],
      user: {
        avatar_image: null,
        goals: [],
        survey: null,
        survey_other: null,
        bio: ""
      }
    };
  },
  components: {
    carousel
  },
  methods: {
    submitGoals() {
      if (this.user.goals.length == 0) {
        this.$swal({
          text: "Please select at lease one goal you are interested in",
          icon: "info"
        });
      } else {
        axios
          .post("/users/settings", this.user)
          .then(response => {
            router.push({
              name: "profile"
            });
            this.$store.commit("user/SET_USERDATA", response.data);
          })
          .catch(error => {
            let content = JSON.parse(error.request.response);
            let finalMessage = content.errors.join("<br>");
            this.$swal({ text: finalMessage, icon: "error" });
          });
      }
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          this.user.avatar_image = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    }
  },
  mounted() {
    axios
      .get("/goals")
      .then(res => {
        this.goals = res.data.goal_categories[0].goals;
      })
      .catch(err => console.error("Load goals error", err));
  }
};
</script>

<style lang="scss" scoped>
.bg {
  background-image: url("/img/register-bg.jpg");
  background-size: cover;
  padding-top: 48px;
  padding-bottom: 96px;
  color: #fff;
}
.registration-progress {
  position: relative;
  display: flex;
  justify-content: space-between;
  font-family: Muli, Arial, Helvetica, sans-serif;
  font-size: 18px;
  line-height: 1.5;

  &__item {
    width: 25%;
    text-align: center;
    position: relative;

    &:first-child {
      &.done {
        &::after {
          display: none;
        }
      }
    }

    &.done {
      &::after {
        background-color: #fdec01;
      }
      &::before {
        background-color: #fdec01;
        width: 43px;
        height: 43px;
        margin-top: 2px;
        background-image: url("/img/small-tick-black.png");
        background-position: center;
        background-repeat: no-repeat;
        margin-bottom: 15px;
      }
      font-weight: normal;
    }

    &.active {
      &::after {
        display: block;
        background-color: #fdec01;
      }
      &::before {
        background-color: #fdec01;
        width: 43px;
        height: 43px;
        margin-top: 2px;
        margin-bottom: 15px;
      }

      font-weight: bold;
    }

    &::before {
      width: 28px;
      height: 28px;
      content: "";
      display: block;
      text-align: center;
      margin: 9px auto 25px;
      border-radius: 50%;
      background-color: #fff;
      z-index: 3;
      position: relative;
    }

    &::after {
      width: 100%;
      height: 3px;
      content: "";
      position: absolute;
      background-color: #fff;
      top: 22px;
      left: -50%;
      z-index: 1;
    }
  }
}
.registration-step-4 {
  text-align: center;
  margin-top: 127px;
  margin-bottom: 160px;
  .registration-title {
    color: #fff;
    font: 700 56px/74px "Montserrat Bold", sans-serif;
    margin-bottom: 24px;
    margin-top: 54px;
  }
  .registration-subtitle {
    color: $default-text;
    font: 400 22px/36px "Muli", sans-serif;
    max-width: 778px;
    margin: 0 auto 42px;
  }
  .registration-4 {
    max-width: 790px;
    margin: 0 auto;
    .interest-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      @include custom-width(806px) {
        justify-content: flex-start;
      }
      .interest-item {
        max-width: 169px;
        max-height: 169px;
        margin: 14px;
        position: relative;
        .interest-img-wrap {
          display: flex;
          border: 1px solid #efefef;
          max-width: 100%;
          height: auto;
          img {
            width: 100%;
          }
        }
        .interest {
          position: relative;
          cursor: pointer;

          img {
            max-width: 100%;
            height: auto;
            line-height: 1;
          }
          input {
            position: absolute;
            left: 0px;
            top: 0px;
            opacity: 0;
            width: 24px;
            height: 24px;

            &:checked + .radio {
              &::before {
                width: 65%;
                height: 65%;
              }
            }
            &:checked + .checkbox {
              background-color: #f4ed3b;
              &::before {
                @include font-size(1rem);
              }
            }
          }
          .checkbox {
            width: 24px;
            height: 24px;
            background-color: #fff;
            border: 1px solid #393939;
            cursor: pointer;
            position: absolute;
            right: 0px;
            bottom: 0px;

            &::before {
              color: #393939;
              content: "\f00c";
              display: inline-block;
              font-family: FontAwesome;
              font-size: inherit;
              text-rendering: auto;
              -webkit-font-smoothing: antialiased;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              font-size: 0px;
              transition: font-size 0.4s, background-color 0.4s;
            }
          }
        }
      }
    }
    .register-btn-wrap {
      margin-top: 33px;
      display: flex;
      justify-content: center;
      button {
        border-radius: 4px;
        height: 48px;
        width: 100%;
        max-width: 762px;
        font: 700 16px/24px "Montserrat Bold", sans-serif;
        color: #000;
        text-transform: uppercase;
        cursor: pointer;
        margin-bottom: 20px;
      }
    }
    .complete-btn {
      background-color: $default-yellow-btns;
      border: none;
    }
  }
}

.input-row {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-left: -15px;
  margin-right: -15px;
  text-align: left;

  label {
    width: calc(50% - 30px);
    margin-left: 15px;
    margin-right: 15px;

    @include smMax() {
      width: 100%;
    }
  }

  label {
    color: #fff;
    font: 700 16px/24px "Muli", sans-serif;

    input,
    textarea,
    select {
      display: block;
      margin: 7px auto 25px;
      width: 100%;
      box-sizing: border-box;
      height: 48px;
      border: 1px solid #c7c7c7;
      border-radius: 4px;
      font: 400 16px/24px "Muli", sans-serif;
      color: #656565;
      padding: 0 48px 0 16px;
      background-color: #fff;

      &[type="file"] {
        padding-left: 0px;
      }
    }
  }
}

.owl-nav {
  display: none !important;
}
</style>