<template>
  <div>
     <breadcrumbs />

    <section class="news-category-section container">
      <div class="news-category">
        <h2 class="section__title">Latest news</h2>
      </div>
      <div class="news-grid" id="section-news">
        <news-card v-for="article in latest_news" :key="article.slug" :article="article" />
      </div>
      <div class="more-link-wrap"></div>
    </section>
    <div class="container">
      <div class="smiley-pagination" v-if="pages > 1">
        <br />
        <br />
        <paginate
          :page-count="pages"
          :click-handler="loadNews"
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
import router from "@/router";

import Breadcrumbs from "@/components/Breadcrumbs";

import NewsCard from "@/components/cards/NewsCard.vue";

import Footer from "@/components/Footer";

export default {
  name: "AllNews",
  components: {
    Breadcrumbs,
    NewsCard,
    Footer
  },
  data() {
    return {
      latest_news: [],
      pages: 0
    };
  },
  methods: {
    loadNews(page) {
      axios
        .get("/news?page=" + page)
        .then(res => {
          this.latest_news = res.data.news;
          let sectionOffset = document.getElementById("section-news").offsetTop;
          window.scrollTo({
            top: sectionOffset - 12,
            behavior: "smooth"
          });
        })
        .catch(error => console.error(error));
    }
  },
  mounted() {
    axios
      .get("/news")
      .then(res => {
        console.log(res);
        this.latest_news = res.data.news;
        this.pages = res.data.pages_count;

          const metaPayload = {
              meta: res.data?.meta || {},
              title: 'Latest News'
          }

          metaPayload.meta.description = 'Latest news about charities and organisations doing good and how you can support them'
          this.$store.dispatch('meta/setMeta', metaPayload);

      })
      .catch(error => console.log(error));
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/blocks/_homepage-news-grid";

.news-category-section {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.news-grid {
  @include lgMax {
    grid-template-columns: repeat(2, 1fr);
  }

  @include mdMax {
    grid-template-columns: repeat(1, 1fr);
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
</style>