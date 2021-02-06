<template>
  <div>
    <Breadcrumbs :custom="true" :items="breadcrumbsItems"/>

    <div class="main-bg">
      <div class="textual-banner textual-banner--contained">
        <div class="container">
          <div class="textual-banner__title">Organisation page</div>
          <p>This is where we learn about your organisation, charitable vision and mission whether you're a
            registered non-profit, social enterprise, charitable foundation, Trust, educational institution,
            local authority or conscientious private business</p>
        </div>
      </div>
      <div class="organisation-bg">
        <div class="organisation-grid container">
          <div class="grid-item grid-item--top-panel" v-if="is_owner && loggedIn">
            <router-link
                :to="{name: 'edit-organisation'}"
                class="button button--primary"
                v-if="is_owner"
                @click.prevent="follow"
            >
              <i class="fa fa-pencil"></i> Edit Organisation
            </router-link>
            <button class="button button--primary" @click.prevent="addOrganisationPost">
              <i class="fa fa-newspaper-o"></i> Create Post
            </button>
            <router-link :to="{name: 'create-project'}" class="button button--primary">
              <i class="fa fa-connectdevelop"></i> Create Project
            </router-link>
          </div>
          <div class="grid-item grid-item--main">
            <div class="organisation-avatar">
              <div class="organisation-avatar__logo">
                <img
                    v-if="organisation.logo != null"
                    :src="$settings.images_path.organisations + 'm_'+ organisation.logo"
                />
                <span v-else>{{ organisation.name | filterAvatar }}</span>
              </div>
            </div>
            <div class="organisation-info">
              <div class="organisation-name">{{ organisation.name }}</div>
              <div class="organisation-data">
                <button
                    class="button button--primary"
                    v-if="!following"
                    @click.prevent="follow"
                >+ follow
                </button>
                <button class="button button--primary" v-else @click.prevent="unfollow">- unfollow</button>
              </div>
            </div>
          </div>
          <div class="grid-item grid-item--socials">
            <template v-if="socials.length > 0">
              <ul class="organisation-social organisation-social--header">
                <li v-for="social in socials" :key="'social-'+social.name">
                  <a target="_blank" :href="social.value">
                    <i class="fa" :class="'fa-'+social.name" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </template>
            <template v-else>No networks connected</template>
            <div class="organisation-network">
              <div class="network-row" v-if="organisation.website != null">
                <div class="network-row__title">Website:</div>
                <div class="network-row__value">
                  <i class="fa fa-link" aria-hidden="true"></i>
                  <a :href="organisation.website" target="_blank">{{ organisation.website }}</a>
                </div>
              </div>
              <div class="network-row">
                <div class="network-row__title">Location:</div>
                <div class="network-row__value">
                  <template v-if="organisation.location != null">
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    {{ organisation.location }}
                  </template>
                  <template v-else>No location selected</template>
                </div>
              </div>
              <ul class="goals">
                <li v-if="organisation.main_goal != null">
                  <img :src="$settings.images_path.goals + 's_' + organisation.main_goal.image" alt="icon"/>
                </li>
                <li v-for="goal in organisation.other_goals" :key="'goal-'+goal.slug">
                  <img :src="$settings.images_path.goals + 's_' + goal.image" alt="icon"/>
                </li>
              </ul>
            </div>
          </div>
          <div class="grid-item grid-item--support">
            <img src="/img/created-by-smiley.png"/>
            <i
                class="popover-icon fa fa-info-circle"
                v-popover:tooltip="'This editorial page has been created by Smiley Movement. If you are associated with this organisation and would like to manage this page, please contact us'"
            ></i>
          </div>
        </div>
      </div>
      <div class="organisation-additional container">
        <template v-if="organisation.video">
          <div class="grid-item ">
            <div class="item-holder">
              <div class="about">
                <img :src="$settings.images_path.organisations + 'images/m_'+ organisation.organisation_images[0]"
                     v-if="organisation.organisation_images != null && organisation.organisation_images.length > 0"/>
                <div
                    v-html="organisation.description"
                    v-if="organisation.description != null && organisation.description.length > 10"
                ></div>
                <div v-else>No organisation bio to show</div>
                <img :src="$settings.images_path.organisations + 'images/m_'+ organisation.organisation_images[1]"
                     v-if="organisation.organisation_images != null && organisation.organisation_images.length > 1"/>
              </div>
            </div>
          </div>
          <div class="grid-item" v-if="organisation.video">
            <div
                class="item-holder"
                v-html="organisation.video"
            >
            </div>
            <div class="grid-item">
              <div
                  class="item-holder"
                  v-if="organisation.donation_link || organisation.volunteer_link || organisation.fundraise_link"
              >
                <div class="volunteer">
                  <div class="title">How to support {{ organisation.name }}</div>
                  <ul class="volunteer-actions">
                    <li>
                      <a
                          :href="organisation.donation_link"
                          target="_blank"
                          class="button button--primary"
                          :class="{'disabled': !organisation.donation_link}"
                          rel="noopener noreferrer"
                      >Donate</a>
                    </li>
                    <li>
                      <a
                          :href="organisation.volunteer_link"
                          target="_blank"
                          class="button button--primary"
                          :class="{'disabled': !organisation.volunteer_link}"
                          rel="noopener noreferrer"
                      >Volunteer</a>
                    </li>
                    <li>
                      <a
                          :href="organisation.fundraise_link"
                          target="_blank"
                          class="button button--primary"
                          :class="{'disabled': !organisation.fundraise_link}"
                          rel="noopener noreferrer"
                      >Fundraise</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="grid-item">
              <div class="item-holder">
                <div class="title">Share this page</div>
                <ul class="organisation-social">
                  <li>
                    <a :href="shareLink('twitter')" target="_blank">
                      <app-icon name="twitter"/>
                    </a>
                  </li>
                  <li>
                    <a :href="shareLink('facebook')" target="_blank">
                      <app-icon name="facebook"/>
                    </a>
                  </li>
                  <li>
                    <a :href="shareLink('linkedin')" target="_blank">
                      <app-icon name="linkedin"/>
                    </a>
                  </li>
                </ul>
                <div class="url-share">
                  <input readonly :value="domain+'/organisations/' + this.$route.params.slug"/>
                  <button type="button" class="button button--primary">Copy link</button>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="grid-item grid-item--full-width align-right">
            <div class="item-holder">
              <div class="about about--columns">
                <img :src="$settings.images_path.organisations + 'images/m_'+ organisation.organisation_images[0]"
                     v-if="organisation.organisation_images != null && organisation.organisation_images.length > 0"/>
                <div
                    v-html="organisation.description"
                    v-if="organisation.description != null && organisation.description.length > 10"
                ></div>
                <div v-else>No organisation bio to show</div>
                <img :src="$settings.images_path.organisations + 'images/m_'+ organisation.organisation_images[1]"
                     v-if="organisation.organisation_images != null && organisation.organisation_images.length > 1"/>
              </div>
            </div>
          </div>
        <div class="grid-item">
          <div
              class="item-holder"
              v-if="organisation.donation_link || organisation.volunteer_link || organisation.fundraise_link"
          >
            <div class="volunteer">
              <div class="title">How to support {{ organisation.name }}</div>
              <ul class="volunteer-actions">
                <li>
                  <a
                      :href="organisation.donation_link"
                      target="_blank"
                      class="button button--primary"
                      :class="{'disabled': !organisation.donation_link}"
                      rel="noopener noreferrer"
                  >Donate</a>
                </li>
                <li>
                  <a
                      :href="organisation.volunteer_link"
                      target="_blank"
                      class="button button--primary"
                      :class="{'disabled': !organisation.volunteer_link}"
                      rel="noopener noreferrer"
                  >Volunteer</a>
                </li>
                <li>
                  <a
                      :href="organisation.fundraise_link"
                      target="_blank"
                      class="button button--primary"
                      :class="{'disabled': !organisation.fundraise_link}"
                      rel="noopener noreferrer"
                  >Fundraise</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="grid-item">
          <div class="item-holder">
            <div class="title">Share this page</div>
            <ul class="organisation-social">
              <li>
                <a :href="shareLink('twitter')" target="_blank">
                  <app-icon name="twitter"/>
                </a>
              </li>
              <li>
                <a :href="shareLink('facebook')" target="_blank">
                  <app-icon name="facebook"/>
                </a>
              </li>
              <li>
                <a :href="shareLink('linkedin')" target="_blank">
                  <app-icon name="linkedin"/>
                </a>
              </li>
            </ul>
            <div class="url-share">
              <input readonly :value="domain+'/organisations/' + this.$route.params.slug"/>
              <button type="button" class="button button--primary">Copy link</button>
            </div>
          </div>
        </div>
        </template>

      </div>

      <template v-if="false">
        <div class="container">
          <section class="section" v-if="posts.length > 0" id="section-news">
            <h2 class="section__title">News</h2>
            <swiper
                ref="newsSwiper"
                :options="itemsSwiperOptions"
                :auto-update="true"
                :auto-destroy="true"
                :delete-instance-on-destroy="true"
                :cleanup-styles-on-destroy="true"
                v-if="is_mobile"
            >
              <swiper-slide v-for="post in posts" :key="'post-swiper-'+post.slug">
                <news-card :article="post"/>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div class="grid grid--news" v-else>
              <news-card v-for="post in posts" :key="'post-'+post.slug" :article="post"/>
            </div>
          </section>
          <section class="section" v-if="events.length > 0" id="section-events">
            <h2 class="section__title">Events</h2>
            <swiper
                ref="eventsSwiper"
                :options="itemsSwiperOptions"
                :auto-update="true"
                :auto-destroy="true"
                :delete-instance-on-destroy="true"
                :cleanup-styles-on-destroy="true"
                v-if="is_mobile"
            >
              <swiper-slide v-for="event in events" :key="'event-swiper-'+event.slug">
                <event-card :event="event"/>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div class="grid grid--events" v-else>
              <event-card
                  v-for="event in events"
                  :key="'event-'+event.slug"
                  :event="event"
                  :past="event.past"
              />
            </div>
          </section>
        </div>
      </template>
      <Footer/>
    </div>
  </div>
</template>

<script>
import axios from "@/axios-auth";

import AppIcon from "@/components/AppIcon";

import Breadcrumbs from "@/components/Breadcrumbs";
import NewsCard from "@/components/cards/NewsCard";
import EventCard from "@/components/cards/EventCard";
import Footer from "@/components/Footer";

export default {
  name: "OrganisationProfile",
  components: {
    Breadcrumbs,
    AppIcon,
    NewsCard,
    EventCard,
    Footer
  },
  data() {
    return {
      breadcrumbsItems: [
        {
          path: '/organisations',
          meta: {
            title: 'Organisations'
          }
        }
      ],
      photos: true,
      organisation: {
        followers: 0,
        other_goals: []
      },
      is_owner: false,
      is_mobile: false,

      following: false,
      posts: [],
      events: [],
      Toast: () => {
      },
      activity: "projects",
      organisationPost: "",
      feed: {
        projects: [],
        news: [],
        news_count: 0,
        hubs: []
      },
      socials: [],
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        slidesPerView: 1.2,
        spaceBetween: 30,
        mousewheel: true
      },
      itemsSwiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        slidesPerView: 4,
        spaceBetween: 15,
        mousewheel: true,
        breakpoints: {
          320: {
            slidesPerView: 1,
            centeredSlides: true
          },
          480: {
            slidesPerView: 1.3
          },
          640: {
            slidesPerView: 1.5
          }
        }
      }
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters["user/isAuthenticated"];
    },
    domain() {
      return process.env.VUE_APP_DOMAIN;
    }
  },
  methods: {
    follow() {
      axios
          .post("/organisations/" + this.$route.params.slug + "/follow")
          .then(result => {
            if (result.data.success) {
              this.Toast.fire({icon: "info", title: result.data.message});

              axios
                  .get("/organisations/" + this.$route.params.slug)
                  .then(res => {
                    this.organisation = res.data.organisation;
                    this.following = res.data.following;
                  })
                  .catch(error => console.error("Error", error));
            }
          })
          .catch(err => {
            // TODO: add error
          });
    },
    unfollow() {
      axios
          .post("/organisations/" + this.$route.params.slug + "/un-follow")
          .then(result => {
            if (result.data.success) {
              this.Toast.fire({icon: "info", title: result.data.message});

              axios
                  .get("/organisations/" + this.$route.params.slug)
                  .then(res => {
                    this.organisation = res.data.organisation;
                    this.following = res.data.following;
                  })
                  .catch(error => console.error("Error", error));
            }
          })
          .catch(err => {
            // TODO: add error
          });
    },
    addOrganisationPost() {
      this.$swal
          .fire({
            title: "Add Organisation Post",
            text: "Please note, that min length should be 32 characters",
            input: "textarea",
            inputAttributes: {
              autocapitalize: "off",
              placeholder: ""
            },
            showCancelButton: true,
            confirmButtonText: "Add post",
            showLoaderOnConfirm: true
          })
          .then(result => {
            if (result.value && result.value.length > 31) {
              axios
                  .post("/organisations/posts", {content: result.value})
                  .then(res => {
                    axios
                        .get("/organisations/" + this.$route.params.slug + "/posts")
                        .then(res => {
                          this.feed.news = res.data.organisation_posts;
                        });
                    Toast.fire({icon: "success", title: "Post added"});
                  })
                  .catch(error => {
                    console.error(error);
                  });
            }
          });
    },
    dateAgo(date) {
      const currentStamp = Date.now();
      const realDate = this.$dayjs(date);
      const postStamp = this.$dayjs(date).unix() * 1000;
      const dateDiff = currentStamp - postStamp;
      const days = dateDiff / (1000 * 3600 * 24);

      const result = Math.floor(days);

      const append = result == 1 ? "day" : "days";

      let time = "";

      if (result == 0) {
        time = "Today";
      } else if (result < 28) {
        time = result + " " + append + " ago";
      } else {
        const month = realDate.date();
        const day = realDate.month() + 1;
        const year = realDate.year();
        time = day + "-" + month + "-" + year;
      }

      return time;
    },
    shareLink(type) {
      let result = "";
      const title = encodeURI(this.organisation.title);
      const url = process.env.VUE_APP_DOMAIN + encodeURI(this.$route.path);
      switch (type) {
        case "facebook":
          result = `https://www.facebook.com/sharer.php?u=${url}&t=${title}`;
          break;
        case "twitter":
          result = `http://twitter.com/share?text=${title}&url=${url}`;
          break;
        case "linkedin":
          result = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
          break;
      }

      return result;
    },
    handleResize() {
      this.is_mobile = window.innerWidth >= 768 ? false : true;
      if (window.innerWidth >= 768) {
        this.is_shown = true;
      }
    }
  },
  mounted() {

    this.Toast = this.$swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: toast => {
        toast.addEventListener("mouseenter", this.$swal.stopTimer);
        toast.addEventListener("mouseleave", this.$swal.resumeTimer);
      }
    });

    axios
        .get("/organisations/" + this.$route.params.slug + "/admin-created")
        .then(response => {
          console.log(
              `Organisation Loaded: ${this.$route.params.slug}`,
              response
          );

          this.organisation = response.data.organisation;
          this.feed.news = response.data.organisation_posts;
          this.is_owner = response.data.is_owner;

          const metaPayload = {
            meta: response.data.meta,
            title: response.data.organisation.name
          }

          this.$store.dispatch('meta/setMeta', metaPayload);

          this.breadcrumbsItems.push(
              {
                meta: {
                  title: response.data.organisation.name
                }
              }
          );


          this.posts = response.data.news;
          this.events = response.data.events;

          if (response.data.organisation.facebook != null) {
            this.socials.push({
              name: "facebook",
              value: response.data.organisation.facebook
            });
          }
          if (response.data.organisation.instagram != null) {
            this.socials.push({
              name: "instagram",
              value: response.data.organisation.instagram
            });
          }
          if (response.data.organisation.twitter != null) {
            this.socials.push({
              name: "twitter",
              value: response.data.organisation.twitter
            });
          }
          if (response.data.organisation.linkedin != null) {
            this.socials.push({
              name: "linkedin",
              value: response.data.organisation.linkedin
            });
          }
          if (response.data.organisation.google != null) {
            this.socials.push({
              name: "google",
              value: response.data.organisation.google
            });
          }

          this.following = response.data.following;

          document.title = response.data.organisation.name + " | Smiley Movement";
        })
        .catch(error => console.error("Error", error));
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>

<style lang="scss" scoped>
.main-bg {
  background-color: #f4f6f9;
}

.organisation-bg {
  background-image: url("/img/backgrounds/subheader_bg.jpg");
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
}

.organisation-grid {
  display: grid;
  grid-template-columns: 40% 40% 20%;
  color: #fff;
  grid-gap: 1px;

  @include xlMax {
    grid-template-columns: repeat(2, 1fr);
  }
  @include mdMax {
    display: flex;
    flex-direction: column;
  }

  .grid-item {
    padding: 25px;
    box-sizing: border-box;
    // border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-right: 1px solid rgba(255, 255, 255, 0.5);

    &.grid-item--full-width {
    }

    &.grid-item--top-panel {
      grid-column: 1 / span 3;
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      border-right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;

      @include xlMax {
        grid-column: 1 / span 2;
      }

      @include lgMax {
        flex-wrap: nowrap;
      }

      @include smMax {
        flex-wrap: wrap;
      }

      .button {
        margin: 5px !important;
      }
    }

    &.grid-item--main {
      display: flex;

      @include lgMax {
        flex-direction: column;
      }
    }

    &.grid-item--socials {
      @include lgMax {
        border-right: 0;
      }

      @include smMax {
        .organisation-social {
          li {
            &:first-child {
              width: 100%;
            }
          }
        }
      }
    }

    &.grid-item--support {
      position: relative;

      img {
        max-width: 100%;
        height: auto;
      }

      i {
        position: absolute;
        bottom: 15px;
        right: 15px;
        font-size: 32px;
      }

      @include xlMax {
        grid-column: 1 / span 2;
        border-top: 1px solid rgba(255, 255, 255, 0.5);
      }
    }

    &:last-child {
      border-right: none;
    }

    .title {
      @include font-size(1.2rem);
      font-weight: bold;
      font-family: "Montserrat Bold", sans-serif;
      color: #fff;
      text-transform: uppercase;
      display: flex;
      align-items: center;
    }

    .content {
      @include font-size(1rem);
      font-family: "Montserrat Regular", sans-serif;
      color: #fff;
      text-transform: uppercase;
      display: flex;
      align-items: center;
    }

    .button {
    }
  }
}

.organisation-social {
  display: flex;
  flex-wrap: wrap;
  margin-left: -5px;
  margin-top: -5px;
  font-size: 1rem;
  line-height: 1;
  align-items: center;
  color: #fff;
  font-family: "Montserrat SemiBold", sans-serif;
  margin-bottom: 0px;

  &.organisation-social--header {
    justify-content: center;

    a {
      color: #fff;
      display: flex;
      width: 36px;
      height: 36px;
      line-height: 1;
      align-items: center;
      justify-content: center;
      border: 1px solid #fff;
      padding: 2px;
      @include font-size(1.2rem);
      transition: background-color 0.2s, color 0.2s;

      &:hover {
        background-color: #fff;
        color: #393939;
        text-decoration: none;
      }
    }
  }

  li {
    margin: 5px;
  }
}

.organisation-network {
  margin-left: -25px;
  margin-right: -25px;
  margin-top: 25px;
  padding: 25px;
  border-top: 1px solid #fff;
  font-family: "Montserrat Regular", sans-serif;
  margin-bottom: 0px;
  padding-bottom: 0;

  .network-row {
    display: flex;

    &:not(:last-child) {
      margin-bottom: 16px;
    }

    @include lgMax {
      flex-direction: column;
    }
  }

  .network-row__title {
    font-family: "Montserrat SemiBold", sans-serif;
    min-width: 100px;
  }

  .network-row__value {
    i {
      width: 24px;
      margin-right: 10px;
      text-align: center;
    }

    a {
      color: #fff;
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
  text-decoration: none !important;
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

  &.button--primary {
    background-color: #f4ed3b;
    color: #000;
  }

  &.button--edit {
    max-width: 130px;
    min-width: auto;
    width: 100%;
  }

  &.button--primary {
    background-color: #f4ed3b;
    color: #000;

    &.disabled {
      pointer-events: none;
      background-color: rgba(0, 0, 0, .3);
      color: #fff;
    }

    &:hover {
      background-color: #e0db36;
      color: #000;
    }
  }

  &:hover {
    color: #fff;
    background-color: #535763;
  }
}

.organisation-avatar {
  margin-bottom: 24px;
}

.organisation-avatar__logo {
  margin-top: 35px;
  margin-right: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  font-family: "Montserrat Bold", sans-serif;
  text-transform: uppercase;
  @include font-size(2rem);
  letter-spacing: 4px;
  color: #393939;
  background-color: #eeb400;
  text-align: center;
  line-height: 1;

  @include mdMax {
    margin: 0 auto;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}

.organisation-info {
  margin-top: 35px;
  font-family: "Montserrat Bold", sans-serif;
  color: #fff;
  @include font-size(1.3);
}

.organisation-name {
  @include font-size(1.5rem);
  @include margin-bottom(1rem);
  font-family: "Montserrat SemiBold", sans-serif;
}

.organisation-job {
  @include margin-bottom(1rem);
  font-family: "Montserrat SemiBold", sans-serif;
}

.organisation-data {
  display: flex;
  flex-wrap: wrap;
  @include font-size(1.3rem);
  font-family: "Montserrat SemiBold", sans-serif;

  .organisation-data__column {
    width: 50%;
    box-sizing: border-box;
    padding-left: 25px;

    &:first-child {
      border-right: 2px solid #fff;
      padding-left: 0px;
      padding-right: 25px;

      @include smMax {
        margin-bottom: 12px;
      }
    }

    @include smMax {
      width: 100%;
      padding: 0px;
    }
  }
}

.organisation-additional {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1px;
  width: 100%;

  @include lgMax {
    display: block !important;
  }

  .grid-item {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    &.align-left {
      align-items: flex-start;
    }

    &.align-right {
      align-items: flex-end;
    }

    &.grid-item--full-width {
      grid-column: 1 / span 2;
      align-items: center;

      .item-holder {
        max-width: 1530px;
      }
    }

    @include lgMax {
      align-items: flex-start !important;
      width: 100%;
      grid-column: 1 / span 2;

      .item-holder {
        margin-left: auto;
        margin-right: auto;
      }
    }
  }

  .item-holder {
    width: 100%;
    box-sizing: border-box;
    padding: 25px 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    height: 100%;

    &.item-holder--gallery {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 30px;

      img {
        width: 100%;
        height: auto;
      }
    }

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
  }
}

.activities {
  .activities__navigation {
    display: flex;

    @include smMax {
      overflow-x: scroll;
    }

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
      background-color: #fff;
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

  .organisations-social {
    color: #393939;
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

.support {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;

  @include smMax {
    grid-template-columns: 1fr;
  }

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

.url-share {
  display: flex;
  padding-top: 24px;

  @include smMax {
    flex-direction: column;
  }

  input {
    padding: 5px 15px;
    min-width: 350px;
    margin-right: 15px;

    @include smMax {
      min-width: auto;
    }
  }

  button {
    margin-top: 0px;
  }
}

.organisation-article {
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px dashed #c7c7c7;

  .organisation-article__date {
    @include font-size(1rem);
    font-family: "Montserrat SemiBold", sans-serif;
    margin-bottom: 0px;
  }

  &::v-deep p {
    font-family: "Montserrat Regular";
    line-height: 1.35;
    @include font-size(1rem);
    padding-top: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    box-sizing: border-box;
  }
}

.goals {
  // margin: 0px -30px -26px -31px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 0px;

  li {
    // margin: -1px;
    // border: 1px solid #393939;
    font-size: 0px;
    line-height: 1;

    img {
      width: 100%;
      height: auto;
    }
  }
}

.volunteer {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.volunteer-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-end;
  margin: -15px;

  li {
    margin: 15px;
  }

  .button {
    min-width: 150px;
    width: 100%;
  }
}

.section {
  &__title {
    font-family: "Montserrat SemiBold";
    @include font-size(2rem);
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }
}

.grid {
  &--news,
  &--events,
  &--projects {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(3, 1fr);

    @include lgMax {
      grid-template-columns: repeat(2, 1fr);
    }

    @include mdMax {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  &--organisations {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;

    @include lgMax {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.about {
  &::v-deep {
    font-size: 19px;
    line-height: 1.85;
  }

  &--columns {
    column-count: 2;
    column-gap: 60px;
  }

  @include margin-top(2.5rem);

  @include lgMax {
    column-count: 1;
  }

  img {
    width: 100%;
    height: auto;
    @include margin-bottom(1.5rem);
  }
}
</style>