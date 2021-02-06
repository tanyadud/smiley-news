<template>
  <div class="bg">
    <section class="registration-step-3 container">
      <div class="registration-progress">
        <div class="registration-progress__item done">Get Started</div>
        <div class="registration-progress__item done active">About You</div>
        <div class="registration-progress__item active">Looking for</div>
        <div class="registration-progress__item">Join the Smiley Community</div>
      </div>
      <h2 class="registration-title">Do you need or want to lend a helping hand?</h2>

      <form class="registration-3" @submit.prevent="submitSupport">
        <div class="support-type-radio-btns">
          <div class="radio-btns-group">
            <label :class="{active: supportType == 'offer'}">
              <div class="inner-block">
                <div class="image-holder">
                  <img src="/img/offer-support-icons@2x.png" />
                </div>
                <span>
                  <strong>offer</strong> support
                </span>
                <input
                  v-model="supportType"
                  value="offer"
                  type="radio"
                  name="support-type"
                  placeholder
                  required
                />
              </div>
            </label>
            <label :class="{active: supportType == 'need'}">
              <div class="inner-block">
                <div class="image-holder">
                  <img src="/img/need-support-icons@2x.png" />
                </div>
                <span>
                  <strong>need</strong> support
                </span>
                <input
                  v-model="supportType"
                  value="need"
                  type="radio"
                  name="support-type"
                  placeholder
                />
              </div>
            </label>
            <label :class="{active: supportType == 'combined'}" id="combined-support">
              <div class="inner-block">
                <div class="image-holder">
                  <img src="/img/need-support-icons@2x.png" />
                </div>
                <span>
                  <strong>offer</strong> support
                </span>
              </div>
              <div class="inner-block">
                <div class="image-holder">
                  <img src="/img/need-support-icons@2x.png" />
                </div>
                <span>
                  <strong>need</strong> support
                </span>
              </div>
              <input
                v-model="supportType"
                value="combined"
                type="radio"
                name="support-type"
                placeholder
              />
            </label>
          </div>
        </div>
        <template v-if="supportType == 'combined' || supportType == 'need'">
          <div class="section-support-title">What support do you need?</div>
          <label
            for="reg-support"
            v-for="(item, index) in neededItems"
            :key="'needed-items-'+index"
            class="flex-select"
          >
            <div class="wrap-for-support-select">
              <select name="reg-support" id="reg-support" v-model="neededItems[index].parent">
                <option selected disabled>Please select one</option>
                <option
                  v-for="parentCategory in supportList"
                  :key="parentCategory.id"
                  :value="parentCategory.id"
                >{{parentCategory.title}}</option>
              </select>
              <div class="select-arrows">
                <svg
                  width="12"
                  height="20"
                  viewBox="0 0 3.1749999 5.2916668"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="translate(0,-291.70832)" id="layer1">
                    <g
                      transform="matrix(0.17602026,0,0,0.17602026,-0.52336255,294.0049)"
                      style="fill:none"
                    >
                      <path
                        style="clip-rule:evenodd;fill:#1a1a1a;fill-rule:evenodd"
                        d="m 21.0002,8.00025 c 0,0.256 -0.0979,0.512 -0.2929,0.707 l -8.0001,7.99995 c -0.391,0.391 -1.023,0.391 -1.4139,0 L 3.29325,8.70725 c -0.391,-0.391 -0.391,-1.023 0,-1.414 0.391,-0.391 1.023,-0.391 1.414,0 l 7.29295,7.29295 7.293,-7.29295 c 0.391,-0.391 1.023,-0.391 1.4141,0 0.195,0.195 0.2929,0.451 0.2929,0.707 z"
                      />
                    </g>
                    <g
                      transform="matrix(-0.17657956,0,0,-0.17657956,3.7031194,294.71295)"
                      style="fill:none"
                    >
                      <path
                        style="clip-rule:evenodd;fill:#1a1a1a;fill-rule:evenodd"
                        d="m 21.0002,8.00025 c 0,0.256 -0.0979,0.512 -0.2929,0.707 l -8.0001,7.99995 c -0.391,0.391 -1.023,0.391 -1.4139,0 L 3.29325,8.70725 c -0.391,-0.391 -0.391,-1.023 0,-1.414 0.391,-0.391 1.023,-0.391 1.414,0 l 7.29295,7.29295 7.293,-7.29295 c 0.391,-0.391 1.023,-0.391 1.4141,0 0.195,0.195 0.2929,0.451 0.2929,0.707 z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <div class="wrap-for-support-select">
              <select
                name="reg-support"
                id="reg-support"
                required
                v-model="neededItems[index].child"
              >
                <option selected disabled>Please select one</option>
                <option
                  v-for="parentCategory in categoryItems(neededItems[index].parent)"
                  :key="parentCategory.id"
                  :value="parentCategory.id"
                >{{parentCategory.title}}</option>
              </select>
              <div class="select-arrows">
                <svg
                  width="12"
                  height="20"
                  viewBox="0 0 3.1749999 5.2916668"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="translate(0,-291.70832)" id="layer1">
                    <g
                      transform="matrix(0.17602026,0,0,0.17602026,-0.52336255,294.0049)"
                      style="fill:none"
                    >
                      <path
                        style="clip-rule:evenodd;fill:#1a1a1a;fill-rule:evenodd"
                        d="m 21.0002,8.00025 c 0,0.256 -0.0979,0.512 -0.2929,0.707 l -8.0001,7.99995 c -0.391,0.391 -1.023,0.391 -1.4139,0 L 3.29325,8.70725 c -0.391,-0.391 -0.391,-1.023 0,-1.414 0.391,-0.391 1.023,-0.391 1.414,0 l 7.29295,7.29295 7.293,-7.29295 c 0.391,-0.391 1.023,-0.391 1.4141,0 0.195,0.195 0.2929,0.451 0.2929,0.707 z"
                      />
                    </g>
                    <g
                      transform="matrix(-0.17657956,0,0,-0.17657956,3.7031194,294.71295)"
                      style="fill:none"
                    >
                      <path
                        style="clip-rule:evenodd;fill:#1a1a1a;fill-rule:evenodd"
                        d="m 21.0002,8.00025 c 0,0.256 -0.0979,0.512 -0.2929,0.707 l -8.0001,7.99995 c -0.391,0.391 -1.023,0.391 -1.4139,0 L 3.29325,8.70725 c -0.391,-0.391 -0.391,-1.023 0,-1.414 0.391,-0.391 1.023,-0.391 1.414,0 l 7.29295,7.29295 7.293,-7.29295 c 0.391,-0.391 1.023,-0.391 1.4141,0 0.195,0.195 0.2929,0.451 0.2929,0.707 z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </label>
          <div class="add-another-one">
            <a href="#" @click.prevent="addNewSupportItem">Add another one</a>
          </div>
          <br />
        </template>
        <template v-if="supportType == 'combined' || supportType == 'offer'">
          <div class="section-support-title">What support do you offer?</div>
          <label
            for="reg-support"
            v-for="(item, index) in offeredItems"
            :key="'offered-items-'+index"
            class="flex-select"
          >
            <div class="wrap-for-support-select">
              <select
                name="reg-support"
                id="reg-support"
                required
                v-model="offeredItems[index].parent"
              >
                <option selected disabled>Please select one</option>
                <option
                  v-for="parentCategory in supportList"
                  :key="parentCategory.id"
                  :value="parentCategory.id"
                >{{parentCategory.title}}</option>
              </select>
              <div class="select-arrows">
                <svg
                  width="12"
                  height="20"
                  viewBox="0 0 3.1749999 5.2916668"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="translate(0,-291.70832)" id="layer1">
                    <g
                      transform="matrix(0.17602026,0,0,0.17602026,-0.52336255,294.0049)"
                      style="fill:none"
                    >
                      <path
                        style="clip-rule:evenodd;fill:#1a1a1a;fill-rule:evenodd"
                        d="m 21.0002,8.00025 c 0,0.256 -0.0979,0.512 -0.2929,0.707 l -8.0001,7.99995 c -0.391,0.391 -1.023,0.391 -1.4139,0 L 3.29325,8.70725 c -0.391,-0.391 -0.391,-1.023 0,-1.414 0.391,-0.391 1.023,-0.391 1.414,0 l 7.29295,7.29295 7.293,-7.29295 c 0.391,-0.391 1.023,-0.391 1.4141,0 0.195,0.195 0.2929,0.451 0.2929,0.707 z"
                      />
                    </g>
                    <g
                      transform="matrix(-0.17657956,0,0,-0.17657956,3.7031194,294.71295)"
                      style="fill:none"
                    >
                      <path
                        style="clip-rule:evenodd;fill:#1a1a1a;fill-rule:evenodd"
                        d="m 21.0002,8.00025 c 0,0.256 -0.0979,0.512 -0.2929,0.707 l -8.0001,7.99995 c -0.391,0.391 -1.023,0.391 -1.4139,0 L 3.29325,8.70725 c -0.391,-0.391 -0.391,-1.023 0,-1.414 0.391,-0.391 1.023,-0.391 1.414,0 l 7.29295,7.29295 7.293,-7.29295 c 0.391,-0.391 1.023,-0.391 1.4141,0 0.195,0.195 0.2929,0.451 0.2929,0.707 z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <div class="wrap-for-support-select">
              <select name="reg-support" id="reg-support" v-model="offeredItems[index].child">
                <option>Please select one</option>
                <option
                  v-for="parentCategory in categoryItems(offeredItems[index].parent)"
                  :key="parentCategory.id"
                  :value="parentCategory.id"
                >{{parentCategory.title}}</option>
              </select>
              <div class="select-arrows">
                <svg
                  width="12"
                  height="20"
                  viewBox="0 0 3.1749999 5.2916668"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="translate(0,-291.70832)" id="layer1">
                    <g
                      transform="matrix(0.17602026,0,0,0.17602026,-0.52336255,294.0049)"
                      style="fill:none"
                    >
                      <path
                        style="clip-rule:evenodd;fill:#1a1a1a;fill-rule:evenodd"
                        d="m 21.0002,8.00025 c 0,0.256 -0.0979,0.512 -0.2929,0.707 l -8.0001,7.99995 c -0.391,0.391 -1.023,0.391 -1.4139,0 L 3.29325,8.70725 c -0.391,-0.391 -0.391,-1.023 0,-1.414 0.391,-0.391 1.023,-0.391 1.414,0 l 7.29295,7.29295 7.293,-7.29295 c 0.391,-0.391 1.023,-0.391 1.4141,0 0.195,0.195 0.2929,0.451 0.2929,0.707 z"
                      />
                    </g>
                    <g
                      transform="matrix(-0.17657956,0,0,-0.17657956,3.7031194,294.71295)"
                      style="fill:none"
                    >
                      <path
                        style="clip-rule:evenodd;fill:#1a1a1a;fill-rule:evenodd"
                        d="m 21.0002,8.00025 c 0,0.256 -0.0979,0.512 -0.2929,0.707 l -8.0001,7.99995 c -0.391,0.391 -1.023,0.391 -1.4139,0 L 3.29325,8.70725 c -0.391,-0.391 -0.391,-1.023 0,-1.414 0.391,-0.391 1.023,-0.391 1.414,0 l 7.29295,7.29295 7.293,-7.29295 c 0.391,-0.391 1.023,-0.391 1.4141,0 0.195,0.195 0.2929,0.451 0.2929,0.707 z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </label>
          <div class="add-another-one">
            <a href="#" @click.prevent="addNewOfferItem">Add another one</a>
          </div>
        </template>
        <br />
        <br />
        <div class="register-btn-wrap">
          <div></div>
          <!-- <button class="back-btn" type="submit" name="submit" value="register">Back</button> -->
          <button class="next-btn" type="submit" name="submit" value="register">Next</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import axios from "@/axios-auth";
import router from "@/router";

export default {
  data() {
    return {
      neededItems: [
        {
          parent: 1,
          child: null
        }
      ],
      offeredItems: [
        {
          parent: 1,
          child: null
        }
      ],

      supportList: [],
      supportType: null
    };
  },
  methods: {
    submitSupport() {
      const offerItemsList = this.offeredItems
        .filter(item => item.child != null)
        .map(item => item.child);

      const neededItemsList = this.neededItems
        .filter(item => item.child != null)
        .map(item => item.child);

      // if ("offer" == this.supportType && offerItemsList.length == 0) {
      //   this.$swal({
      //     text: "Please select what support do you offer",
      //     icon: "info"
      //   });
      //   return;
      // }
      // if ("need" == this.supportType && neededItemsList.length == 0) {
      //   this.$swal({
      //     text: "Please select what support do you need",
      //     icon: "info"
      //   });
      //   return;
      // }
      // if (
      //   "combined" == this.supportType &&
      //   neededItemsList.length == 0 &&
      //   offerItemsList.length == 0
      // ) {
      //   this.$swal({
      //     text: "Please select what support do you need and offer",
      //     icon: "info"
      //   });
      //   return;
      // }

      let supports = {
        offer: ["combined", "offer"].includes(this.supportType)
          ? offerItemsList
          : null,
        need: ["combined", "need"].includes(this.supportType)
          ? neededItemsList
          : null
      };

      axios
        .post("/users/settings", supports)
        .then(response => {
          router.push({
            name: "register-4"
          });
          this.$store.commit("user/SET_USERDATA", response.data);
        })
        .catch(error => {
          let content = JSON.parse(error.request.response);
          let finalMessage = content.errors.join("<br>");
          this.$swal({ text: finalMessage, icon: "error" });
        });
    },
    addNewSupportItem() {
      console.log("add new needed item");
      this.neededItems.push({
        parent: 1,
        child: null
      });
    },
    addNewOfferItem() {
      console.log("add new offered item");

      this.offeredItems.push({
        parent: 1,
        child: null
      });
    },
    manageSupport(elem) {
      let currentValue = elem.target.value;
      console.log(elem.target.dataset.index);
      if (!this.parentCatArray.includes(currentValue)) {
        this.parentCatArray.push(currentValue);
      }
    },
    categoryItems(id) {
      const element = this.supportList.find(cat => cat.id == id);

      return element?.supports ? element.supports : null;
    }
  },
  mounted() {
    axios
      .get("/users/settings")
      .then(res => {
        console.log("Loaded support", res);
        this.supportList = res.data.all_supports;
      })
      .catch(err => console.error("Loading support fail"));
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

.registration-step-3 {
  text-align: center;
  margin-top: 74px;
  margin-bottom: 160px;
  .registration-title {
    color: #fff;
    font: 700 56px/74px "Montserrat Bold", sans-serif;
    max-width: 864px;
    margin: 54px auto 10px auto;
  }
  .registration-3 {
    width: 100%;
    max-width: 762px;
    text-align: left;
    margin: 52px auto 0;
    display: flex;
    flex-direction: column;

    label[for="reg-offer"],
    label[for="reg-support"] {
      font: 700 16px/24px "Muli", sans-serif;
      text-transform: uppercase;
      color: $default-text;
    }
    .wrap-for-offer-select,
    .wrap-for-support-select {
      border-radius: 4px;
      box-sizing: border-box;
      height: 48px;
      position: relative;
      width: 100%;
      // max-width: 312px;
      margin-top: 17px;
      select {
        padding: 0 48px 0 16px;
        width: 100%;
        border: 1px solid #c7c7c7;
        border-radius: 4px;
        height: 100%;
        color: #656565;
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        &::-ms-expand {
          display: none; /* remove arrow IE     */
        }
        &:focus {
          outline: none;
        }
        option {
          color: $default-text;
          &[disabled] {
            color: #656565;
          }
        }
      }
      .select-arrows {
        display: flex;
        position: absolute;
        right: 18px;
        top: 14px;
      }
    }
    .add-another-one {
      margin-top: 15px;
      margin-bottom: 20px;
      a {
        font: 700 16px/24px "Muli", sans-serif;
        text-decoration: none;
        color: #fff;
        position: relative;
        padding-left: 60px;
        &:before {
          content: "+";
          font: 400 36px/36px "Montserrat Regular", sans-serif;
          color: #fff;
          position: absolute;
          z-index: 1;
          left: 14px;
          top: -8px;
          //transform: translate(50%,50%);
        }
        &:after {
          content: "";
          height: 46px;
          width: 46px;
          background-color: #656565;
          border-radius: 50%;
          position: absolute;
          left: 0;
          top: -13px;
          z-index: 0;
        }
      }
    }
    .register-btn-wrap {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      @include md {
        flex-direction: row;
        justify-content: space-between;
      }
      button {
        border-radius: 4px;
        height: 48px;
        width: 100%;
        max-width: 360px;
        font: 700 16px/24px "Montserrat Bold", sans-serif;
        color: #000;
        text-transform: uppercase;
        cursor: pointer;
        margin-bottom: 20px;
      }
    }
    .back-btn {
      background: transparent;
      border: 1px solid #c7c7c7;
      &:hover {
        background-color: #fff;
        color: gray;
        transition: 0.2s ease-in;
      }
    }
    .next-btn {
      background-color: $default-yellow-btns;
      border: none;
    }
  }
}

.section-support-title {
  font: 700 16px/24px "Muli", sans-serif;
  text-transform: uppercase;
  color: #fff;
}

.flex-select {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 15px;

  .wrap-for-support-select {
    width: calc(50% - 15px) !important;
  }
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

.radio-btns-group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 48px;

  .inner-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #393939;

    img {
      max-width: 58px;
      max-height: 47px;
      margin-bottom: 5px;
    }

    strong {
      display: block;
      text-transform: uppercase;
      margin-bottom: -5px;
    }
  }

  label {
    background-color: #f8f8f8;
    border-radius: 20px;
    padding: 15px 25px;
    min-width: 170px;
    font-family: Muli, Arial, Helvetica, sans-serif;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;

    @include mdMax {
      width: calc(50% - 30px);
      margin-bottom: 24px;
    }

    @include smMax {
      width: 100%;
      margin-bottom: 24px;
    }

    &::before {
      content: "";
      position: absolute;
      top: 10px;
      left: 10px;
      background-position: 50%;
      background-repeat: no-repeat;
      height: 24px;
      width: 24px;
      -webkit-transition: all 0.2s linear;
      transition: all 0.2s linear;
      background-image: url("/img/oval-7@2x.png");
      background-size: 24px;
      z-index: 2;
    }

    &.active {
      &::before {
        background-image: url("/img/checked@2x.png");
        z-index: 3;
      }
    }
  }

  #combined-support {
    justify-content: space-evenly;
    min-width: 240px;

    @include mdMax {
      width: 100%;
      margin-bottom: 24px;
    }

    &::after {
      content: "";
      background-image: url("/img/plus-icon-black-2.png");
      width: 16px;
      height: 16px;
      position: absolute;
      left: 50%;
      bottom: 30px;
      transform: translateX(-50%);
      background-size: contain;
    }
  }

  input {
    position: absolute;
    top: 10px;
    left: 10px;
    background-position: 50%;
    background-repeat: no-repeat;
    height: 24px;
    width: 24px;
    opacity: 0;
  }
}
</style>