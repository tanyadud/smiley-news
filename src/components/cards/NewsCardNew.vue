<template>
  <article class="news-article">
    <div class="news-article__image">
      <media-image
          :src="article.cover_image"
          :alt="article.title"
          :title="article.title"
          size="m"
          type="news"
      />
      <div
          class="news-article__category"
          v-if="manualGoal == null"
      >{{ (article.goals != null && article.goals.length > 0) ? article.goals[0].name : '' }}
      </div>
      <div class="news-article__category" v-else>{{ manualGoal }}</div>
    </div>
    <div class="news-article__description">
      <h3 class="news-article__title">
        <router-link :to="{name: 'news-item', params: {slug: article.slug}}">{{ article.title }}</router-link>
      </h3>
      <div class="news-article__excerpt">
        <span v-html="article.description"></span>
        <router-link :to="{name: 'news-item', params: {slug: article.slug}}"> more...</router-link>
      </div>
      <ul class="news-article__infos">
        <li class="news-article__infos-item">Interview</li>
        <li class="news-article__infos-item">Highlights</li>
        <li class="news-article__infos-item">{{ dateAgo(article.published_at) }}</li>
      </ul>
    </div>
    <div class="news-article__actions">
      <router-link
          :to="{name: 'news-item', params: {slug: article.slug}}"
          class="news-article__actions-item"
      >Read more</router-link>
    </div>
  </article>
</template>

<script>
import MediaImage from "@/components/Image.vue";

export default {
  name: 'NewsCardNew',
  components: {
    MediaImage
  },
  data() {
    return {}
  },
  props: {
    article: {
      type: Object,
    },
    manualGoal: {
      default: null
    }
  },
  filters: {
    trimDescription(description) {
      return description.length > 120
          ? description.substring(0, 120) + "..."
          : description;
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.news-article {
  box-shadow: 0px 3px 6px rgba(0,0,0,.15);
  display: flex;
  flex-direction: column;

  &__image {
    position: relative;
    width: 100%;
    height: 0px;
    padding-top: 56.25%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
      object-fit: cover;
    }
  }

  &__category {
    position: absolute;
    bottom: 0px;
    right: 0px;
    padding: .5rem 1rem;
    background-color: rgba(135,135,133,.6);
    color: #fff;
  }

  &__description {
    background-color: #fff;
    padding: 1.5rem 1rem;
    display: flex;
    flex: 1;
    flex-direction: column;
    height: auto;
  }

  &__title {
    @include font-size(1.4rem);
    line-height: 1.4;
    flex: 1;

    a {
      color: #000;
      border-bottom: 1px solid transparent;
      transition: border-color .2s;

      &:hover {
        text-decoration: none;
        border-color: #000;
      }
    }
  }

  &__excerpt {
    margin-top: 1.45rem;
  }

  &__infos {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 1.45rem;

    &-item {
      margin-right: .5rem;
      padding-right: .5rem;
      position: relative;
      &::after {
        content: '';
        width: 1px;
        height: 60%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0px;
        background-color: #000;
      }
      &:first-child {
        font-weight: bold;
      }
      &:last-child {
        &::after {
          display: none;
        }
      }
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    &-item {
      margin: 1rem;
      border-radius: 40px;
      background-color: #FFE300;
      box-shadow: 0px 3px 6px rgba(0,0,0,.15);
      display: inline-block;
      padding: .5rem 1.2rem;
      color: #000;
      text-decoration: none !important;
    }
  }
}
</style>
