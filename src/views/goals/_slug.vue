<template>
  <div>
    <div class="container">
      <banner :color="goal.colour" background="/img/goals-banner.jpg">
        <template v-slot:logo>
          <img src="/img/un-goals-white.png" style="width: 200px"/>
        </template>

        <template
            v-slot:title
        >News, Events and Projects linked to Goal {{goal.prefix}} {{goal.name}}
        </template>
      </banner>
    </div>

    <div class="container">
      <section class="goal-description">
        <section class="goal-block" :style="{borderColor: goal.colour}">
          <div
              class="goal-description__text"
              :style="{color: goal.colour}"
          >How we can attain {{goal.name}} ?
          </div>
          <div class="goal-description__logo" :style="{backgroundColor: goal.colour}">
            <img :src="$settings.images_path.goals + 's_' + goal.image" alt="icon" v-if="goal.image"/>
          </div>
        </section>
        <section class="goal-description__content">
          <div class="goal-description__content-block goal-description__content-text-holder" v-html="goal.description">

          </div>
          <div class="goal-description__content-block goal-description__content-flex-holder">
            <div class="goal-description__content-block__inner" :style="{border: '3px solid ' + goal.colour}"
                 v-html="goal.list"></div>
          </div>
        </section>
        <section
            class="section"
            v-if="organisations.length > 0"
            id="section-organisations"
        >
          <h2 class="section__title">Support these organisations</h2>
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
              <organisation-card :organisation="organisation"/>
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
          <div class="smiley-pagination" v-if="organisationsPagination > 1 && false">
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
      </section>
      <section class="content-block">
        <div class="news-category">
          <h2 class="news-category__title">Latest Updates</h2>
          <select class="news-category__dropdown" @change.prevent="goToCategory">
            <option disabled selected>Select goal</option>
            <option
                v-for="item in goals"
                :key="item.slug + item.id"
                :value="item.slug"
            >{{item.name}}
            </option>
          </select>
        </div>
      </section>
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
            <news-card :article="post"/>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="grid grid--news" v-else>
          <news-card v-for="post in posts" :key="'post-'+post.slug" :article="post"/>
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
            <project-card :project="project"/>
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
    </div>
  </div>
</template>

<script>
    import axios from "@/axios-auth";
    import router from "@/router";

    import Banner from "@/components/homepage/Banner.vue";

    import NewsCard from "@/components/cards/NewsCard";
    import EventCard from "@/components/cards/EventCard";
    import ProjectCard from "@/components/cards/ProjectCard";
    import OrganisationCard from "@/components/cards/OrganisationCard";

    export default {
        name: "GoalSinglePage",
        components: {
            Banner,
            NewsCard,
            EventCard,
            ProjectCard,
            OrganisationCard,
        },
        data() {
            return {
                goal: {},

                goals: [],

                title: "",

                is_mobile: false,

                posts: [],
                postsPagination: 0,

                events: [],
                eventsPagination: 0,

                projects: [],
                projectsPagination: 0,

                organisations: [],
                organisationsPagination: 0,

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
        methods: {
            goToCategory(event) {
                router.push({
                    name: "news-category-item",
                    params: {slug: event.target.value}
                });
            },
            paginateNews(pageNum) {
                axios
                    .post("/goals/" + this.$route.params.slug + "?news-page=" + pageNum)
                    .then(res => {
                        this.posts = res.data.posts;
                        this.postsPagination = res.data.posts_pages_count;

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
                    .post("/goals/" + this.$route.params.slug + "?events-page=" + pageNum)
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
                    .post("/goals/" + this.$route.params.slug + "?projects-page=" + pageNum)
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
                    .post(
                        "/goals/" + this.$route.params.slug + "?organisations-page=" + pageNum + "/admin-created"
                    )
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
                    .post("/goals/" + this.$route.params.slug + "?users-page=" + pageNum)
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
            let slug = this.$route.params.slug;

            axios
                .get("/goals/" + slug)
                .then(res => {
                    console.log("Goal page", res);

                    this.goal = res.data.goal;

                    const metaPayload = {
                        meta: res.data.meta,
                        title: res.data.goal.name
                    }
                    this.$store.dispatch('meta/setMeta', metaPayload);

                    this.posts = res.data.news;
                    this.postsPagination = res.data.posts_pages_count;

                    this.events = res.data.events;
                    this.eventsPagination = res.data.events_pages_count;

                    this.projects = res.data.projects;
                    this.projectsPagination = res.data.projects_pages_count;

                    this.organisations = res.data.organisations;
                    this.organisationsPagination = res.data.organisations_pages_count;

                    this.$router.currentRoute.meta.title = this.goal.name;

                })
                .catch(error => console.log(error));

            axios.get("/goals").then(res => {
                this.goals = res.data.goal_categories[0].goals;
            });
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
  .section {
    &__title {
      font-family: "Montserrat SemiBold";
      @include font-size(2rem);
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
    }
  }

  #section-organisations {
    margin-bottom: 0px;
  }

  .goal-description {
    margin-top: 30px;

    .goal-description__text {
      font-family: "Montserrat SemiBold";
      @include font-size(2rem);
    }

    .goal-block {
      width: 100%;
      border-width: 3px;
      border-style: solid;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: -1px;

      @include smMax {
        border: 0;
      }
    }

    .goal-description__text {
      @include font-size(1.3rem);
      color: #393939;
      font-family: "Montserrat SemiBold";
      padding: 20px;
      flex: 1;

      @include smMax {
        padding-left: 0px;
        padding-right: 0px;
      }
    }

    .goal-description__logo {
      height: 100%;

      @include smMax {
        width: 100%;
        text-align: center;
      }

      img {
        margin: -1px;

        @include mdMax {
          margin: 0px;
        }
      }
    }

    .goal-description__content {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 100px;
      margin: 30px 0;
      color: #000;

      @include lgMax {
        grid-gap: 50px;
      }

      @include mdMax {
        grid-template-columns: 1fr;
        grid-gap: 30px;
      }

      .goal-description__content-block__inner {
        padding: 30px;
        /*color: #fff;*/
        width: 100%;
        position: sticky;
        top: 30px;
      }

      .goal-description__content-text-holder {
        &::v-deep {
          line-height: 2;
        }
      }
      .goal-description__content-flex-holder {
        /*display: flex;*/
        /*height: 100%;*/
        /*align-items: center;*/
        /*justify-content: center;*/
      }


      &::v-deep {
        line-height: 1.75;

        ul {
          li {
            position: relative;
            padding-left: 36px;
            margin-top: 0.8rem;

            &:first-child {
              margin-top: 0px;
            }

            &::before {
              position: absolute;
              content: "";
              left: 0px;
              top: 14px;
              height: 1px;
              width: 20px;
              background-color: #000;
            }
          }
        }
      }
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

  /* News Section Title with Read More button */
  .news-category {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
    margin-bottom: 16px;
    padding-bottom: 16px;

    .news-category__title {
      @include font-size(2rem);
      font-family: "Montserrat Bold", sans-serif;
      color: #393939;
      line-height: 1;
      margin: 0px;
    }

    .news-category__dropdown {
      padding-top: 10px;
      padding-bottom: 10px;
      height: 46px;
      background-color: #fff;
      border: 1px solid #e0e6eb !important;
      padding-left: 20px;
      padding-right: 20px;

      font-family: "Montserrat Regular", sans-serif;

      @include mdMax {
        width: 100%;
        margin-top: 15px;
      }
    }

    @include mdMax {
      flex-direction: column;
    }
  }
</style>