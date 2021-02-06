<template>
  <div>
    <section class="latest-news-section">
      <div class="container">
        <banner color="#F36E24" background="/img/homepage/banner-news.jpg">
          <template v-slot:name>news</template>
          <template v-slot:title>POSITIVE JOURNALISM</template>
          <template v-slot:content
            >Good news is about people doing good</template
          >
        </banner>
      </div>
    </section>
    <div class="container">
      <div class="news-category" style="border-bottom: 0">
        <form class="news-category__search-form" @submit.prevent="find">
          <input
            type="text"
            minlength="3"
            required
            placeholder="Search News"
            v-model="search"
          />
          <button type="submit">
            <i class="fa fa-search"></i>
          </button>
        </form>
        <select class="news-category__dropdown" @change.prevent="goToCategory">
          <option disabled selected>Select goal</option>
          <option
            v-for="item in news"
            :key="item.slug + item.id"
            :value="item.slug"
            >{{ item.name }}</option
          >
        </select>
      </div>
      <div class="news-category">
        <h2 class="news-category__title">Latest News</h2>
        <router-link :to="{ name: 'news-latest' }" class="news-category__link">
          <span></span>Read more
        </router-link>
      </div>
    </div>
    <section
      class="news-grid news-grid--featured container"
      v-if="latest.length > 0"
    >
      <news-card
        v-for="article in latest"
        :key="article.slug"
        :article="article"
      />
    </section>
    <section
      class="news-category-section container"
      v-for="item in news"
      :key="'news-item-' + item.slug"
    >
      <div class="news-category">
        <h2 class="news-category__title">{{ item.prefix }} {{ item.name }}</h2>
        <router-link
          :to="{ name: 'news-category-item', params: { slug: item.slug } }"
          class="news-category__link"
        >
          <span></span>Read more
        </router-link>
      </div>
      <div class="news-grid">
        <news-card
          v-for="article in item.latest_news"
          :key="article.slug"
          :article="article"
        />
      </div>
      <div class="more-link-wrap"></div>
    </section>
  </div>
</template>

<script>
import axios from "@/axios-auth";
import router from "@/router";
import Banner from "@/components/homepage/Banner.vue";
import NewsCard from "@/components/cards/NewsCard.vue";

export default {
  name: "News",
  data() {
    return {
      latest: [],
      news: [],
      search: "",
    };
  },
  created() {
    console.log("news triggered");
    axios
      .get("/news/latest")
      .then((res) => {
        console.log("news", res);

        this.latest = res.data.latest_news;
        this.news = res.data.featured_goals;
      })
      .catch((error) => console.error(error));
  },
  methods: {
    goToCategory(event) {
      router.push({
        name: "news-category-item",
        params: { slug: event.target.value },
      });
    },
    find() {
      router.push({
        name: "news-search",
        params: { keyword: this.search },
      });
    },
  },
  components: {
    Banner,
    NewsCard,
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/blocks/_homepage-news-grid";

.news-category-section {
  margin-bottom: 0px;
}

.news-grid {
  @include lgMax {
    grid-template-columns: repeat(2, 1fr);
  }

  @include mdMax {
    grid-template-columns: repeat(1, 1fr);
  }
}

/* News Section Title with Read More button */
.news-category {
  margin-top: 30px;
  width: 100%;
  display: grid;
  grid-template-columns: auto 180px;
  grid-gap: 20px;
  border-bottom: 1px solid #e4e4e4;
  margin-bottom: 16px;
  padding-bottom: 16px;

  .news-category__title {
    color: #393939;
    font-family: "Montserrat Bold", sans-serif;
    @include font-size(1rem);
    text-transform: uppercase;
    line-height: 1;
    margin: 0px;
  }

  .news-category__link {
    color: #1a1a1a;
    font-family: "Montserrat Bold", sans-serif;
    font-size: 1rem;
    line-height: 1;
    text-decoration: none;
    position: relative;
    text-transform: uppercase;
    padding-right: 45px;
    height: 100%;

    &:hover {
      span {
        right: 0;
      }
    }

    span {
      position: absolute;
      top: 40%;
      transform: translateY(-50%);
      right: 7px;
      width: 20px;
      height: 2px;
      background-color: #000;
      transition: 0.25s ease-in-out;

      &:before,
      &:after {
        position: absolute;
        content: "";
        height: 2px;
        width: 8px;
        right: 0;
        background-color: #000;
      }

      &:before {
        transform: rotate(50deg);
        top: -4px;
      }

      &:after {
        transform: rotate(-50deg);
        top: 4px;
      }
    }
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

    @include lgMax {
      width: 100%;
    }
  }

  @include lgMax {
    flex-direction: column;
  }
}

.news-grid--featured {
  grid-gap: 5px;

  .news-article:first-child {
    grid-row: 1 / span 2;

    @include xlMax {
      grid-column: 1 / span 2;
      grid-row: auto;
    }

    @include mdMax {
      grid-column: 1;
    }
  }
}

.news-category__search-form {
  max-width: 382px;
  width: 100%;
  display: flex;

  input {
    border: 1px solid #e0e6eb !important;
    flex: 1;
    font-size: 1rem;
    height: 46px;
    border-radius: 0px !important;
    padding: 5px 25px;
  }

  button[type="submit"] {
    border: 1px solid #e0e6eb !important;
    margin-left: -1px;
    color: #393939;
    background-color: #fff;
    padding: 5px 25px;
    cursor: pointer;
  }

  @include lgMax {
    max-width: 100%;
    margin-bottom: 20px;
  }
}

@include xlMax {
  .news-grid::v-deep .news-article__actions-text {
    display: none;
  }
}
</style>
