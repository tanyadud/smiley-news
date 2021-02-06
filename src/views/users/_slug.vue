<template>
  <div class="profile-bg">
    <div class="profile-holder">
      <div class="profile container">
        <div class="profile-column profile-column__left">
          <div class="profile-avatar">
            <img v-if="user.avatar != null" :src="$settings.images_path.users + 'm_'+ user.avatar" />
            <span v-else>{{ user.display_name | filterAvatar}}</span>
          </div>
          <div class="profile-info">
            <div class="profile-name">{{user.display_name}}</div>
            <div class="profile-job" v-if="(user.job_title != null)">{{user.job_title}}</div>
            <div class="profile-data">
              <div class="profile-data__column">
                Matches
                <br />50+
              </div>
              <div class="profile-data__column">
                Community
                <br />0
              </div>
              <div class="message-me">
                <button>Message</button>
              </div>
            </div>
          </div>
        </div>
        <div class="profile-column profile-column__right">
          <div class="profile-section">
            <div class="profile-section__detail">
              <template v-if="socials.length > 0">
                <ul class="profile-social">
                  <li>Networks:</li>
                  <li v-for="social in socials" :key="'social-'+social.name">
                    <a target="_blank" :href="social.value">
                      <app-icon :name="social.name" />
                    </a>
                  </li>
                </ul>
              </template>
              <template v-else>No networks connected</template>
            </div>
          </div>
          <div class="profile-section">
            <div class="profile-section__detail">Location:</div>
            <div class="profile-section__detail">{{user.city}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="profile-additional">
      <div class="grid-item">
        <div class="item-holder">
          <div class="title">About {{user.display_name}}</div>
          <template v-if="user.bio != null">
            <div class="about" v-html="user.bio"></div>
          </template>
          <template v-else>
            <div
              class="about"
            >Tell us about yourself, what you're passionate about, causes you support and topics you're interested in learning more about so we can match you to likeminded people</div>
          </template>
        </div>
      </div>
      <div class="grid-item">
        <div class="item-holder">
          <div class="title" style="padding-bottom: 0px;">
            Interests
            <span>(UN goals)</span>:
          </div>
        </div>
        <div class="item-holder">
          <ul class="goals">
            <li v-for="goal in goals" :key="goal.id">
              <img :src="$settings.images_path.goals + 's_' + goal.image" alt="icon" />
            </li>
          </ul>
        </div>
      </div>
      <div class="grid-item">
        <div class="item-holder">
          <div class="title">
            <img src="/img/icons/support-offer-icon.png" />
            Support {{user.display_name}} can offer
          </div>
          <ul class="support">
            <li class="support__item" v-for="(item, index) in support.offer" :key="'i-need-'+index">
              <div class="support__category-container">
                <div class="support__category">{{item.support_category.title}}</div>
                <div class="support__subcategory">{{item.title}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="grid-item">
        <div class="item-holder">
          <div class="title">
            <img src="/img/icons/support-need-icon.png" />
            Support {{user.display_name}} need
          </div>
          <ul class="support">
            <li class="support__item" v-for="(item, index) in support.need" :key="'i-need-'+index">
              <div class="support__category-container">
                <div class="support__category">{{item.support_category.title}}</div>
                <div class="support__subcategory">{{item.title}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="grid-item grid-item--full-width">
        <div class="item-holder">
          <div class="title">{{user.display_name}}'s Activity</div>
          <div class="activities">
            <ul class="activities__navigation">
              <li class="active">
                <button>
                  Events
                  <span>0</span>
                </button>
              </li>
              <li>
                <button>
                  Projects
                  <span>0</span>
                </button>
              </li>
              <li>
                <button>
                  Following
                  <span>0</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "@/axios-auth";

import AppIcon from "@/components/AppIcon";


export default {
  name: "UserProfile",
  components: {
    AppIcon,
  },
  data() {
    return {
      user: {},
      socials: [],
      goals: [],
      support: {
        offer: [],
        need: []
      }
    };
  },
  mounted() {
    axios
      .get("/users/" + this.$route.params.slug)
      .then(response => {
        console.log("user-data", response.data);

        this.user = response.data.user;

        this.support.offer = response.data.user.supports_offer;
        this.support.need = response.data.user.supports_need;

        this.$router.currentRoute.meta.title = this.user.display_name;


          this.goals = response.data.user.goals.filter(item =>
          response.data.goals.includes(item.id)
        );

        if (response.data.user.facebook != null) {
          this.socials.push({
            name: "facebook",
            value: response.data.user.facebook
          });
        }
        if (response.data.user.instagram != null) {
          this.socials.push({
            name: "instagram",
            value: response.data.user.instagram
          });
        }
        if (response.data.user.twitter != null) {
          this.socials.push({
            name: "twitter",
            value: response.data.user.twitter
          });
        }
        if (response.data.user.linkedin != null) {
          this.socials.push({
            name: "linkedin",
            value: response.data.user.linkedin
          });
        }
        if (response.data.user.google != null) {
          this.socials.push({
            name: "google",
            value: response.data.user.google
          });
        }
      })
      .catch(error => console.error(error));
  }
};
</script>

<style lang="scss" scoped>
.profile-bg {
  background-color: #f4f6f9;
}

.profile-holder {
  // border-top: 1px solid hsla(0, 0%, 100%, 0.25);
  // margin-top: 50px;

  background-image: url("/img/backgrounds/user-profile-bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.profile {
  display: flex;
  flex-wrap: wrap;

  .profile-column {
    flex-basis: 50%;
    width: auto;
    min-height: 350px;
    box-sizing: border-box;
  }

  .profile-column__left {
    border-right: 1px solid hsla(0, 0%, 100%, 0.5);
    display: flex;
  }

  .profile-section {
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.5);
    padding: 35px 50px;
    display: flex;
    flex-wrap: wrap;

    .profile-section__detail {
      width: 50%;
      @include font-size(1.1rem);
      color: #fff;
      font-family: "Montserrat Regular", sans-serif;
    }
  }

  .profile-avatar {
    margin-top: 35px;
    margin-right: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    overflow: hidden;
    font-family: "Montserrat Bold", sans-serif;
    text-transform: uppercase;
    @include font-size(2rem);
    letter-spacing: 4px;
    color: #393939;
    background-color: #eeb400;
    text-align: center;

    img {
      width: 100%;
      height: 100;
      object-fit: cover;
      object-position: center;
    }
  }

  .profile-info {
    margin-top: 35px;
    font-family: "Montserrat Bold", sans-serif;
    color: #fff;
    @include font-size(1.3);
  }

  .profile-name {
    @include font-size(1.5rem);
    @include margin-bottom(1rem);
    font-family: "Montserrat SemiBold", sans-serif;
  }
  .profile-job {
    @include margin-bottom(1rem);
    font-family: "Montserrat SemiBold", sans-serif;
  }

  .profile-data {
    display: flex;
    flex-wrap: wrap;
    @include font-size(1.3rem);
    font-family: "Montserrat SemiBold", sans-serif;

    .profile-data__column {
      width: 50%;
      box-sizing: border-box;
      padding-left: 50px;

      &:first-child {
        border-right: 2px solid #fff;
        padding-right: 50px;
        padding-left: 0px;
      }
    }
  }

  .profile-social {
    display: flex;
    flex-wrap: wrap;
    margin-left: -5px;
    margin-top: -5px;

    li {
      margin: 5px;
    }
  }
}

.profile-additional {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1px;
  border-bottom: 1px solid black;
  border-left: 1px solid black;

  .grid-item {
    box-sizing: border-box;
    border-top: 1px solid black;
    border-right: 1px solid black;
    display: flex;
    flex-direction: column;

    &:nth-child(odd) {
      align-items: flex-end;
    }
    &.grid-item--full-width {
      grid-column: 1 / span 2;
      align-items: center;
      .item-holder {
        max-width: 1530px;
      }
    }

    .item-holder {
      max-width: 780px;
      width: 100%;
      box-sizing: border-box;
      padding: 25px 30px;
      border-bottom: 1px solid #393939;

      &:last-child {
        border: none;
      }

      .title {
        @include font-size(1.2rem);
        font-weight: bold;
        font-family: "Montserrat Bold", sans-serif;
        color: #393939;
        @include padding-bottom(1rem);
        text-transform: uppercase;
        display: flex;
        align-items: center;

        img {
          max-width: 34px;
          max-height: 34px;
          height: auto;
          margin-right: 24px;
        }

        span {
          font-family: "Montserrat Regular", sans-serif;
          @include font-size(1rem);

          padding-left: 8px;
          padding-right: 8;
        }
      }

      .goals {
        margin: -25px -30px -26px -31px;
        display: grid;
        grid-template-columns: repeat(5, 1fr);

        li {
          margin: -1px;
          border: 1px solid #393939;
          font-size: 0px;
          line-height: 1;

          img {
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }
}

.support {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;

  .support__item {
    padding-left: 48px;
    position: relative;

    &::before {
      content: "";
      width: 24px;
      height: 24px;
      display: block;
      position: absolute;
      left: 0px;
      top: 5px;
      background-image: url("/img/checked@2x.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
  }

  .support__category {
    @include font-size(1rem);
    font-family: "Montserrat SemiBold", sans-serif;
    color: #000;
  }
  .support__subcategory {
    @include font-size(1rem);
    font-family: "Montserrat Regular", sans-serif;
    color: #000;
  }
}

.activities {
  .activities__navigation {
    display: flex;

    li {
      &:not(:last-child) {
        margin-right: 18px;
      }

      &.active {
        button {
          border-bottom: 2px solid;
        }
        span {
          background-color: #f4ed3b;
        }
      }
    }

    button {
      color: #000;
      padding: 25px 30px;
      text-decoration: none;
      display: flex;
      align-items: center;
      border: none;
      border-bottom: 2px solid rgba(0, 0, 0, 0.1);
      white-space: nowrap;
      justify-content: center;
      font-family: "Montserrat Bold", sans-serif;
      font-weight: bold;
      cursor: pointer;
    }

    span {
      margin-left: 16px;
      width: 20px;
      height: 20px;
      background-color: rgba(0, 0, 0, 0.1);
      line-height: 1;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

  .message-me {

    button {
      margin-top: 1.5;
      border: 1px solid #e5e5e5;
      padding: 13px 10px;
      line-height: 1;
      text-transform: uppercase;
      letter-spacing: 1px;
      @include font-size(0.8rem);
      cursor: pointer;
      transition: background-color 0.4s;
      display: block;
      background-color: #f4ed3b;
      font-family: "Montserrat SemiBold", sans-serif;
      margin-left: auto;
    }
  }
</style>