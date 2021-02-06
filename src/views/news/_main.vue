<template>
  <div class="news">
    <section
      class="news-section container"
      v-for="item in news"
      :key="'news-item-' + item.slug"
      :item="item"
    >
      <div class="news-category">
        <h2 class="news-category__title">{{ item.prefix }} {{ item.name }}</h2>
        <VSearch
          @submit.native.prevent="find"
          placeholder="Search topic..."
          v-model="search"
        />
      </div>
      <NewsGallery :news="item.latest_news"></NewsGallery>
    </section>
  </div>
</template>

<script>
import axios from "@/axios-auth";
import router from "@/router";
import NewsGallery from "@/components/news/NewsGallery.vue";
import { VSearch } from "@/components/app";

export default {
  name: "News",
  components: {
    NewsGallery,
    VSearch,
  },
  data() {
    return {
      latest: [],
      news: [],
      search: "",
    };
  },
  methods: {
    find() {
      router.push({
        name: "news-search",
        params: { keyword: this.search },
      });
    },
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
};
</script>

<style lang="scss" scoped>
.news {
  margin-top: 60px;
}

.news-section {
  margin-bottom: 100px;
  position: relative;
}

.news-category {
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #ffe300;
  margin-bottom: 16px;
  padding-bottom: 24px;

  .news-category__title {
    color: black;
    font-family: "Gotham Bold";
    font-size: 30px;
    line-height: 40px;
  }
}
</style>
