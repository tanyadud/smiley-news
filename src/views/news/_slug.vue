<template>
  <div>
    <article class="article container">
      <div class="article-content">
        <div class="article-header">
          <div class="article-header__title">
            <h1>{{ post.title }}</h1>
          </div>
          <img
            :src="$settings.images_path.news + 'l_' + post.cover_image"
            :alt="post.title"
            :title="post.title"
            v-if="post.cover_image != null"
            class="article-header__image"
          />
          <div class="article-header__metadata">
            Lorem | {{ post.published_at }} | {{ comments.length }} Comments
          </div>
          <div class="article-header__sharing">
            <div class="article-header__sharing-goals">
              <ul class="article-header__sharing-goals-badges">
                <li><img src="/img/goals/goals-1.svg" alt="goal" /></li>
                <li><img src="/img/goals/goals-2.svg" alt="goal" /></li>
              </ul>
              <span>| UN Goals</span>
            </div>
            <div class="article-header__sharing-social">
              <ul>
                <li>
                  <a :href="shareLink('twitter')" target="_blank">
                    <img src="/img/social/twitter.svg" alt="twitter" />
                  </a>
                </li>
                <li>
                  <a :href="shareLink('instagram')" target="_blank">
                    <img src="/img/social/insta.svg" alt="instagram"
                  /></a>
                </li>
                <li>
                  <a :href="shareLink('facebook')" target="_blank">
                    <img src="/img/social/fb.svg" alt="facebook"
                  /></a>
                </li>
                <li>
                  <a :href="shareLink('youtube')" target="_blank">
                    <img src="/img/social/youtube.svg" alt="youtube"
                  /></a>
                </li>
              </ul>
              <span>&#60;share</span>
            </div>
          </div>
        </div>

        <div v-html="post.content" class="article-text"></div>

        <div class="article-author">
          <img
            class="article-author__pic"
            src="/img/organization/avatar-1.jpg"
            alt="author"
          />
          <span class="article-author__name">| Editors Name</span>
        </div>
      </div>

      <div class="articles-related">
        <section class="news-section container">
          <div class="news-category">
            <h2 class="news-category__title"><b>Related</b> | News</h2>
            <VSearch
              @submit.native.prevent="find"
              placeholder="Search topic..."
              v-model="search"
            />
          </div>
          <NewsGallery :news="related_posts"></NewsGallery>
        </section>
      </div>
    </article>
  </div>
</template>

<script>
import axios from "@/axios-auth";
import router from "@/router";
import NewsGallery from "@/components/news/NewsGallery.vue";
import { VSearch } from "@/components/app";
// import CommentCard from "@/components/cards/CommentCard";
// import CommentForm from "@/components/forms/CommentForm";

export default {
  components: {
    NewsGallery,
    VSearch,
    // CommentCard,
    // CommentForm,
  },
  data() {
    return {
      post: {
        title: "",
        content: "",
      },
      search: "",
      related_posts: [],
      goals: [],
      comments: [],
    };
  },

  computed: {
    loggedIn() {
      return this.$store.getters["user/isAuthenticated"];
    },
  },
  methods: {
    find() {
      router.push({
        name: "news-search",
        params: { keyword: this.search },
      });
    },
    goToCategory(event) {
      router.push({
        name: "news-category-item",
        params: { slug: event.target.value },
      });
    },
    comment() {},
    shareLink(type) {
      let result = "";
      const title = encodeURI(this.post.title);
      const url = process.env.VUE_APP_DOMAIN + encodeURI(this.$route.path);

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
  },
  mounted() {
    axios
      .get("/news/" + this.$route.params.slug)
      .then((res) => {
        console.log("News item loaded", res);

        this.post = res.data.post;
        this.related_posts = res.data.related;

        const metaPayload = {
          meta: res.data.meta,
          title: res.data.post.title,
        };
        this.$store.dispatch("meta/setMeta", metaPayload);
        this.$router.currentRoute.meta.title = this.post.title;
      })
      .catch((error) => console.log(error));
    axios
      .get("/news/" + this.$route.params.slug + "/comments")
      .then((res) => {
        console.log("Comments loaded", res);
        this.comments = res.data.comments;
      })
      .catch((error) => console.log(error));

    axios
      .get("/goals")
      .then((result) => {
        console.log("Goals loaded", result);
        this.goals = result.data.goal_categories[0].goals;
      })
      .catch((error) => console.error("Error", error));
  },
};
</script>

<style lang="scss" scoped>
.article {
  margin-top: 100px;
}

.article-header {
  .article-header__title {
    font: {
      family: "Gotham Bold";
      size: 20px;
    }
    line-height: 44px;
    border-bottom: 2px solid #ffe300;
    padding-bottom: 14px;
  }

  .article-header__image {
    width: 100%;
    margin-top: 26px;
  }

  .article-header__metadata {
    color: #e70f0f;
    margin-top: 50px;
    font: {
      family: "Gotham Medium";
      size: 25px;
    }
    line-height: 27px;
  }

  .article-header__sharing {
    display: flex;
    margin-top: 50px;

    @include smMax {
      flex-direction: column;
    }

    .article-header__sharing-goals {
      display: flex;

      font: {
        family: "Gotham Medium";
        size: 25px;
      }
      line-height: 27px;

      .article-header__sharing-goals-badges {
        display: flex;

        ul {
          margin: 0;
        }

        li {
          margin-right: 10px;
        }
      }
    }

    .article-header__sharing-social {
      @include smMax {
        margin-left: 0px;
        margin-top: 20px;
      }

      display: flex;
      margin-left: 50px;
      ul {
        display: flex;

        li {
          margin-right: 10px;
        }
      }

      span {
        font: {
          family: "Gotham Book";
          size: 25px;
        }
        line-height: 30px;
      }
    }
  }
}

.article-text {
  font: {
    family: "Gotham Book";
    size: 25px;
  }
  line-height: 27px;
}

.article-author {
  &__pic {
    border-radius: 50%;
    height: 70px;
    width: 70px;
  }

  &__name {
    margin-left: 15px;
    font: {
      family: "Gotham Medium";
      size: 25px;
    }
  }
}

.news-section {
  margin-top: 70px;
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
    font-family: "Gotham Light", sans-serif;
    font-size: 30px;
    line-height: 40px;

    b {
      font-family: "Gotham Bold", sans-serif;
    }
  }
}
</style>
