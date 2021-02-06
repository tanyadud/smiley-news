<template>
  <div class="profile-bg">
    <div class="textual-banner textual-banner--contained">
      <div class="container">
        <h3 class="textual-banner__title">Dashboard</h3>
        <p>Your personalised portal to share information about yourself and hear about the latest news, events, organisations, projects and new members that share your interests.</p>
      </div>
    </div>
    <div class="profile-holder">
      <div class="profile container">
        <div class="profile-column profile-column__full-width">
          <div class="profile-actions">
            <div class="profile-menu-trigger" @click="userMenuActivator = !userMenuActivator">
              <i class="fa fa-bars"></i>
            </div>
            <div class="profile-helper">Profile</div>
            <transition name="fade">
              <ul class="profile-menu" v-show="userMenuActivator">
                <li>
                  <router-link :to="{name: 'feed'}">Newsfeed</router-link>
                </li>
                <li>
                  <router-link :to="{name: 'talks'}">Events</router-link>
                </li>
                <!-- <li>
                  <router-link :to="'/'">Ecosystems (coming soon)</router-link>
                </li>-->
                <li>
                  <router-link :to="{name: 'projects'}">Projects</router-link>
                </li>
              </ul>
            </transition>
          </div>
          <router-link :to="{name: 'account-settings'}" class="edit-profile-link">
            <i class="fa fa-pencil"></i>edit profile
          </router-link>
        </div>
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
                <i
                  class="popover-icon fa fa-info-circle"
                  v-popover:tooltip="'Members and organisations that match your interests, skills you are in need of or looking to offer.'"
                ></i>
                <br />{{ matches }}
              </div>
              <div class="profile-data__column">
                Community
                <i
                  class="popover-icon fa fa-info-circle"
                  v-popover:tooltip="'People & Organisations that 100% match the 3 main criteria for a match (needs/wants, location, interests)'"
                ></i>
                <br />0
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
            <div class="profile-section__detail"> {{ user.country }}, {{ user.city }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="profile-additional">
      <div class="grid-item">
        <div class="item-holder">
          <div class="title">About Me</div>
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
            My interests
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
            <img src="/img/icons/support-offer-icon.png" />Support i can offer
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
            <img src="/img/icons/support-need-icon.png" />Support i need
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
          <div class="title">My Activity</div>
          <div class="activities">
            <ul class="activities__navigation">
              <li :class="{active: activity == 'projects'}">
                <button @click.prevent="activity = 'projects'">
                  Projects
                  <span>0</span>
                </button>
              </li>
              <li :class="{active: activity == 'following'}">
                <button @click.prevent="activity = 'following'">
                  Chat
                  <!-- <span>0</span> -->
                </button>
              </li>
            </ul>
            <div class="activities__tabs">
              <div class="activities__tab" v-show="activity == 'projects'">
                <template v-if="feed.events.length > 0"></template>
                <template v-else>
                  <div class="no-posts">
                    <div class="no-posts__title">No Projects yet.</div>
                    <p class="no-posts__text">Add projects to your profile by creating your own.</p>
                    <router-link
                      :to="{name: 'projects'}"
                      class="button button--primary"
                    >CREATE A PROJECT</router-link>
                  </div>
                </template>
              </div>
              <div class="activities__tab" v-show="activity == 'following'">
                <template v-if="feed.events.length > 0"></template>
                <template v-else>
                  <div class="no-posts">
                    <div class="no-posts__title">You are not following anyone yet.</div>
                    <p
                      class="no-posts__text"
                    >You can follow the organizations by going to their profiles and clicking on "Follow".</p>
                    <router-link
                      :to="{name: 'organisations'}"
                      class="button button--primary"
                    >GO TO ORGANISATIONS</router-link>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import axios from "@/axios-auth";

import AppIcon from "@/components/AppIcon";

import Footer from "@/components/Footer";

export default {
  name: "UserProfile",
  components: {
    AppIcon,
    Footer
  },
  data() {
    return {
      userMenuActivator: false,
      matches: 0,
      feedPage: {},
      user: {},
      socials: [],
      goals: [],
      support: {
        offer: [],
        need: []
      },
      feed: {
        events: [],
        goals: [],
        posts: []
      },
      activity: "projects"
    };
  },
  mounted() {
    axios
      .get("/users/settings")
      .then(response => {

        this.user = response.data.user;
        this.matches = response.data.match_users_counter;

        this.support.offer = response.data.offer_support;
        this.support.need = response.data.need_support;

        this.goals = response.data.all_goals.filter(item =>
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

        // this.user = response.data.user;

        // this.supportOffer = response.data.offer_support;
        // this.supportNeed = response.data.need_support;
        // this.goals = response.data.all_goals.filter(item =>
        //   response.data.goals.includes(item.id)
        // );
        // document.title = response.data.user.full_name + " | Smiley Movement";
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
  background-position: top;
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

  .profile-column__full-width {
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-bottom: none;
    border-top: none;
    width: 100%;
    flex-basis: 100%;
    min-height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 20px;
  }

  .profile-column__left {
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding-left: 20px;
    display: flex;
  }
  .profile-column__right {
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .profile-section {
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    padding: 35px 50px;
    display: flex;
    flex-wrap: wrap;
    // margin: -1px;

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
    @include font-size(1.3rem);
    flex: 1;
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-left: 1px solid rgba(0, 0, 0, 0.1);

  .grid-item {
    box-sizing: border-box;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-right: 1px solid rgba(0, 0, 0, 0.1);
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
      max-width: 764px;
      width: 100%;
      box-sizing: border-box;
      padding: 25px 30px;
      border-bottom: 1px solid #393939;
      height: 100%;
      background-color: #eeeeee;

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

.button {
  font-family: "Montserrat SemiBold", sans-serif;
  margin-top: 24px;
  width: 100%;
  min-width: 100px;
  max-width: 240px;
  color: #fff;
  background-color: #7d8494;
  display: block;
  padding: 0 12px;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  height: 46px;
  line-height: 46px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  letter-spacing: 2px;
  text-align: center;
  text-transform: uppercase;
  transition: background-color 0.2s, color 0.2s;

  &.button--primary {
    background-color: #f4ed3b;
    color: #000;

    &:hover {
      background-color: #e0db36;
    }
  }

  &:hover {
    color: #fff;
    background-color: #535763;
  }
}

.activities__tab {
  padding-top: 24px;
}

.no-posts {
  .no-posts__title {
    @include font-size(1.2rem);
    font-family: "Montserrat SemiBold", sans-serif;
    color: #000;
  }
  .no-posts__text {
    @include font-size(1rem);
    font-family: "Montserrat Regular", sans-serif;
    color: #000;
    margin-top: 0px;
  }
}

.edit-profile-link {
  text-decoration: none !important;
  border: none !important;
  color: #393939;
  background-color: #f4ed3b;
  cursor: pointer;
  max-width: 250px;
  width: 100%;
  text-align: center;
  padding: 10px 12px;
  display: block;
  text-transform: uppercase;
  font-family: "Montserrat Bold", sans-serif;

  i {
    margin-right: 12px;
  }
}

.profile-actions {
  position: relative;
  display: flex;
  align-items: center;

  .profile-menu-trigger {
    line-height: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    background-color: #fff;
    color: #393939;
    width: 50px;
    height: 50px;
    @include font-size(1.5rem);
  }
  .profile-helper {
    margin-left: 24px;
    font-family: "Montserrat Bold", sans-serif;
    color: #fff;
    letter-spacing: 2.2px;
    @include font-size(1.5rem);
    text-transform: uppercase;
  }
  .profile-menu {
    position: absolute;
    top: calc(100% + 10px);
    background-color: #fff;
    width: 225px;
    box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.3);

    &::before {
      content: "";
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 10px 10px 10px;
      border-color: transparent transparent #ffffff transparent;
      display: block;
      position: absolute;
      top: -10px;
      left: 14px;
    }

    a {
      display: block;
      padding: 10px 15px;
      color: #7d8494;
      text-decoration: none;
      @include font-size(0.9rem);
      transition: background-color 0.2s;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>