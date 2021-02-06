<template>
  <div class="article">
    <div class="article__image">
      <router-link :to="'/' + type + '/' + information.slug">
        <img
          :src="getImageUrl(information.cover_image)"
          :alt="information.title"
          :title="information.title"
        />
      </router-link>
    </div>
    <div class="article__content">
      <h2 class="article__title">
        <router-link
          :to="'/' + type + '/' + information.slug"
          class="article__title-link"
          >{{ information.title }}</router-link
        >
      </h2>
      <div class="article__date" v-if="information.date != null">
        {{ information.date | articleDateFormat }}
      </div>
      <div class="article__categories" v-if="information.goals != null">
        {{ information.goals | formatCategories }}
      </div>
      <div class="article__location" v-if="information.location != null">
        {{ information.location }}
      </div>
      <div class="article__description">
        {{
          information.description != null
            ? information.description.substring(0, 110)
            : information.short_description.substring(0, 110)
        }}...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {};
  },
  filters: {
    formatCategories(categories) {
      let result = [];
      categories.forEach((category) => {
        result.push(category.name);
      });

      return result.join(", ");
    },
    articleDateFormat(time) {
      const dateObj = new Date(time);
      const day =
        dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate();
      const month =
        dateObj.getMonth() < 10 ? "0" + dateObj.getMonth() : dateObj.getMonth();
      const year = dateObj.getFullYear();

      return day + "-" + month + "-" + year;
    },
  },
  methods: {
    getImageUrl(image) {
      const type = this.$props.type;

      let url = this.$settings.images_path[type] + "m_" + image;

      return url;
    },
  },
  props: {
    information: {
      type: Object,
    },
    type: {
      type: String,
      default: "news",
    },
  },
};
</script>

<style lang="scss" scoped>
// TODO: Move styles to separate file
.article {
  box-sizing: border-box;
  border: 1px solid #c7c7c7;

  &:hover {
    .article__image {
      img {
        transform: scale(1.1);
      }
    }
  }

  .article__image {
    height: 0px;
    padding-top: 56.25%;
    position: relative;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform 0.4s;
      position: absolute;
      left: 0px;
      top: 0px;
    }
  }

  .article__content {
    padding: 24px 15px;
  }

  .article__title {
    margin: 0px 0px 12px 0px;
    font-family: "Montserrat Bold", sans-serif;
    text-transform: uppercase;

    @include font-size(1.2rem);

    .article__title-link {
      color: #1a1a1a;
      text-decoration: none;
    }
  }

  .article__date {
    color: #393939;
    font-family: "Montserrat SemiBold", sans-serif;
    text-transform: uppercase;
    font-size: 0.8rem;
    margin-bottom: 6px;
  }

  .article__categories {
    color: #d21217;
    font-family: "Montserrat SemiBold", sans-serif;
    text-transform: uppercase;
    font-size: 0.8rem;
    margin-bottom: 6px;
  }

  .article__location {
    color: #d21217;
    font-family: "Montserrat SemiBold", sans-serif;
    text-transform: uppercase;
    font-size: 0.8rem;
    margin-bottom: 6px;
  }

  .article__description {
    text-transform: lowercase;
    color: #1a1a1a;
    font-family: "Muli", sans-serif;

    &::first-letter {
      text-transform: uppercase;
    }
  }
}
</style>
