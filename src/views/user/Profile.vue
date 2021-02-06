<template>
  <!-- TODO: GLOBAL -> use svg sprties -->
  <div>
    <div class="profile-layout">
      <div class="profile-grid container">
        <div class="profile-grid__item profile-grid__item--avatar">
          <div class="profile__avatar">
            <div class="profile__avatar-badge"></div>
            <img v-if="user.avatar !== null" :src="$settings.images_path.users + 'm_'+ user.avatar" />
            <span v-else>{{ user.display_name | filterAvatar}}</span>
          </div>
          <div class="profile__name">{{user.display_name}}</div>
          <div class="profile__job" v-if="(user.job_title != null)">{{user.job_title}}</div>
          <div class="profile__location" v-if="(user.location != null)">{{user.location}}</div>
        </div>
        <div class="profile-grid__item profile-grid__item--buttons">
          <router-link to="account-settings" class="follow-btn">Edit</router-link>
          <!-- <button class="follow-btn">Follow</button> -->
        </div>
        <div class="profile-grid__item profile-grid__item--about">
          <div class="profile__about">
            <div class="profile__about-title">About me:</div>
            <div
              class="profile__about-content"
              v-html="user.bio || 'Oh, we have no information for this block yet :('"
            ></div>
          </div>
        </div>
        <div class="profile-grid__item profile-grid__item--sidebar">
          <div class="profile__sidebar">
            <div class="profile__sidebar-title">Connections:</div>
            <div class="profile__sidebar-content">50+ connections</div>
          </div>
          <div class="profile__sidebar">
            <div class="profile__sidebar-title">Community:</div>
            <div class="profile__sidebar-content">0</div>
          </div>
          <!-- TODO - hide block if none media is filled && add v-if -->
          <div class="profile__sidebar">
            <div class="profile__sidebar-title">My social media:</div>
            <div class="profile__sidebar-content">
              <ul class="profile__social">
                <li v-for="(social, index) in socials" :key="'user-social-'+index">
                  <a :href="user[social]" v-if="user[social] != null">
                    <app-icon :name="social" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="profile-grid__item profile-grid__item--support"
          v-if="supportNeed.length > 0 || supportOffer.length > 0"
        >
          <div class="profile__section" v-if="supportOffer.length > 0">
            <div class="profile__section-title">
              <img src="/img/give.svg" />
              Support I can offer:
            </div>
            <ul class="profile__section-support support-list">
              <li
                class="support-list__item"
                v-for="(item, index) in supportNeed"
                :key="'i-need-'+index"
              >
                <div class="support-list__category-container">
                  <div class="support-list__category">{{item.support_category.title}}</div>
                  <div class="support-list__subcategory">{{item.title}}</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="profile__section">
            <div class="profile__section-title" v-if="supportNeed.length > 0">
              <img src="/img/need.svg" />
              Support I Need:
            </div>
            <ul class="profile__section-support">
              <li
                class="support-list__item"
                v-for="(item, index) in supportNeed"
                :key="'i-need-'+index"
              >
                <div class="support-list__category-container">
                  <div class="support-list__category">{{item.support_category.title}}</div>
                  <div class="support-list__subcategory">{{item.title}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="profile-grid__item profile-grid__item--goals">
          <div class="profile__section">
            <div class="profile__section-title">My interests (UN Goals):</div>
            <ul class="profile__section-goals">
              <li v-for="goal in goals" :key="goal.id">
                <img :src="$settings.images_path.goals + 's_' + goal.image" alt="icon" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="block-title container">Events I'm going to:</div>
    <div class="events-grid container" v-if="events.length > 0">
      <event-card :event="event" class="talk-card" v-for="event in events" :key="'c-'+event.id" />
    </div>
    <div class="block-title container">Latest News:</div>
    <div class="news-grid container">
      <article-item v-for="article in feed" :key="article.slug" :information="article" />
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "@/axios-auth";

import InformationHero from "@/components/InformationHero.vue";
import AppIcon from "@/components/AppIcon";
import ArticleItem from "@/components/news/Article.vue";
import EventCard from "@/components/cards/Event-Card";

import Footer from "@/components/Footer";

export default {
  data() {
    return {
      user: {
        avatar: null
      },
      socials: ["facebook", "linkedin", "google", "instagram", "twitter"],
      goals: [],
      supportOffer: [],
      supportNeed: [],
      feed: [],
      events: []
    };
  },
  methods: {},
  components: {
    InformationHero,
    AppIcon,
    ArticleItem,
    EventCard,
    Footer
  },
  mounted() {
    axios
      .get("/users/settings")
      .then(response => {
        console.log("user-data", response.data);
        this.user = response.data.user;

        this.supportOffer = response.data.offer_support;
        this.supportNeed = response.data.need_support;
        this.goals = response.data.all_goals.filter(item =>
          response.data.goals.includes(item.id)
        );
        document.title = response.data.user.full_name + " | Smiley Movement";
      })
      .catch(error => console.error(error));

    axios
      .get("/events")
      .then(response => {
        this.events = response.data.events;
        this.events.length = 4;
      })
      .catch(error => console.error(error));

    axios
      .get("/users/feed")
      .then(res => {
        this.feed = res.data.posts.splice(0, 3);
      })
      .catch(error => console.error(error));
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/sections/_user-profile";
@import "@/scss/components/_article-item";
@import "@/scss/blocks/_homepage-news-grid";

.profile-layout {
  background-image: url("/img/components/information-hero.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    background-color: #000;
    opacity: 0.7;
  }
}

.profile__avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
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

.profile__name {
  font-family: "Montserrat Bold", sans-serif;
  text-transform: uppercase;
  @include font-size(2rem);
  color: #fff;
  @include margin-left(1.5rem);
}

.profile__about {
  .profile__about-title {
    @include font-size(2rem);
    font-family: "Montserrat SemiBold", sans-serif;
    color: #fff;
  }

  .profile__about-content {
    font-family: "Montserrat Regular";
    color: #fff;
    @include font-size(1.2rem);
  }
}

.profile__sidebar {
  &:not(:last-child) {
    @include margin-bottom(1.5rem);
  }
  .profile__sidebar-title {
    text-transform: uppercase;
    font-family: "Montserrat Regular";
    letter-spacing: 4px;
    color: #fff;
    @include margin-bottom(0.7rem);
  }
  .profile__sidebar-content {
    font-family: "Montserrat Regular";
    color: #fff;
  }
}

.profile__social {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0.5rem;

  a {
    max-width: auto;
    display: inline-block;
  }
}

.profile__section {
  &:not(:last-child) {
    @include margin-bottom(1.5rem);
  }
  .profile__section-title {
    @include font-size(2rem);
    @include margin-bottom(1rem);
    font-family: "Montserrat SemiBold", sans-serif;
    color: #fff;
    display: flex;
    align-items: center;

    img {
      max-width: 36px;
      max-height: 36px;
      margin-right: 16px;
    }
  }

  .profile__section-goals {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(5, 1fr);

    img {
      max-width: 100%;
      height: auto;
    }
  }

  .profile__section-support {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    color: #fff;

    .support-list__category {
      font-family: "Montserrat SemiBold", sans-serif;
      @include font-size(1.2rem);
    }
    .support-list__subcategory {
      font-family: "Montserrat Regular", sans-serif;
      @include font-size(1rem);
    }
  }
}

// ----------
.block-title {
  font-family: "Montserrat Bold", sans-serif;
  @include font-size(2rem);
  @include margin-top(2rem);
  @include margin-bottom(2.5rem);
}
.news-grid {
  padding-top: 0px;
}

.events-grid {
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(4, 1fr);

  .talk-card {
    width: 100% !important;
  }
}

//
.follow-btn {
  margin-top: 24px;
  display: block;
  height: 48px;
  width: 100%;
  margin-bottom: 15px;
  text-transform: uppercase;
  font: 600 16px/24px "Montserrat SemiBold", sans-serif;
  border-radius: 4px;
  cursor: pointer;
  background-color: $default-orange-btns;
  color: #393939;
  border: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.profile-grid {
  display: grid;
  grid-gap: 60px;
  grid-template-columns: repeat(4, 1fr);
  padding-top: 30px;
  padding-bottom: 30px;
  position: relative;
  z-index: 2;

  .profile-grid__item.profile-grid__item--avatar {
    grid-column: 1 / span 3;
    display: flex;
    align-items: center;
  }
  .profile-grid__item.profile-grid__item--buttons {
    // grid-column: 3 / span 1;
  }
  .profile-grid__item.profile-grid__item--about {
    grid-column: 1 / span 3;
  }
  .profile-grid__item.profile-grid__item--goals {
    grid-column: 3 / span 2;
  }
  .profile-grid__item.profile-grid__item--support {
    grid-column: 1 / span 2;
  }
  .profile-grid__item.profile-grid__item--news {
    grid-column: 1 / span 4;
  }
}
</style>