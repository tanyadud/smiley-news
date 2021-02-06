<template>
  <div class="organisations-bg">
    <information-hero background="/img/backgrounds/organisation.jpg" position="top">
      <template v-slot:title>Connect with organisations</template>
      <template v-slot:content>
        <p>Explore our directory of organisations doing good and how to get involved</p>
      </template>
      <template v-slot:buttons>
        <template v-if="loggedIn">
          <router-link
              v-if="organisation.admin != null"
              :to="{name: 'organisation', params: {slug: organisation.slug}}"
              class="primary"
          >
            <i class="fa fa-users"></i> My Organisation
          </router-link>
          <router-link v-else :to="{name: 'create-organisation'}" class="primary">
            <i class="fa fa-users"></i> Create organisation
          </router-link>
        </template>

      </template>
    </information-hero>

    <form @submit.prevent="searchOrganisation" class="organisations-filer">
      <div class="filter-grid container">
        <div class="filter-grid__item filter-grid__item--full-width filter-grid__item--title">
          <div class="filter-grid__title">DIRECTORY OF ORGANISATIONS</div>
          <button type="button" class="filterToggle" @click.prevent="toggleFilterMenu">
            <i class="fa fa-sliders"></i>
          </button>
        </div>
        <div  class="filter-grid__item">
          <label class="search">
            <i class="fa fa-search"></i>
            <input
                type="text"
                class="filter"
                required
                minlength="3"
                v-model="search.keyword"
                placeholder="Search by name"
            />
          </label>
        </div>
        <div  class="filter-grid__item">
          <label class="dropdown">
            <select v-model="search.goal">
              <option selected :value="null">All Goals</option>
              <option v-for="goal in goals" :key="'goal-'+goal.id" :value="goal.slug">{{ goal.name }}</option>
            </select>
            <i class="fa fa-angle-down"></i>
          </label>
        </div>
        <div  class="filter-grid__item">
          <button type="submit">
            <i class="fa fa-search"></i>
            search
          </button>
        </div>
        <div  class="filter-grid__item">
          <button type="button" @click="resetFilter">
            <i class="fa fa-times"></i>
            Reset
          </button>
        </div>
      </div>
    </form>
    <div v-if="organisations.length > 0">
      <div class="container">
        <div style="height: 75px;"></div>
        <swiper
            ref="mySwiper"
            :options="swiperOptions"
            :auto-update="true"
            :auto-destroy="true"
            :delete-instance-on-destroy="true"
            :cleanup-styles-on-destroy="true"
            v-if="is_mobile"
        >
          <swiper-slide
              v-for="(organisation,index) in organisations"
              :key="organisation.slug+index+'-org-slider'"
          >
            <organisation-card :organisation="organisation"/>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <section class="organisations-grid" v-else>
          <organisation-card
              v-for="(organisation,index) in organisations"
              :key="organisation.slug+index+'-org-archive'"
              :organisation="organisation"
          />
        </section>
      </div>
    </div>
    <div v-else>
      <div class="container">
        <br><br>
        <p style="text-align: center">No organisations found</p>
        <br><br>
      </div>
    </div>
    <div class="container">
      <div class="smiley-pagination" v-if="pages_count > 1">
        <br/>
        <paginate
            :page-count="pages_count"
            :click-handler="loadPageNumb"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :prev-class="'smiley-pagination-back'"
            :next-class="'smiley-pagination-next'"
            :container-class="'app-pagination'"
        >
          <span slot="breakViewContent">...</span>
        </paginate>
        <br/>
      </div>
    </div>
  <br>
  <br>
  </div>
</template>

<script>
import axios from "@/axios-auth";

import InformationHero from "@/components/InformationHero.vue";
import OrganisationCard from "@/components/cards/OrganisationCard.vue";

export default {
  data() {
    return {
      organisations: [],
      pages_count: 0,
      goals: [],
      search: {
        keyword: null,
        goal: null
      },
      is_mobile: false,
      is_shown: false,
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
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
    organisation() {
      return this.$store.getters["user/organisation"];
    },
    loggedIn() {
      return this.$store.getters["user/isAuthenticated"];
    },
  },
  methods: {
    toggleFilterMenu() {
      console.log("Toggling menu");
      this.is_shown = !this.is_shown;
    },
    loadPageNumb(pageNumb) {
      axios
          .get("/organisations?page=" + pageNumb)
          .then(res => {
            this.organisations = res.data.organisations;
            this.pages_count = res.data.pages_count;
          })
          .catch(error => console.log(error));
    },
    searchOrganisation() {
      axios
          .get("/organisations", {params: this.search})
          .then(res => {
            this.organisations = res.data.organisations;
            this.pages_count = res.data.pages_count;
          })
          .catch(error => console.log(error));
    },
    resetFilter() {
      axios
          .get("/organisations")
          .then(res => {
            console.log("Organisations", res);

            this.organisations = res.data.organisations;
            this.pages_count = res.data.pages_count;

          })
          .catch(error => console.log(error));
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
        .get("/organisations")
        .then(res => {
          console.log("Organisations", res);

          this.organisations = res.data.organisations;
          this.pages_count = res.data.pages_count;

        })
        .catch(error => console.log(error));

    axios
        .get("/goals")
        .then(res => {
          this.goals = res.data.goal_categories[0].goals;
        })
        .catch(err => console.error("Load goals error", err));
  },
  components: {
    InformationHero,
    OrganisationCard,
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

<style lang="scss">
.organisations-bg {
  background-color: #f4f6f9;
}

.organisations-grid {
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

.filter-grid {
  margin-top: -48px;
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  max-width: 1080px;
  // margin: 0 auto -40px;
  background: #fff;
  padding: 30px 30px 20px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);

  @include smMax {
    grid-template-columns: repeat(1, 1fr);
  }

  .filter-grid__item {
    &--full-width {
      grid-column: 1 / span 2;

      @include smMax {
        grid-column: 1 / span 1;
      }
    }
  }

  .filter-grid__item--title {
    display: flex;
    justify-content: center;
    align-items: center;

    @include mdMax {
      justify-content: space-between;
    }

    .filterToggle {
      @include font-size(1.5rem);
      // -webkit-appearance: none;
      -webkit-border-radius: 0px;
      background-color: #fff;
      border: 1px solid rgba(57, 57, 57, 0.5);
      padding: 5px 10px;

      @include md {
        display: none;
      }
    }
  }

  .filter-grid__title {
    font-family: "Montserrat Bold", sans-serif;
    text-align: center;
    @include font-size(1.5rem);
  }

  label {
    width: 100%;
    position: relative;

    &.search {
      i {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    &.dropdown {
      &:active {
        i {
          transform: translateY(-50%) rotate(180deg);
        }
      }

      i {
        position: absolute;
        right: 10px;
        top: 50%;
        transform-origin: center center;
        transform: translateY(-50%) rotate(0deg);
        transition: transform 0.2s;
      }
    }
  }

  input,
  select {
    width: 100%;
    background-color: #fff;
    font-size: 1rem;
    height: 46px;
    border-radius: 0px !important;
    -webkit-appearance: none;
    -webkit-border-radius: 0px;
    padding: 5px 25px;
    border: 1px solid #e0e6eb !important;
  }

  select {
    &::after {
      content: "erververv";
    }
  }

  input {
    color: #3d465a;
    padding-left: 35px;
  }

  button {
    letter-spacing: 2px;
    border: 1px solid #f4ed3b !important;
    color: #393939;
    background-color: #f4ed3b;
    width: 100%;
    padding: 5px 25px;
    text-transform: uppercase;
    font-family: "Montserrat SemiBold", sans-serif;
    height: 46px;
    text-align: center;
    cursor: pointer;
    transition: box-shadow 0.2s;

    i {
      font-size: 14px;
      margin-right: 14px;
    }

    &:hover {
      box-shadow: 0 2px 28px -13px rgba(0, 0, 0, 0.4);
    }
  }
}

.project-information {
  padding-bottom: 48px;
}

.swiper-slide {
  height: auto;
}
</style>
