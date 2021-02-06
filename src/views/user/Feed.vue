<template>
  <div>
    <div class="textual-banner textual-banner--contained">
      <div class="container">
        <div class="textual-banner__title">This is where the matching happens.</div>
        <p>As the Matchmaker for Good, we rely on the information provided in your Profile to match you with people and organisations around causes you care about.</p>

        <p>Matching is based on 1) shared interests linked to the UN Goals, 2) tools you or your organisation needs or can offer charities within the Smiley community and 3) location</p>
      </div>
    </div>
    <div class="feed-header">
      <div class="feed-grid container">
        <div class="feed-grid__item feed-grid__item--profile">
          <div class="profile">
            <div class="profile-item">
              <div class="profile-title">
                My profile
              </div>
              <div class="profile-avatar">
                <img
                    v-if="user.avatar != null"
                    :src="$settings.images_path.users + 'm_'+ user.avatar"
                />
                <span v-else>{{ user.display_name | filterAvatar }}</span>
              </div>
            </div>
            <div class="profile-item profile-item--full-width">
              <div class="profile__name">{{ user.display_name }}</div>
              <div class="profile__job" v-if="(user.job_title != null)">{{ user.job_title }}</div>
            </div>
            <div class="profile-item profile-item--full-width">
              <div class="profile__location">
                <i class="fa fa-map-marker"></i> {{ user.country }}, {{ user.city }}
              </div>
            </div>
            <div class="profile-item profile-item--matches">
              <div class="profile-title">
                Matches
                <i
                    class="popover-icon fa fa-info-circle"
                    v-popover:tooltip="'Members and organisations that match your interests, skills you are in need of or looking to offer.'"
                ></i>
              </div>
              <div class="profile__numbers">{{ feedPage.match_users_counter }}</div>
            </div>
            <div class="profile-item">
              <div class="profile-title">
                Community
                <i
                    class="popover-icon fa fa-info-circle"
                    v-popover:tooltip="'People & Organisations that 100% match the 3 main criteria for a match (needs/wants, location, interests)'"
                ></i>
              </div>
              <div class="profile__numbers">0</div>
            </div>
            <div class="profile-item profile-item--full-width">
              <div class="profile-progress">
                <div class="profile-title">Profile completion</div>
                <div class="progress-bar">
                  <div class="progress-bar__bar">
                    <div
                        class="progress-bar__progress"
                        :style="{width: user.profile_completion + '%'}"
                    ></div>
                  </div>
                  <div class="progress-bar__percents">{{ user.profile_completion }}%</div>
                </div>
              </div>
            </div>
            <div class="profile-item profile-item--full-width">
              <div>
                <router-link :to="{name: 'profile'}" class="profile__view">My Profile</router-link>
                <!-- <router-link :to="{name: 'profile'}" class="profile__view">view profile</router-link> -->
              </div>
            </div>
          </div>
        </div>
        <div class="feed-grid__item feed-grid__item--community">
          <div class="community-block">
            <h2 class="community-block__title">My community</h2>
            <perfect-scrollbar>
              <UsersList :users="friend_requests_received" title="Pending Friends" v-if="friend_requests_received && friend_requests_received.length > 0" @reload_lists="loadData" :showAcceptButton="true">
                <template v-slot:no_users>You don't have any friend requests yet</template>
              </UsersList>
              <UsersList :users="friend_requests_sent" title="Pending Requests" v-if="friend_requests_sent && friend_requests_sent.length > 0" @reload_lists="loadData" :showCancelButton="true">
                <template v-slot:no_users>You didn't sent any friend requests yet</template>
              </UsersList>
              <UsersList :users="friends" @reload_lists="loadData" :is_friends_list="true" title="Friends">
                <template v-slot:no_users>You don't have any friends yet, try to connect with people from suggested
                  matches
                </template>
              </UsersList>
            </perfect-scrollbar>
          </div>
        </div>
        <div class="feed-grid__item feed-grid__item--projects">
          <div class="projects-block">
            <h2 class="projects-block__title">Suggested Matches</h2>
            <h3 class="projects-block__subtitle">People & organisations that are a close match, that might be of
              interest</h3>
            <perfect-scrollbar>
              <UsersList :users="matches" @reload_lists="loadData" :showMatchScore="true" :showConnectButton="true">
                <template v-slot:no_users>Your don't have any matches yet. Please fill in more information to your profile
                </template>
              </UsersList>
            </perfect-scrollbar>
          </div>
        </div>
        <div class="feed-grid__item feed-grid__item--events">
          <div class="events-block">
            <h2 class="events-block__title">UPCOMING EVENTS</h2>
              <div class="events-block__items">
            <perfect-scrollbar>
                <div
                    class="event-block__item"
                    v-for="(event, index) in events"
                    :key="'event-'+index"
                >
                  <div class="event-block__item-column">
                    <img :src="$settings.images_path.events +'s_'+event.cover_image" class="event-block__item-image"/>
                  </div>
                  <div class="event-block__item-column">
                    <div
                        class="event-block__item-title"
                    >{{ event.title.length > 20 ? event.title.substring(0, 15) + '...' : event.title }}
                    </div>
                  </div>
                  <div class="event-block__item-column">
                    <router-link
                        :to="{name: 'event', params: {slug: event.slug}}"
                        :title="event.title"
                        class="event-block__item-link"
                    >details
                    </router-link>
                  </div>
                </div>
            </perfect-scrollbar>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="feed-sections">
      <div class="feed-sections-grid container">
        <div class="feed-section__item">
          <router-link :to="{name: 'projects'}" class="feed-section__link">
            <i class="fa fa-neuter"></i> Projects
          </router-link>
        </div>
        <div class="feed-section__item">
          <router-link :to="{name: 'members'}" class="feed-section__link">
            <i class="fa fa-users"></i> Members
          </router-link>
        </div>
        <!-- <div class="feed-section__item">
          <router-link to="/" class="feed-section__link">
            <i class="fa fa-qq"></i> Ecosystem
            <br />(comming soon)
          </router-link>
        </div>-->
        <div class="feed-section__item">
          <router-link :to="{name: 'talks'}" class="feed-section__link">
            <i class="fa fa-calendar-check-o"></i> Events
          </router-link>
        </div>
        <!-- <div class="feed-section__item">
          <router-link to="/" class="feed-section__link feed-section__link--hub">
            <i class="fa fa-plus"></i> Create a smiley hub
          </router-link>
        </div>-->
      </div>
    </div>
    <div class="feed-updates">
      <div class="updates-navigation">
        <div class="container">
          <div
              class="updates-navigation__item"
              :class="{active: updatesTab == 'news'}"
              @click="updatesTab = 'news'"
          >
            Smiley
            <small>®</small> News
          </div>
          <div
              class="updates-navigation__item"
              :class="{active: updatesTab == 'updates'}"
              @click="updatesTab = 'updates'"
          >Updates
          </div>
        </div>
      </div>
      <div class="updates-tabs container">
        <div class="updates-tabs__tab updates-tabs__tab--news-grid" v-show="updatesTab == 'news'">
          <template v-if="userNews != null && userNews.length > 0">
            <news-card v-for="article in userNews" :key="'latest-'+article.slug" :article="article"/>

          </template>
          <template v-else>No updates yet</template>
        </div>
        <div class="updates-tabs__tab updates-tabs__tab--news-grid" v-show="updatesTab == 'updates'">
          <news-card v-for="article in latestNews" :key="'latest-'+article.slug" :article="article"/>

        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import axios from "@/axios-auth";

import UsersList from "@/components/feed/UsersList.vue";
import NewsCard from "@/components/cards/NewsCard.vue";
import Footer from "@/components/Footer";

export default {
  name: "UserFeed",
  components: {
    UsersList,
    NewsCard,
    Footer
  },
  data() {
    return {
      user: {},
      userNews: [],
      latestNews: [],
      events: [],
      friends: [],
      friend_requests_received: [],
      friend_requests_sent: [],
      //
      tab: "community",
      updatesTab: "news",
      //  testing
      matches: [],
      feedPage: {}
    };
  },
  methods: {
    loadData() {
      axios
          .get("/users/feed")
          .then(res => {
            console.log("Feed loaded", res);
            this.user = res.data.user;
            this.userNews = res.data.news;
            this.events = res.data.events;
            this.matches = res.data.match_users;

            this.friend_requests_received = res.data.friend_requests_received;
            this.friend_requests_sent = res.data.friend_requests_sent;
            this.friends = res.data.friends;

            this.feedPage = res.data;
          })
          .catch(error => console.error(error));
    }
  },
  mounted() {
    this.loadData();

    axios
        .get("/news/latest")
        .then(res => {
          this.latestNews = res.data.latest_news;

          console.log('Latest Feed News', this.latest);
        })
        .catch(error => console.error(error));

    const metaPayload = {
      title: 'Feed',
      meta: {
        description: ''
      }
    }

    this.$store.dispatch('meta/setMeta', metaPayload);
  }
};
</script>

<style lang="scss" scoped>
.feed-header {
  background-image: url("/img/backgrounds/feed-hero.jpg");
  background-size: cover;
  background-position: center;
  min-height: 450px;
}

.feed-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1px;

  .feed-grid__item {
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    margin-left: -1px;
    margin-right: -1px;
    padding-bottom: 20px;

    &:first-child {
      border-left: 0px;
    }

    &:last-child {
      border-right: 0px;
    }

    &--community {
      padding: 20px;

      .ps {
        height: 480px;
      }
    }

    &--projects {
      padding: 20px;

      .ps {
        height: 440px;
      }
    }

    &--events {
      padding-top: 20px;
      padding-left: 20px;

      .ps {
        height: 500px;
      }
    }
  }
}

.profile {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-top: 20px;
  padding-right: 20px;
  grid-gap: 20px;

  .profile-item {
    &--matches {
      border-right: 1px solid #fff;
    }

    &--full-width {
      grid-column: 1 / span 2;
    }
  }

  .profile-title {
    color: #fff;
    font-family: "Montserrat Bold", sans-serif;
    text-transform: uppercase;
    @include font-size(1.1rem);
  }

  .profile-avatar {
    // margin-top: 35px;
    margin-right: 5px;
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
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .profile__name {
    font-family: "Montserrat SemiBold", sans-serif;

    @include font-size(1.1rem);
    color: #fff;
  }

  .profile__job {
    @include font-size(0.9rem);
    color: #fff;
  }

  .profile__location {
    color: #fff;
    @include font-size(0.9rem);

    i {
      margin-right: 12px;
    }
  }

  .profile__numbers {
    color: #f4ed3b;
    font-family: "Montserrat SemiBold", sans-serif;
    @include font-size(1.2rem);
  }

  .progress-bar {
    display: flex;
    align-items: center;

    .progress-bar__bar {
      width: 100%;
      height: 8px;
      background-color: rgba(216, 216, 216, 0.7);
      position: relative;
    }

    .progress-bar__progress {
      display: block;
      position: absolute;
      left: 0px;
      top: 0px;
      background-color: #f4ed3b;
      height: 100%;
    }

    .progress-bar__percents {
      @include font-size(1rem);
      margin-left: 20px;
      color: #fff;
    }
  }

  .profile__view {
    width: 100%;
    color: #fff;
    border: 1px solid #fff;
    text-transform: uppercase;
    text-decoration: none;
    padding: 10px 20px;
    font-family: "Montserrat SemiBold", sans-serif;
    width: 100%;
    display: block;
    text-align: center;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;

    &:hover {
      background-color: #f4ed3b;
      border-color: #f4ed3b;
      color: #393939;
    }
  }
}

//
.community-block {
  .community-block__title {
    color: #fff;
    font-family: "Montserrat Bold", sans-serif;
    text-transform: uppercase;
    @include font-size(1.1rem);
  }
}

//
.projects-block {
  .projects-block__title {
    color: #fff;
    font-family: "Montserrat Bold", sans-serif;
    text-transform: uppercase;
    @include font-size(1.1rem);
  }

  .projects-block__subtitle {
    color: #fff;
    font-family: "Montserrat Bold", sans-serif;
    text-transform: uppercase;
    @include font-size(.7rem);
  }

  .projects-block__items {
    height: 360px;
    overflow-y: scroll;
  }

  .projects-block__item {
    display: grid;
    grid-template-columns: 50px auto;
    grid-gap: 20px;

    &:not(:last-child) {
      margin-bottom: 20px;
    }

    padding-bottom: 20px;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    }

    &--show-more {
      text-align: center;
      grid-template-columns: 1fr;

      a {
        color: #fff;
        text-decoration: none;
        border-bottom: 1px solid #fff;
        display: inline-block;
        transition: border-color 0.2s;
        @include font-size(0.8rem);

        &:hover {
          border-color: transparent;
        }
      }
    }
  }

  .projects-block__item-column {
    &--full-width {
      grid-column: 1 / span 2;
    }
  }

  .projects-block__item-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }

  .projects-block__item-title {
    color: #fff;
    font-family: "Montserrat SemiBold", sans-serif;
  }

  .projects-block__item-description {
    color: #fff;
    font-family: "Montserrat Regular", sans-serif;
    @include font-size(0.8rem);
  }

  .projects-block__item-link {
    // color: #fff;
    // border: 1px solid #fff;
    text-decoration: none;
    @include font-size(0.8rem);
    font-family: "Montserrat SemiBold", sans-serif;
    display: block;
    padding: 5px 15px;
    text-transform: uppercase;
    height: auto;
    text-align: center;
    transition: background-color 0.2s, color 0.2s;
    background-color: #ffec00;
    color: #393939;

    // &:hover {
    //   background-color: #;
    // }
  }
}

//
.events-block {
  .events-block__title {
    color: #fff;
    font-family: "Montserrat Bold", sans-serif;
    text-transform: uppercase;
    @include font-size(1.1rem);
  }

  .event-block__item {
    display: grid;
    grid-template-columns: 50px auto 90px;
    grid-gap: 20px;

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  .event-block__item-column {
    display: flex;
    align-items: center;
  }

  .event-block__item-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }

  .event-block__item-title {
    color: #fff;
    font-family: "Montserrat SemiBold", sans-serif;
  }

  .event-block__item-link {
    color: #fff;
    border: 1px solid #fff;
    text-decoration: none;
    @include font-size(0.8rem);
    font-family: "Montserrat SemiBold", sans-serif;
    display: block;
    padding: 2px 15px;
    text-transform: uppercase;
    height: auto;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
      background-color: #ffec00;
      color: #393939;
    }
  }
}

// Website sections

.feed-sections {
  background-color: #f4f6f9;
  padding: 30px 0;

  .feed-sections-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
}

.feed-section__item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.feed-section__link {
  @include font-size(1rem);
  color: #393939;
  text-decoration: none !important;
  font-family: "Montserrat Bold", sans-serif;

  i {
    @include font-size(0.8rem);
    margin-right: 8px;
  }

  &--hub {
    width: 100%;
    color: #393939 !important;
    text-transform: uppercase;
    text-decoration: none;
    padding: 10px 20px;
    font-family: "Montserrat SemiBold", sans-serif;
    width: 100%;
    display: block;
    text-align: center;
    background-color: #f4ed3b;

    i {
      transition: transform 0.2s;
      transform-origin: center center;
    }

    &:hover {
      i {
        transform: rotate(90deg);
      }
    }
  }
}

// Main tabs
.feed-updates {
  .updates-navigation {
    background-color: #dee4ed;

    .container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .updates-navigation__item {
    display: block;
    text-align: center;
    font-family: "Montserrat Regular", sans-serif;
    @include font-size(1.5rem);
    @include padding-top(1.5rem);
    @include padding-bottom(1.5rem);
    transition: background-color 0.2s;
    cursor: pointer;
    position: relative;

    &.active {
      font-family: "Montserrat Bold", sans-serif;
      background-color: #f4ed3b;

      &::before {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -7px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 15px 15px 0 15px;
        border-color: #f4ee3b transparent transparent transparent;
      }
    }
  }

  .updates-tabs {
    padding-top: 24px;
  }

  .updates-tabs__tab {
    &--news-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 5px;
    }
  }
}
</style>