<template>
  <div class="project-article">
    <div class="project-article__image">
      <img
        :src="$settings.images_path.projects +'m_'+project.cover_image"
        v-if="project.cover_image != null"
        alt
      />
    </div>
    <div class="project-article__content">
      <div class="project-article__category">
        <div class="project-article__header" v-if="project.goals.length > 0">
          <div class="project-article__category-name">{{ project.goals[0].name}}</div>
          <div class="project-article__category-circle" v-if="project.goals.length > 1">
            <span>+{{project.goals.length - 1}}</span>
          </div>
        </div>
        <!-- <div class="project-article__timestamp">TODO: Make this it's for match</div> -->
      </div>
      <div class="project-article__spacer"></div>
      <div class="project-article__inner">
        <h3 class="project-article__title">
          <router-link :to="{name: 'project', params: {slug: project.slug}}">{{project.name}}</router-link>
        </h3>
        <div class="project-article__description" v-html="trimDescription(project.description)"></div>
        <div class="project-article__button">
          <router-link :to="{name: 'project', params: {slug: project.slug}}">view project</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  methods: {
    trimDescription(description) {
      return description.length > 80
        ? description.substring(0, 80) + "..."
        : description;
    }
  },
  props: {
    project: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.project-article {
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
    .project-article__image {
      img {
        transform: scale(1.1);
      }
    }
  }

  .project-article__image {
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

  .project-article__inner {
    transition: transform 0.4s;
  }

  .project-article__content {
    position: relative;
    z-index: 2;
    display: flex;
    flex: 1;
    flex-direction: column;
    transition: transform 0.4s;
  }

  .project-article__header {
    display: flex;
    align-items: center;
  }

  .project-article__category {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .project-article__category-name {
    background-color: rgba(125, 132, 148, 0.6);
    color: #fff;
    padding: 6px 14px;
    text-transform: uppercase;
    display: inline-block;
    font-family: "Montserrat SemiBold";
    transition: background-color 0.4s;

    @include font-size(0.6rem);
  }

  .project-article__category-circle {
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
      white-space: nowrap;
    }
  }

  .project-article__timestamp {
    color: #fff;
    font-family: "Montserrat Regular", sans-serif;
    opacity: 0.7;
    display: none;
  }

  .project-article__spacer {
    flex: 1;
    min-height: 50px;
  }

  .project-article__title {
    @include font-size(1.1rem);
    line-height: 1.45;
    color: #fff;
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

  .project-article__description {
    font-family: "Inter Regular";
    margin-bottom: 24px;
  }

  .project-article__button a {
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
}
</style>