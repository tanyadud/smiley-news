<template>
  <div class="members-bg">
    <information-hero background="/img/backgrounds/members.jpg">
      <template v-slot:title>Connect with other members</template>
      <template v-slot:content>
        <p>Our inspiring network of changemakers from activists, charity leaders, CSR Managers, volunteers, academics, students, philanthropists, social workers to everyday heroes in the community.</p>
      </template>
    </information-hero>

    <div class>
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
          <swiper-slide v-for="(user, index) in users" :key="user.name+index+'-member-slider'">
            <user-card :user="user" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <section class="users-grid" v-else>
          <user-card
            v-for="(user, index) in users"
            :key="user.name+index+'-member-archive'"
            :user="user"
          />
        </section>
      </div>
    </div>
    <div class="container">
      <div class="smiley-pagination" v-if="pages_count > 1">
        <br />

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
        <br />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "@/axios-auth";

import Breadcrumbs from "@/components/Breadcrumbs";
import UserCard from "@/components/cards/UserCard";
import InformationHero from "@/components/InformationHero.vue";

import Footer from "@/components/Footer";

export default {
  data() {
    return {
      users: [],
      pages_count: 0,
      socials: ["facebook", "linkedin", "google", "instagram", "twitter"],
      is_mobile: false,
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
          },
          640: {
            slidesPerView: 3.15
          }
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  methods: {
    loadPageNumb(pageNumb) {
      axios
        .get("/users?page=" + pageNumb)
        .then(res => {
          this.users = res.data.users;
          this.pages_count = res.data.pages_count;
        })
        .catch(error => console.log(error));
    },
    handleResize() {
      this.is_mobile = window.innerWidth >= 768 ? false : true;
    }
  },
  mounted() {
    axios
      .get("/users")
      .then(res => {
        console.log("users", res);
        this.users = res.data.users;
        this.pages_count = res.data.pages_count;
      })
      .catch(error => console.log(error));
  },
  components: {
    InformationHero,
    Breadcrumbs,
    UserCard,
    Footer
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
.members-bg {
  background-color: #f4f6f9;
}

.users-grid {
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

.swiper-slide {
  height: auto;
}
</style>
