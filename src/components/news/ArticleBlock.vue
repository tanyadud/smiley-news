<template>
  <div class="article">
    <div class="article__comming-soon" v-if="information.disabled">Coming Soon</div>
    <div class="article__image" v-if="information.image != null">
      <router-link :to="information.link">
        <img :src="information.image" :alt="information.title" :title="information.title" />
      </router-link>
    </div>
    <div class="article__content">
      <h2 class="article__title">
        <router-link :to="information.link" class="article__title-link">{{ information.title }}</router-link>
      </h2>
      <div class="article__description">{{ information.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    information: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
// TODO: Move styles to separate file
.article {
  box-sizing: border-box;
  border: 1px solid #c7c7c7;
  position: relative;

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

  .article__description {
    text-transform: lowercase;
    color: #1a1a1a;
    font-family: "Muli", sans-serif;

    &::first-letter {
      text-transform: uppercase;
    }
  }

  .article__comming-soon {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.7);
    font-family: "Montserrat SemiBold", sans-serif;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
  }

  &:hover {
    .article__comming-soon {
      opacity: 1;
      pointer-events: all;
    }
  }
}
</style>