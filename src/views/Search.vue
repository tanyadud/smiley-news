<template>
  <div>
    <!-- TODO: Make refactoring? -->
    <div class="container page">
      <h1>You've searched for: "{{this.$route.params.keyword}}"</h1>
      <template v-if="foundResults">
        <section class="section" v-if="posts.length > 0" id="section-news">
          <h2 class="section__title">News</h2>
          <swiper
            ref="newsSwiper"
            :options="swiperOptions"
            :auto-update="true"
            :auto-destroy="true"
            :delete-instance-on-destroy="true"
            :cleanup-styles-on-destroy="true"
            v-if="is_mobile"
          >
            <swiper-slide v-for="post in posts" :key="'post-swiper-'+post.slug">
              <news-card :article="post" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <div class="grid grid--news" v-else>
            <news-card v-for="post in posts" :key="'post-'+post.slug" :article="post" />
          </div>
          <div class="smiley-pagination" v-if="postsPagination > 1">
            <paginate
              :page-count="postsPagination"
              :click-handler="paginateNews"
              :prev-text="'Prev'"
              :next-text="'Next'"
              :prev-class="'smiley-pagination-back'"
              :next-class="'smiley-pagination-next'"
              :container-class="'app-pagination'"
            >
              <span slot="breakViewContent">...</span>
            </paginate>
          </div>
        </section>
        <section class="section" v-if="events.length > 0" id="section-events">
          <h2 class="section__title">Events</h2>
          <swiper
            ref="eventsSwiper"
            :options="swiperOptions"
            :auto-update="true"
            :auto-destroy="true"
            :delete-instance-on-destroy="true"
            :cleanup-styles-on-destroy="true"
            v-if="is_mobile"
          >
            <swiper-slide v-for="event in events" :key="'event-swiper-'+event.slug">
              <event-card :event="event" />
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
          <div class="smiley-pagination" v-if="eventsPagination > 1">
            <paginate
              :page-count="eventsPagination"
              :click-handler="paginateEvents"
              :prev-text="'Prev'"
              :next-text="'Next'"
              :prev-class="'smiley-pagination-back'"
              :next-class="'smiley-pagination-next'"
              :container-class="'app-pagination'"
            >
              <span slot="breakViewContent">...</span>
            </paginate>
          </div>
        </section>
        <section class="section" v-if="projects.length > 0" id="section-projects">
          <h2 class="section__title">Projects</h2>
          <swiper
            ref="projectsSwiper"
            :options="swiperOptions"
            :auto-update="true"
            :auto-destroy="true"
            :delete-instance-on-destroy="true"
            :cleanup-styles-on-destroy="true"
            v-if="is_mobile"
          >
            <swiper-slide v-for="project in projects" :key="'project-swiper-'+project.slug">
              <project-card :project="project" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <div class="grid grid--projects" v-else>
            <project-card
              v-for="project in projects"
              :key="'project-'+project.slug"
              :project="project"
            />
          </div>
          <div class="smiley-pagination" v-if="projectsPagination > 1">
            <paginate
              :page-count="projectsPagination"
              :click-handler="paginateProjects"
              :prev-text="'Prev'"
              :next-text="'Next'"
              :prev-class="'smiley-pagination-back'"
              :next-class="'smiley-pagination-next'"
              :container-class="'app-pagination'"
            >
              <span slot="breakViewContent">...</span>
            </paginate>
          </div>
        </section>
        <section class="section" v-if="organisations.length > 0" id="section-organisations">
          <h2 class="section__title">Organisations</h2>
          <swiper
            ref="organisationsSwiper"
            :options="organisationsSwiperOptions"
            :auto-update="true"
            :auto-destroy="true"
            :delete-instance-on-destroy="true"
            :cleanup-styles-on-destroy="true"
            v-if="is_mobile"
          >
            <swiper-slide
              v-for="organisation in organisations"
              :key="'organisation-swiper-'+organisation.slug"
            >
              <organisation-card :organisation="organisation" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <div class="grid grid--organisations" v-else>
            <organisation-card
              v-for="organisation in organisations"
              :key="'organisation-'+organisation.slug"
              :organisation="organisation"
            />
          </div>
          <div class="smiley-pagination" v-if="organisationsPagination > 1">
            <paginate
              :page-count="organisationsPagination"
              :click-handler="paginateOrganisations"
              :prev-text="'Prev'"
              :next-text="'Next'"
              :prev-class="'smiley-pagination-back'"
              :next-class="'smiley-pagination-next'"
              :container-class="'app-pagination'"
            >
              <span slot="breakViewContent">...</span>
            </paginate>
          </div>
        </section>
        <section class="section" v-if="users.length > 0" id="section-users">
          <h2 class="section__title">Users</h2>
          <swiper
            ref="usersSwiper"
            :options="usersSwiperOptions"
            :auto-update="true"
            :auto-destroy="true"
            :delete-instance-on-destroy="true"
            :cleanup-styles-on-destroy="true"
            v-if="is_mobile"
          >
            <swiper-slide v-for="user in users" :key="'user-swiper-'+user.slug">
              <user-card :user="user" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <div class="grid grid--users" v-else>
            <user-card v-for="user in users" :key="'user-'+user.slug" :user="user" />
          </div>
          <div class="smiley-pagination" v-if="usersPagination > 1">
            <paginate
              :page-count="usersPagination"
              :click-handler="paginateUsers"
              :prev-text="'Prev'"
              :next-text="'Next'"
              :prev-class="'smiley-pagination-back'"
              :next-class="'smiley-pagination-next'"
              :container-class="'app-pagination'"
            >
              <span slot="breakViewContent">...</span>
            </paginate>
          </div>
        </section>
      </template>
      <template v-else>
        <p class="no-matches">Sorry, no matches found</p>
      </template>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "@/axios-auth";

import Footer from "@/components/Footer";

import NewsCard from "@/components/cards/NewsCard";
import EventCard from "@/components/cards/EventCard";
import ProjectCard from "@/components/cards/ProjectCard";
import OrganisationCard from "@/components/cards/OrganisationCard";
import UserCard from "@/components/cards/UserCard";

export default {
  name: "SearchPage",
  components: {
    NewsCard,
    EventCard,
    ProjectCard,
    OrganisationCard,
    UserCard,
    Footer
  },
  data() {
    return {
      posts: [],
      postsPagination: 0,
      events: [],
      eventsPagination: 0,
      projects: [],
      projectsPagination: 0,
      organisations: [],
      organisationsPagination: 0,
      users: [],
      usersPagination: 0,
      is_mobile: false,
      // Slider Options
      swiperOptions: {
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
      },
      usersSwiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        slidesPerView: 4,
        spaceBetween: 15,
        mousewheel: true,
        breakpoints: {
          320: {
            slidesPerView: 1.15,
            centeredSlides: true
          },
          480: {
            slidesPerView: 2.15
          },
          640: {
            slidesPerView: 3.15
          }
        }
      },
      organisationsSwiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        slidesPerView: 4,
        spaceBetween: 15,
        mousewheel: true,
        breakpoints: {
          320: {
            slidesPerView: 1.15,
            centeredSlides: true
          },
          480: {
            slidesPerView: 2.15
          }
        }
      }
    };
  },
  computed: {
    foundResults: function() {
      let result = null;
      if (
        this.posts.length > 0 ||
        this.events.length > 0 ||
        this.projects.length > 0 ||
        this.organisations.length > 0 ||
        this.users.length > 0
      ) {
        result = true;
      } else {
        result = false;
      }
      return result;
    }
  },
  methods: {
    paginateNews(pageNum) {
      axios
        .get("/search?news-page=" + pageNum)
        .then(res => {
          this.posts = res.data.news;
          this.postsPagination = res.data.news_pages_count;

          let sectionOffset = document.getElementById("section-news").offsetTop;
          window.scrollTo({
            top: sectionOffset - 12,
            behavior: "smooth"
          });
        })
        .catch(err => {
          console.error("error", err);
        });
      // console.log(pageNum);
    },
    paginateEvents(pageNum) {
      axios
        .get("/search?events-page=" + pageNum)
        .then(res => {
          console.log("Events", res.data.events);
          this.events = res.data.events;
          this.eventsPagination = res.data.events_pages_count;

          let sectionOffset = document.getElementById("section-events")
            .offsetTop;
          window.scrollTo({
            top: sectionOffset - 12,
            behavior: "smooth"
          });
        })
        .catch(err => {
          console.error("error", err);
        });
      console.log(pageNum);
    },
    paginateProjects(pageNum) {
      axios
        .get("/search?projects-page=" + pageNum)
        .then(res => {
          console.log("Projects", res.data.events);
          this.events = res.data.events;
          this.eventsPagination = res.data.events_pages_count;

          let sectionOffset = document.getElementById("section-projects")
            .offsetTop;
          window.scrollTo({
            top: sectionOffset - 12,
            behavior: "smooth"
          });
        })
        .catch(err => {
          console.error("error", err);
        });
      console.log(pageNum);
    },
    paginateOrganisations(pageNum) {
      axios
        .get("/search?organisations-page=" + pageNum)
        .then(res => {
          this.organisations = res.data.organisations;
          this.organisationsPagination = res.data.organisations_pages_count;

          let sectionOffset = document.getElementById("section-organisations")
            .offsetTop;
          window.scrollTo({
            top: sectionOffset - 12,
            behavior: "smooth"
          });
        })
        .catch(err => {
          console.error("error", err);
        });
      console.log(pageNum);
    },
    paginateUsers(pageNum) {
      axios
        .get("/search?users-page=" + pageNum)
        .then(res => {
          console.log(res.data.users);
          this.users = res.data.users;
          this.usersPagination = res.data.users_pages_count;

          let sectionOffset = document.getElementById("section-users")
            .offsetTop;
          window.scrollTo({
            top: sectionOffset - 12,
            behavior: "smooth"
          });
        })
        .catch(err => {
          console.error("error", err);
        });
      console.log(pageNum);
    },
    handleResize() {
      this.is_mobile = window.innerWidth >= 768 ? false : true;
      if (window.innerWidth >= 768) {
        this.is_shown = true;
      }
    }
  },
  mounted() {
    axios
      .get("/search", { keyword: this.$route.params.keyword })
      .then(res => {
        console.log("Search results loaded", res);

        this.posts = res.data.news;
        this.postsPagination = res.data.news_pages_count;

        this.events = res.data.events;
        this.eventsPagination = res.data.events_pages_count;

        this.projects = res.data.projects;
        this.projectsPagination = res.data.projects_pages_count;

        this.organisations = res.data.organisations;
        this.organisationsPagination = res.data.organisations_pages_count;

        this.users = res.data.users;
        this.usersPagination = res.data.users_pages_count;
      })
      .catch(error => console.log(error));
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
.page {
  min-height: 30vh;
}

h1 {
  font-family: "Montserrat Bold";
  @include font-size(2.5rem);
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  margin-top: 1.5rem;
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
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;

    @include xlMax {
      grid-template-columns: repeat(4, 1fr);
    }
    @include lgMax {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &--users {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 15px;

    @include xlMax {
      grid-template-columns: repeat(5, 1fr);
    }

    @include lgMax {
      grid-template-columns: repeat(4, 1fr);
    }

    @include mdMax {
      display: none;
    }
  }
}

.no-matches {
  @include font-size(1.5rem);
}
</style>