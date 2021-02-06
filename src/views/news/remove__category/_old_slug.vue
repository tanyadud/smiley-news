<template>
  <div>

    <article class="article container">
      <div class="article-content">
        <div class="article-header">
          <img
              :src="$settings.images_path.news  +'l_'+post.cover_image"
              :alt="post.title"
              :title="post.title"
              v-if="post.cover_image != null"
              class="article-header__image"
          />
          <div class="article-header__date">
            <i class="fa fa-calendar"></i>
            {{post.published_at}}
          </div>
          <h1 class="article-header__title">{{post.title}}</h1>
        </div>
        <div v-html="post.content" class="article-text"></div>
        <div class="article-source" v-if="post.source_url != null">
          Source:
          <i class="fa fa-link"></i>
          <a :href="post.source_url" target="_blank">{{post.source_url}}</a>
        </div>
        <div class="article-sharing">
          Share this article:
          <ul>
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
        </div>
        <div class="article-actions">
          <button class="like-button">
            <span class="likes-count">0</span>
            <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
            <span class="news-article__actions-text">Give this article a BIG thumbs up</span>
          </button>
          <!-- <button>
            <i class="fa fa-commenting-o" aria-hidden="true"></i>
            <span class="news-article__actions-text">Comment</span>
          </button>-->
        </div>
        <div class="article-comments">
          <div class="comments-title">Comments</div>
          <template v-if="comments.length > 0">
            <div class="comments">
              <comment-card v-for="comment in comments" :key="comment.date" :comment="comment">
                <template v-slot:replies v-if="comment.replies > 0">
                  <comment-card
                      v-for="childComment in comment.replies"
                      :key="childComment.date"
                      :comment="childComment"
                      :is_reply="true"
                  />
                </template>
              </comment-card>
            </div>
          </template>
          <template v-else>
            <template v-if="loggedIn">
              <p>Be the first to write a comment</p>
            </template>
            <template v-else>
              <p class="guest-text">
                Please
                <router-link :to="{name: 'login'}">Login</router-link>
                <span>&nbsp;or&nbsp;</span>
                <router-link :to="{name: 'register'}">Register</router-link>
                <span>&nbsp;to&nbsp;</span> leave a comment;
              </p>
            </template>
          </template>
          <template v-if="loggedIn">
            <div class="comments-title">Leave a comment</div>
            <comment-form
                :is_reply="false"
                :post_to="'/news/' + this.$route.params.slug + '/comments'"
                :placeholder="'Add a message'"
            />
          </template>
        </div>
      </div>
      <div class="article-sidebar">
        <h2 class="article-sidebar__title">Browse news by
          <router-link :to="{name: 'goals'}">SDG</router-link>
        </h2>
        <select class="news-category__dropdown" @change.prevent="goToCategory">
          <option disabled selected>Select goal</option>
          <option v-for="item in goals" :key="item.slug + item.id" :value="item.slug">{{item.name}}</option>
        </select>
        <h2 class="article-sidebar__title">related articles</h2>
        <div class="articles-related">
          <news-card
              v-for="article in related_posts"
              :key="'inner-article-'+article.slug"
              :article="article"
          />
        </div>
        <div class="articles-more-holder">
          <router-link :to="{name: 'news'}" class="articles-more">
            More news
            <i class="fa fa-angle-right"></i>
          </router-link>
        </div>
      </div>
    </article>

  </div>
</template>

<script>
    import axios from "@/axios-auth";
    import router from "@/router";

    import NewsCard from "@/components/cards/NewsCard";
    import CommentCard from "@/components/cards/CommentCard";
    import CommentForm from "@/components/forms/CommentForm";

    export default {
        data() {
            return {
                post: {
                    title: "",
                    content: ""
                },
                related_posts: [],
                goals: [],
                comments: [],
            };
        },
        computed: {
            loggedIn() {
                return this.$store.getters["user/isAuthenticated"];
            }
        },
        methods: {
            goToCategory(event) {
                router.push({
                    name: "news-category-item",
                    params: {slug: event.target.value}
                });
            },
            comment() {
            },
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
            }
        },
        mounted() {
            axios
                .get("/news/" + this.$route.params.slug)
                .then(res => {
                    console.log("News item loaded", res);

                    this.post = res.data.post;
                    this.related_posts = res.data.related;

                    const metaPayload = {
                        meta: res.data.meta,
                        title: res.data.post.title
                    }
                    this.$store.dispatch('meta/setMeta', metaPayload);
                    this.$router.currentRoute.meta.title = this.post.title;
                })
                .catch(error => console.log(error));
            axios
                .get("/news/" + this.$route.params.slug + "/comments")
                .then(res => {
                    console.log("Comments loaded", res);
                    this.comments = res.data.comments;
                })
                .catch(error => console.log(error));

            axios
                .get("/goals")
                .then(result => {
                    console.log("Goals loaded", result);
                    this.goals = result.data.goal_categories[0].goals;
                })
                .catch(error => console.error("Error", error));
        },
        components: {
            NewsCard,
            CommentCard,
            CommentForm,
        },
    };
</script>

<style lang="scss" scoped>
  ol {
    counter-reset: listCounter;

    ol {
      counter-reset: subListCounter;
    }
  }

  .article {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 20px;

    @include xlMax {
      display: block;
    }
  }

  .article-content {
    margin-bottom: 48px;
  }

  .article-header {
    position: relative;
    overflow: hidden;
    min-height: 400px;
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    @include smMax {
      min-height: 200px;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, #ffd65e 0%, #febf10 100%);
    }

    &::after {
      content: "";
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 3;
    }

    .article-header__image {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      z-index: 2;
    }

    .article-header__date {
      color: #fff;
      font-family: "Montserrat SemiBold", sans-serif;
      @include font-size(1rem);
      position: relative;
      z-index: 4;
      opacity: 0.6;

      i {
        margin-right: 5px;
      }
    }

    .article-header__title {
      color: #fff;
      font-family: "Montserrat Bold", sans-serif;
      @include font-size(2.5rem);
      position: relative;
      z-index: 4;
      letter-spacing: 2px;
    }
  }

  .article::v-deep .article-text {
    @include font-size(1.2rem);
    line-height: 1.45;

    border-bottom: 1px solid rgba(57, 57, 57, 0.2);
    padding-bottom: 10px;
    margin-bottom: 20px;

    a {
      color: #F36E25 !important;
      border-bottom: 1px solid #F36E25;
      transition: border-color .2s;

      &:hover {
        text-decoration: none;
        color: #F36E25;
      }
    }

    p {
      line-height: 1.6;
      @include margin-bottom(1.2rem);
    }

    blockquote {
      margin-left: 20px;
      padding: 20px;
      border-left: 1px solid #393939;
      font-family: "MontserratSemiBold", sans-serif;
      line-height: 2;
      letter-spacing: 1px;
    }

    ul {
      li {
        position: relative;
        padding-left: 20px;

        &:not(:last-child) {
          margin-bottom: 10px;
        }

        &::before {
          content: "";
          width: 6px;
          height: 6px;
          position: absolute;
          border-radius: 50%;
          background-color: #393939;
          left: 0px;
          top: 10px;
        }

        li::before {
          opacity: 0.7;
        }
      }

      ol {
        li::before {
          background-color: transparent;
        }
      }
    }

    ol {
      list-style-type: none;
      padding-left: 0px;

      li {
        position: relative;
        padding-left: 20px;

        &:not(:last-child) {
          margin-bottom: 10px;
        }

        &::before {
          counter-increment: listCounter;
          content: counter(listCounter);
          position: absolute;
          color: #393939;
          left: 0px;
          top: 4px;
          @include font-size(0.8rem);
        }

        // li::before {
        //   opacity: 0.7;
        // }

        li::before {
          counter-increment: subListCounter;
          content: counter(subListCounter);
        }
      }
    }

    ul,
    ol {
      ul,
      ol {
        margin-top: 12px;
        // counter-reset: subListCounter;
      }
    }

    a {
      text-decoration: none;
      border-bottom: 1px solid #393939;
      color: #393939;
      transition: border-color 0.2s;
      font-family: "Montserrat SemiBold", sans-serif;

      &:hover {
        border-color: transparent;
      }
    }
  }

  .article-source {
    font-family: "Montserrat SemiBold", sans-serif;
    @include font-size(1.2rem);

    i {
      margin: 0px 7px;
    }

    a {
      font-family: "Montserrat Regular", sans-serif;
      word-break: break-word;
      text-decoration: none;
      color: #007bbf;
      border-bottom: 1px solid #007bbf;
      transition: border-color 0.2s;

      &:hover {
        border-color: transparent;
      }
    }
  }

  .article-sharing {
    display: flex;
    font-family: "Montserrat SemiBold", sans-serif;
    padding: 12px 0px;
    margin: 12px 0px;
    // border-top: 1px solid #393939;
    // border-bottom: 1px solid #393939;
    align-items: center;
    @include font-size(1.2rem);

    ul {
      display: flex;
      padding-left: 7px;
      margin: 0px;
    }

    li {
      margin-left: 7px;
      margin-right: 7px;
      border: 1px solid #393939;
      line-height: 1;
      width: 36px;
      height: 36px;
      transition: background-color 0.4s;

      &:hover {
        background: #393939;

        a {
          color: #fff;
        }
      }
    }

    a {
      color: #393939;
      transition: color 0.2s;
      display: block;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      @include font-size(1.1rem);
      transition: color 0.2s;
    }
  }

  .article-actions {
    display: flex;
    justify-content: center;
    border-top: 1px solid rgba(57, 57, 57, 0.2);
    padding-top: 30px;
    margin-top: 20px;
    margin-bottom: 30px;

    button {
      width: 100%;
      max-width: 360px;
      padding: 20px 15px;
      @include font-size(1rem);
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      color: #393939;
      font-family: "Montserrat SemiBold", sans-serif;
      cursor: pointer;
      transition: color 0.4s;
      border: none;
      -webkit-appearance: none !important;
      -webkit-border-radius: 0 !important;
      border: 1px solid #393939;
      position: relative;
      overflow: hidden;

      &:not(:last-child) {
        margin-right: 10px;
      }

      &:hover {
        color: #fff;

        &::before {
          top: 0px;
        }
      }

      &::before {
        content: "";
        background-color: #000;
        position: absolute;
        left: 0px;
        width: 100%;
        height: 100%;
        top: 100%;
        transition: top 0.2s;
      }

      div,
      span,
      i {
        position: relative;
        z-index: 2;
      }

      .likes-count {
        margin-right: 12px;
      }

      .news-article__actions-text {
        margin-left: 12px;
      }

      @include mdMax {
        .news-article__actions-text {
          display: none;
        }
      }
    }
  }

  .article-sidebar {
    .article-sidebar__title {
      text-transform: uppercase;
      font-family: "Montserrat Bold", sans-serif;
      margin-bottom: 20px;
      margin-top: 0px;

      a {
        color: #F36E25;
        border-bottom: 1px solid #F36E25;
        transition: border-color .2s;

        &:hover {
          text-decoration: none;
          color: #F36E25;
        }
      }
    }

    .articles-related {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      grid-gap: 5px;

      @include xlMax {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 5px;

        &::v-deep .news-article__actions-text {
          display: none;
        }
      }
      @include lgMax {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 5px;

        &::v-deep .news-article__actions-text {
          display: block;
        }
      }
      @include mdMax {
        display: block;
        .news-article {
          margin-bottom: 5px;
        }
      }
    }

    .articles-more-holder {
      padding-top: 20px;
      @include xlMax {
        text-align: center;
      }
    }

    .articles-more {
      padding: 10px 20px;
      text-decoration: none;
      display: inline-block;
      border: 1px solid #393939;
      color: #393939;
      @include font-size(1.2rem);
      font-family: "Montserrat SemiBold", sans-serif;
      transition: color 0.2s, background-color 0.2s;

      i {
        margin-left: 12px;
        transition: transform 0.2s;
      }

      &:hover {
        color: #fff;
        background-color: #393939;

        i {
          transform: translateX(5px);
        }
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
    box-sizing: border-box;

    font-family: "Montserrat Regular", sans-serif;
    margin-bottom: 24px;
    width: 100%;
    min-width: 320px;
    max-width: 500px;
  }

  .comments-title {
    font-family: "Montserrat SemiBold", sans-serif;
    @include font-size(1.2rem);
    margin-bottom: 20px;
  }

  .comments {
    max-width: 768px;
  }

  .guest-text {
    a {
      text-decoration: none;
      border-bottom: 1px solid #393939;
      transition: border-color 0.2s;
      color: #393939;
      font-family: "Montserrat SemiBold", sans-serif;

      &:hover {
        border-color: transparent;
      }
    }
  }
</style>