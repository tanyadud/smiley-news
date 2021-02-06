<template>
  <div>
    <!-- TODO: Make refactoring? -->
    <div class="container page">
      <h1>You've searched news for: "{{this.$route.params.keyword}}"</h1>
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

export default {
  name: "SearchPageNews",
  components: {
    NewsCard,
    Footer
  },
  data() {
    return {
      posts: [],
      postsPagination: 0,
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
    foundResults: function() {
      let result = null;
      if (this.posts.length > 0) {
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
        // .get("/search?news-page=" + pageNum)
        .get(
          "/news-search?news-page=" +
            pageNum +
            "&keyword=" +
            this.$route.params.keyword
        )

        .then(res => {
          this.posts = res.data.news;
          this.postsPagination = res.data.pages_count;

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
    handleResize() {
      this.is_mobile = window.innerWidth >= 768 ? false : true;
      if (window.innerWidth >= 768) {
        this.is_shown = true;
      }
    }
  },
  mounted() {
    axios
      .get("/news-search?keyword=" + this.$route.params.keyword)
      .then(res => {
        console.log("Search results loaded", res);

        this.posts = res.data.news;
        this.postsPagination = res.data.pages_count;
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