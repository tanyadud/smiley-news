<template>
  <article class="news-article">
    <div class="news-article__image">
      <MediaImage
        :src="article.cover_image"
        :alt="article.title"
        :title="article.title"
        size="m"
        type="news"
      />
      <div class="news-article-category">
        <span class="news-article-category__name" v-if="manualGoal == null">
          {{
            article.goals != null && article.goals.length > 0
              ? article.goals[0].name
              : ""
          }}
        </span>
        <span class="news-article-category__name" v-else>{{ manualGoal }}</span>
      </div>
    </div>

    <div class="news-article__content">
      <h3 class="news-article__content-title">
        {{ cutText(article.title, 90) }}
      </h3>
      <div
        class="news-article__content-description"
        v-html="cutText(article.description, 55)"
      ></div>
      <div class="news-article__content-metadata">
        <span>Lorem</span> | ipsum | {{ dateAgo(article.published_at) }}
      </div>
    </div>

    <div class="news-article__readmore">
      <VButton
        class="news-article__button"
        @click.native.prevent="openPage"
        shape="round"
      >
        Read more
      </VButton>
    </div>
  </article>
</template>

<script>
import router from "@/router";
import MediaImage from "@/components/Image.vue";
import { VButton } from "@/components/app";

export default {
  name: "NewsCard",
  components: {
    MediaImage,
    VButton,
  },
  props: {
    article: {
      type: Object,
    },
    manualGoal: {
      default: null,
    },
  },
  data() {
    return {
      sharing: false,
    };
  },
  filters: {
    trimDescription(description) {
      return description.length > 120
        ? description.substring(0, 120) + "..."
        : description;
    },
  },
  methods: {
    openPage() {
      router.push({ name: "news-item", params: { slug: this.article.slug } });
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
    cutText(text, limit) {
      if (text.length > limit) {
        return text.slice(0, limit).trim() + "...";
      }

      return text;
    },
  },
};
</script>

<style lang="scss" scoped>
.news-article {
  background-color: white;
  position: relative;
  min-height: 865px;
  color: #fff;
  box-shadow: 0 3px 6px rgba(#000, 0.16);

  .news-article__image {
    position: relative;
    height: 460px;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      opacity: 0.9;
      object-fit: cover;
      object-position: center;
    }

    .news-article-category {
      position: absolute;
      bottom: 0;
      right: 0;
      color: white;
      background: rgba(#888785, 0.6);
      font-size: 24px;
      font-family: "Gotham Bold";
      padding: 8px 16px;

      .news-article-category__name {
        color: white;
      }
    }
  }

  .news-article__content {
    min-height: 310px;
    padding: {
      top: 26px;
      left: 16px;
      right: 16px;
      bottom: 20px;
    }

    .news-article__content-title {
      color: black;
      font-family: "Gotham Bold", sans-serif;
      font-size: 26px;
      line-height: 35px;
    }

    .news-article__content-description {
      color: black;
      font-family: "Gotham Book", sans-serif;
      font-size: 25px;
      line-height: 33px;
      margin-top: 40px;
    }

    .news-article__content-metadata {
      color: black;
      font-family: "Gotham Medium";
      font-size: 22px;
      margin-top: 16px;

      span {
        font-family: "Gotham Bold";
      }
    }
  }

  .news-article__readmore {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding-bottom: 26px;
  }
}
</style>
