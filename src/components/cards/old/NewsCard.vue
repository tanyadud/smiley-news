<template>
  <!-- TODO: Refactor !!! -->
  <div class="news-article">
    <div class="news-article__image">
      <media-image
        :src="article.cover_image"
        :alt="article.title"
        :title="article.title"
        size="m"
        type="news"
      />
    </div>
    <div class="news-article__content">
      <div class="news-article__category">
        <div class="news-article__header">
          <div
            class="news-article__category-name"
            v-if="manualGoal == null"
          >{{ (article.goals != null && article.goals.length > 0) ? article.goals[0].name : '' }}</div>
          <div class="news-article__category-name" v-else>{{ manualGoal }}</div>
          <!-- <div class="news-article__category-circle">
            <span>+15</span>
          </div>-->
        </div>
        <div class="news-article__timestamp">{{dateAgo(article.published_at)}}</div>
      </div>
      <div class="news-article__spacer"></div>
      <div class="news-article__inner">
        <h3 class="news-article__title">
          <router-link :to="{name: 'news-item', params: {slug: article.slug}}">{{article.title}}</router-link>
        </h3>
        <div class="news-article__description">
          {{ /*  article.description | trimDescription  */ }}
          <span v-html="article.description"></span>
          <router-link :to="{name: 'news-item', params: {slug: article.slug}}">Continue Reading</router-link>
        </div>
        <!-- <div class="news-article__button">
          <a :href="buttonLink">view project</a>
        </div>-->
      </div>
    </div>
    <div class="news-article__actions">
      <button>
        <span class="likes-count">0</span>
        <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
        <span class="news-article__actions-text">Like</span>
      </button>
      <button @click.prevent="openPage">
        <span class="news-article__actions-text">Read more</span>
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </button>
      <button @click.prevent="sharing = true">
        <i class="fa fa-share-alt" aria-hidden="true"></i>
        <span class="news-article__actions-text">Share</span>
      </button>
    </div>
    <transition name="fade">
      <div class="news-article__share" v-show="sharing">
        <div class="news-article__share-title">Share this article:</div>
        <ul class="news-article__share-links">
          <li>
            <a :href="shareLink('twitter')" target="_blank">
              <i class="fa fa-twitter"></i>
            </a>
          </li>
          <li>
            <a :href="shareLink('facebook')" target="_blank">
              <i class="fa fa-facebook"></i>
            </a>
          </li>
          <li>
            <a :href="shareLink('linkedin')" target="_blank">
              <i class="fa fa-linkedin"></i>
            </a>
          </li>
        </ul>
        <button class="news-article__share-close" @click.prevent="sharing = false">
          <i class="fa fa-close"></i>
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import router from "@/router";
import MediaImage from "@/components/Image.vue";
export default {
  name: "NewsCard",
  data() {
    return {
      sharing: false
    };
  },
  components: {
    MediaImage
  },
  filters: {
    trimDescription(description) {
      return description.length > 120
        ? description.substring(0, 120) + "..."
        : description;
    }
  },
  methods: {
    openPage() {
      router.push({ name: "news-item", params: { slug: this.article.slug } });
    },
    shareLink(type) {
      let result = "";
      const title = encodeURI(this.article.title);
      const url =
        process.env.VUE_APP_DOMAIN +
        "/smiley-news/" +
        encodeURI(this.article.slug);

      switch (type) {
        case "facebook":
          result = `https://www.facebook.com/sharer.php?u=${url}&t=${title}`;
          break;
        case "twitter":
          result = `http://twitter.com/share?text=${title}&url=${url}`;
          break;
        case "linkedin":
          result = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
          break;
      }

      return result;
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
    }
  },
  props: {
    article: {
      type: Object
    },
    manualGoal: {
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
// TODO: Move to file
.news-article {
  background-color: #000;
  position: relative;
  padding: 30px;
  min-height: 350px;
  transition: padding-bottom 0.4s;
  color: #fff;
  display: flex;
  flex-direction: column;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    background-color: #000;
    opacity: 0.5;
    z-index: 2;
  }

  &:hover {
    .news-article__image {
      img {
        transform: scale(1.1);
      }
    }
    .news-article__inner {
      transform: translateY(-60px);
    }
    .news-article__actions {
      opacity: 1;
      pointer-events: all;
    }
  }

  .news-article__image {
    position: absolute;
    left: 0px;
    top: 0px;
    overflow: hidden;
    height: 100%;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform 0.4s;
    }
  }

  .news-article__inner {
    transition: transform 0.4s;
  }

  .news-article__content {
    position: relative;
    z-index: 2;
    display: flex;
    flex: 1;
    flex-direction: column;
    transition: transform 0.4s;
  }

  .news-article__header {
    display: flex;
    align-items: center;
  }

  .news-article__category {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .news-article__category-name {
    background-color: rgba(125, 132, 148, 0.6);
    color: #fff;
    padding: 6px 14px;
    text-transform: uppercase;
    display: inline-block;
    font-family: "Montserrat SemiBold";
    transition: background-color 0.4s;

    @include font-size(0.6rem);
  }

  .news-article__category-circle {
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.5);
    font-size: 0px;
    position: relative;
    padding: 16px;
    margin-left: 16px;

    span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -49%);
      @include font-size(0.8rem);
      font-family: "Inter Regular";
    }
  }

  .news-article__timestamp {
    color: #fff;
    font-family: "Montserrat Regular", sans-serif;
    opacity: 0.7;
  }

  .news-article__spacer {
    flex: 1;
    min-height: 50px;
  }

  .news-article__title {
    @include font-size(1.1rem);
    line-height: 1.45;
    font-family: "Montserrat SemiBold", sans-serif;
    a {
      color: #fff;
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: border-color 0.4s;

      &:hover {
        border-color: #fff;
      }
    }
  }

  .news-article__description {
    font-family: "Inter Regular";
    // margin-bottom: 24px;
    //text-transform: lowercase;
    //
    //&:first-letter {
    //  text-transform: uppercase;
    //}

    a {
      color: #f4ed3b;
      text-decoration: none;
      border-bottom: 1px solid #f4ed3b;
      transition: border-color 0.4s;

      &:hover {
        border-color: transparent;
      }
    }
  }

  .news-article__button a {
    text-decoration: none;
    background-color: rgba(125, 132, 148, 1);
    color: #fff;
    padding: 6px 14px;
    text-transform: uppercase;
    display: inline-block;
    font-family: "Montserrat SemiBold", sans-serif;
    transition: background-color 0.4s;

    @include font-size(0.8rem);

    &:hover {
      background-color: rgba(125, 132, 148, 0.8);
    }
  }

  .news-article__actions {
    position: absolute;
    margin: 0px 30px 30px 30px;
    bottom: 0px;
    left: 0px;
    z-index: 3;
    color: #fff;
    display: flex;
    border: 1px solid rgba(255, 255, 255, 0.7);
    width: calc(100% - 60px);
    box-sizing: border-box;
    opacity: 0;
    pointer-events: none;
    transition: opacity 1s;

    button {
      width: 100%;
      padding: 10px 15px;
      font-size: 12px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      color: #fff;
      font-family: "Montserrat Regular", sans-serif;
      cursor: pointer;
      transition: background-color 0.4s, color 0.4s;
      border: none;
      cursor: pointer;
      -webkit-appearance: none !important;
      -webkit-border-radius: 0 !important;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      &:not(:last-child) {
        border-right: 1px solid rgba(255, 255, 255, 0.7);
      }

      .likes-count {
        margin-right: 12px;
      }

      .news-article__actions-text {
        margin-left: 12px;
      }

      .fa.fa-angle-right {
        margin-left: 12px;
      }

      @include mdMax {
        .news-article__actions-text {
          display: none;
        }
      }
    }
  }

  .news-article__share {
    position: absolute;
    background-color: rgba(238, 180, 0, 0.9);
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    left: 10px;
    top: 10px;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .news-article__share-title {
      font-family: "Montserrat SemiBold", sans-serif;
      margin-bottom: 12px;
    }
    .news-article__share-links {
      display: flex;

      li {
        margin-left: 15px;
        margin-right: 15px;
      }

      a {
        color: #fff;
        border: 1px solid #fff;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        @include font-size(1.5rem);
        line-height: 1;

        overflow: hidden;
        position: relative;

        i {
          position: relative;
          z-index: 2;
        }

        &::before {
          content: "";
          display: block;
          width: 100%;
          height: 100%;
          background-color: #000;
          position: absolute;
          left: 0px;
          top: 100%;
          transition: top 0.2s;
        }

        &:hover::before {
          top: 0px;
        }
      }
    }

    .news-article__share-close {
      -webkit-appearance: none;
      border: 0;
      line-height: 1;
      padding: 5px 10px;
      margin-top: 24px;
      background-color: transparent;
      @include font-size(1.5rem);
      cursor: pointer;
      color: rgba(255, 255, 255, 0.7);
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
