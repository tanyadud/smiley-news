<template>
  <div>
    <header class="header">
      <div class="container">
        <div class="header__grid-top">
          <div class="header__column header__column--actions">
            <div class="actions">
              <img src="/images/main/icon-bars.svg" class="header__bars"/>
              <template v-if="loggedIn">
                <router-link :to="{name: 'feed'}" class="home-link">
                  <template v-if="user.avatar">
                    <img :src="$settings.images_path.users + 's_' + user.avatar" class="user__avatar"/>
                  </template>
                  <template v-else>
                    <img src="/images/main/icon-profile.svg" class="user__avatar"/>
                  </template>
                </router-link>
              </template>
              <template v-else>
                <router-link :to="{name: 'login'}" class="home-link">
                  <img src="/images/main/icon-profile.svg" class="user__avatar"/>
                </router-link>
              </template>
              <template v-if="loggedIn">
                <router-link :to="{name: 'feed'}" class="text-link">{{ user.initials }}</router-link>
              </template>
              <template v-else>
                <router-link :to="{name: 'register'}" class="text-link">Join us</router-link>
              </template>
            </div>
          </div>
          <div class="header__column header__column--logo">
            <router-link :to="{name: 'home'}" class="home-link">
              <img src="/images/main/smiley-news-logo.svg" alt="Smiley Movement"/>
            </router-link>
          </div>
          <nav class="header__column header__column--socials">
            <ul class="social">
              <li class="social__item">
                <a :href="social.instagram" class="social__icon">
                  <img
                      src="/images/main/social-instagram.svg"
                      class="social__image"
                      alt="SmileyMovement on Instagram"
                      title="SmileyMovement on Instagram"/>
                </a>
              </li>
              <li class="social__item">
                <a :href="social.youtube" class="social__icon">
                  <img
                      src="/images/main/social-youtube.svg"
                      class="social__image"
                      alt="SmileyMovement on YouTube"
                      title="SmileyMovement on YouTube"/>
                </a>
              </li>
              <li class="social__item">
                <a :href="social.facebook" class="social__icon">
                  <img
                      src="/images/main/social-facebook.svg"
                      class="social__image"
                      alt="SmileyMovement on Facebook"
                      title="SmileyMovement on Facebook"/>
                </a>
              </li>
              <li class="social__item">
                <a :href="social.twitter" class="social__icon">
                  <img
                      src="/images/main/social-twitter.svg"
                      class="social__image"
                      alt="SmileyMovement on Twitter"
                      title="SmileyMovement on Twitter"/>
                </a>
              </li>
              <li class="social__item">
                <img src="/images/main/icon-search.svg"/>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="container">
        <ul class="main-menu">
          <li class="main-menu__item">
            <router-link
                class="main-menu__link"
                :to="{name: 'news-category-item', params: {slug: 'good-health-and-well-being'}}">Mental Health
            </router-link>
          </li>
          <li class="main-menu__item">
            <router-link
                class="main-menu__link"
                :to="{name: 'news-category-item', params: {slug: 'sustainable-cities-and-communities'}}">Sustainability
            </router-link>
          </li>
          <li class="main-menu__item">
            <router-link
                class="main-menu__link"
                :to="{name: 'news-category-item', params: {slug: 'climate-action'}}">Climate
            </router-link>
          </li>
          <li class="main-menu__item">
            <router-link
                class="main-menu__link"
                :to="{name: 'news-category-item', params: {slug: 'gender-equality'}}">Equality
            </router-link>
          </li>
          <li class="main-menu__item">
            <router-link
                class="main-menu__link"
                :to="{name: 'news-category-item', params: {slug: 'peace-justice-and-strong-institutions'}}">Social Justice
            </router-link>
          </li>
          <li class="main-menu__item">
            <router-link
                class="main-menu__link"
                :to="{name: 'news-category-item', params: {slug: 'decent-work-and-economic-growth'}}">Economic Growth
            </router-link>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "Header",
  data() {
    return {
      social: {
        facebook: process.env.VUE_APP_SOCIAL_FACEBOOK,
        linkedin: process.env.VUE_APP_SOCIAL_LINKEDIN,
        twitter: process.env.VUE_APP_SOCIAL_TWITTER,
        instagram: process.env.VUE_APP_SOCIAL_INSTAGRAM,
        youtube: process.env.VUE_APP_SOCIAL_YOUTUBE,
      },
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters["user/isAuthenticated"];
    },
    user() {
      return this.$store.getters["user/user"];
    },
  },
  methods: {
    find() {
      router.push({
        name: "search",
        params: {keyword: this.search}
      });
      this.searchActive = false;
    },
  }
};
</script>

<style lang="scss" scoped>
header {
  padding-top: 1.5rem;
  padding-bottom: 1.8rem;
  position: relative;
  z-index: 10;
  background: #fff;
}

.header {
  &__grid-top {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  &__column {
    display: flex;
    align-items: flex-end;

    &--actions {
      & > div {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }

    &--socials {
      justify-content: flex-end;

      ul {
        margin-bottom: 0px;
      }
    }

    &--logo {
      justify-content: center;
    }
  }

  &__bars {
    height: 24px;
    width: 24px;
    object-fit: contain;
    margin-right: 1rem;
  }
}


.user {
  &__avatar {
    height: 36px;
    width: 36px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 1rem;
  }
}

.home-link {
  img {
    max-width: 320px;
    height: auto;
  }
}

.text-link {
  font-size: 1.4rem;
  color: #000;
  border-bottom: 1px solid transparent;
  transition: border-color .2s;

  &:hover {
    text-decoration: none;
    border-color: #000;
  }
}

.main-menu {
  margin: 2.5rem 0px 0px 0px;
  padding: 0px;
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &__item {
    margin-left: 1.25rem;
    margin-right: 1.25rem;
  }

  &__link {
    color: #000;
    font-size: 1.2rem;
    border-bottom: 1px solid transparent;
    transition: .2s;

    &:hover {
      color: #000;
      text-decoration: none;
      border-color: #000
    }

    &.router-link-exact-active {
      color: #000;
      border-color: #000
    }
  }
}
</style>
