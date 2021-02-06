<template>
  <div>
    <!-- Network banner -->
    <div class="container">
      <banner color="#4696D2" link="/create/project">
        <template v-slot:name>Network</template>
        <template v-slot:subname>projects</template>
        <template v-slot:title>Projects that change the world</template>
        <template v-slot:button>Create</template>
        <template
          v-slot:content
        >Our objective is to facilitate connections, mobilise funds, resources and ideas to help your projects go further, faster.</template>
      </banner>
    </div>

    <div class="textual-banner textual-banner--contained">
      <div class="container">
        <p>Helping you help others by raising awareness of your community projects, fundraising campaigns, voluntary groups, community events, grassroots and start-up collaborations, big or small, local of global.</p>
      </div>
    </div>

    <!-- Title section -->
    <section class="section projects-section container" v-if="myProjects.length >0">
      <h2 class="projects-section__title">
        Created by you
        <span class="projects-section__count">{{myProjects.length}} Projects</span>
      </h2>
    </section>

    <!-- Projects Grid -->
    <div class="container" v-if="myProjects.length >0">
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
      <section class="projects-grid section">
        <project-card
          v-for="project in myProjects"
          :key="'project-'+project.slug"
          :project="project"
        />
      </section>
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
    </div>

    <!-- Title section -->
    <section class="section projects-section container">
      <h2 class="projects-section__title">
        Explore Projects
        <span class="projects-section__count">{{totalProjects}} Projects</span>
      </h2>
      <div class="projects-section__subtitle">Check out the projects needing your support right now</div>
    </section>

    <!-- Filters -->
    <section class="section projects-filters container" style="display: none;">
      <div class="filter-wrapper">
        <select>
          <option>English</option>
          <option>German</option>
          <option>Russian</option>
        </select>
      </div>
      <div class="filter-wrapper">
        <select>
          <option selected>Select an Interest</option>
          <option>Test 1</option>
          <option>Test 2</option>
        </select>
      </div>
      <div class="filter-wrapper">
        <select>
          <option selected>Support Needed</option>
          <option>Skills</option>
          <option>Skills2</option>
        </select>
      </div>
      <div class="filter-wrapper">
        <input type="search" />
      </div>
      <div class="filter-wrapper">
        <input type="search" />
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="projects-grid container section" id="section-projects">
      <!-- TODO: Make component from Project -->
      <project-card v-for="project in projects" :key="'project-'+project.slug" :project="project" />
    </section>

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

  </div>
</template>

<script>
import axios from "@/axios-auth";

import Banner from "@/components/homepage/Banner.vue";
import ProjectCard from "@/components/cards/ProjectCard.vue";

export default {
  components: {
    Banner,
    ProjectCard,
  },
  data() {
    return {
      projects: [],
      projectsPagination: 0,
      myProjects: [],
      myProjectsPagination: 0,
      totalProjects: 0,
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
      }
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
    }
  },
  methods: {
    paginateProjects(pageNum) {
      axios
        .get("/projects?page=" + pageNum)
        .then(res => {
          console.log("Projects pagination:", res.data.projects);
          this.projects = res.data.projects;
          console.log(this.projects);

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
    },
    handleResize() {
      this.is_mobile = window.innerWidth >= 768 ? false : true;
      if (window.innerWidth >= 768) {
        this.is_shown = true;
      }
    }
  },
  mounted() {
    axios.get("/projects").then(res => {
      console.log("Projects loaded", res);

      this.projects = res.data.projects;
      this.totalProjects = res.data.count;
      this.projectsPagination = res.data.pages_count;

    });

    if (this.isAuthenticated) {
      axios
        .get("/projects/my")
        .then(res => (this.myProjects = res.data.projects));
    }
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
.projects-grid {
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

// TODO: Move styles to separate file

.projects-section {
  .projects-section__title {
    font-family: "Montserrat Bold";
    @include font-size(2rem);
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .projects-section__count {
    font-family: "Montserrat Regular";
    line-height: 1;
    color: #121212;
    @include font-size(1rem);
    @include margin-left(2rem);
  }

  .projects-section__subtitle {
    font-family: "Montserrat Regular";
    opacity: 0.5;
    @include font-size(1rem);
  }
}
</style>