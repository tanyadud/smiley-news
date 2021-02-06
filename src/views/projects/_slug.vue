<template>
  <div>
    <div class="project-information">
      <img
        :src="$settings.images_path.projects +'l_'+project.cover_image"
        class="project-information__banner"
        v-if="project.cover_image"
      />

      <div class="project-information__top container">
        <div class="project-information__user">
          <img
            :src="$settings.images_path.users +'m_'+project.owner.avatar"
            v-if="project.owner != null && project.owner.avatar != null"
            class="project-information__user-avatar"
          />
          <div class="project-information__user-content">
            <div class="project-information__user-hosted">Project hosted by</div>
            <div class="project-information__user-name" v-if="project.owner != null">{{project.owner.name}}</div>
          </div>
        </div>
      </div>
      <div class="project-information__bottom container">
        <div class="project-information__column-info">
          <h1 class="project-information__title">{{project.name}}</h1>
          <div class="project-information__description" v-html="project.description"></div>
          <div class="project-information__location">
            <i class="fa fa-map-marker"></i>
            {{project.city}}, {{project.country}}
          </div>
          <div class="project-information__buttons">
            <router-link
              :to="{name: 'edit-project', params: {slug: project.slug}}"
              v-if="project.is_owner"
            >
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              edit project
            </router-link>
            <a href="#" class="primary">offer support</a>
            <a :href="project.donation_link" v-if="project.allow_donations">make a donation</a>
          </div>
        </div>
        <div class="project-information__column-additional">
          <div class="project-information__additional-block">
            <div class="project-information__additional-block-title">Affected</div>
            <ul>
              <li
                v-for="(affected, index) in project.affected"
                :key="'affected-'+index"
              >• {{affected.text}}</li>
            </ul>
          </div>
          <div class="project-information__additional-block">
            <div class="project-information__additional-block-title">Supporters</div>
            <p>No supporters yet</p>
          </div>
          <div class="project-information__additional-block">
            <div class="project-information__additional-block-title">share project</div>
            <ul class="project-information__additional-share">
              <li>
                <a href="#">
                  <app-icon name="facebook" />
                </a>
              </li>
              <li>
                <a href="#">
                  <app-icon name="linkedin" />
                </a>
              </li>
              <li>
                <a href="#">
                  <app-icon name="google" />
                </a>
              </li>
              <li>
                <a href="#">
                  <app-icon name="twitter" />
                </a>
              </li>
              <li>
                <a href="#">
                  <app-icon name="instagram" />
                </a>
              </li>
            </ul>
          </div>
          <div class="project-information__additional-block">
            <div class="project-information__additional-block-title">UN Goal</div>
            <p>{{project.goals ? projectGoals(project.goals) : null}}</p>
          </div>
        </div>
      </div>
    </div>

    <section class="project-heading section container" v-if="project.allow_donations">
      <h2 class="project-heading__title">Make a donation</h2>
      <p class="project-heading__subtitle">Why we need this?</p>
      <div class="project-heading__content">
        <p v-html="project.donation_text"></p>
      </div>
      <div class="project-heading__button">
        <a :href="project.donation_link">Make a donation</a>
      </div>
    </section>

    <section
      class="project-heading section container section--support"
      v-if="project.supports &&project.supports.length > 0"
    >
      <!-- <h2 class="project-heading__title">Make a donation</h2> -->
      <!-- <p class="project-heading__subtitle">Why we need this?</p> -->
      <div class="project-heading__content supports-grid">
        <div
          v-for="(item, index) in project.supports"
          :key="'grid-'+item.category+'-'+index"
          class="grid-item"
        >
          <div class="support-title">{{item.category}}</div>
          <div class="support-category">{{item.sub_category}}</div>
        </div>
      </div>
    </section>

    <section class="project-heading section container project--information-blocks">
      <div class="project-heading__content">
        <div class="information-item">
          <img
            :src="$settings.images_path.projects +'m_'+project.mission_image"
            v-if="project.mission_image != null"
          />
          <h3>Our Mission</h3>
          <p>{{project.mission}}</p>
        </div>
        <div class="information-item">
          <img
            :src="$settings.images_path.projects +'m_'+project.audience_image"
            v-if="project.audience_image != null"
          />
          <h3>Our audience</h3>
          <p>{{project.audience}}</p>
        </div>
        <div class="information-item">
          <img
            :src="$settings.images_path.projects +'m_'+project.vision_image"
            v-if="project.vision_image != null"
          />
          <h3>Our vision</h3>
          <p>{{project.vision}}</p>
        </div>
      </div>
    </section>

    <section class="project-heading section container">
      <h2 class="project-heading__title">How we're creating POSITIVE change</h2>
      <div class="project-heading__content">
        <p>{{project.steps ? project.steps.length : ''}} {{project.steps && project.steps.length > 1 ? 'Steps' : 'Step'}} for change</p>
      </div>
    </section>
    <section class="project-stepts-grid section container">
      <div class="project-step" v-for="(step, index) in project.steps" :key="'step-'+index">
        <div class="project-step__top">
          <div class="project-step__counter">
            <div class="project-step__counter-number">
              <span>{{index + 1}}</span>
            </div>
          </div>
          <div class="project-step__content">
            <div class="project-step__number">step {{index + 1}}</div>
            <div class="project-step__title">{{step.description}}</div>
          </div>
        </div>
        <div class="project-step__bottom">
          <img :src="$settings.images_path.projects +'m_'+step.image" v-if="step.image != null" />
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import axios from "@/axios-auth";

import AppIcon from "@/components/AppIcon";
import Footer from "@/components/Footer.vue";
export default {
  name: "Project",
  components: {
    AppIcon,
  },
  data() {
    return {
      project: {},
    };
  },
  methods: {
    projectGoals() {
      let goals = this.project.goals.map(item => item.name);
      return goals.join(", ");
    }
  },
  mounted() {
    axios.get("/projects/" + this.$route.params.slug).then(res => {
      console.log("Project loaded", res);

      this.project = res.data.project;

        const metaPayload = {
            meta: res.data?.meta || {},
            // meta: res.data.meta,
            title: res.data.project.name
        }
        this.$store.dispatch('meta/setMeta', metaPayload);
        this.$router.currentRoute.meta.title = this.project.name;

    });
  },
};
</script>

<style lang="scss" scoped>
.project-information {
  position: relative;
  color: #fff;

  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
    z-index: 1;
  }

  .project-information__banner {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .project-information__top {
    position: relative;
    z-index: 2;
    padding-top: 2rem;
    @include margin-bottom(4rem);
  }

  .project-information__bottom {
    position: relative;
    z-index: 2;
    padding-bottom: 2rem;
    display: flex;

    @include lgMax {
      flex-direction: column;
    }
  }

  .project-information__user {
    display: flex;
  }
  .project-information__user-avatar {
    width: 45px;
    height: 45px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    margin-right: 1.2rem;
  }
  .project-information__user-content {
    text-align: center;
  }
  .project-information__user-hosted {
    font-family: "Montserrat Regular";
  }
  .project-information__user-name {
    font-family: "Montserrat SemiBold";
  }

  .project-information__column-info {
    width: 60%;
    padding-right: 30px;
    box-sizing: border-box;

    @include xlMax {
      width: 70%;
    }

    @include lgMax {
      width: 100%;
      padding-right: 0px;
    }
  }
  .project-information__title {
    font-family: "Montserrat Bold";
    @include font-size(2.5rem);
  }
  .project-information__description {
    font-family: "Montserrat Regular";
    @include font-size(1.5rem);
  }
  .project-information__location {
    font-family: "Montserrat Regular";
    @include font-size(1.2rem);
  }
  .project-information__buttons {
    display: flex;
    margin-left: -15px;
    margin-right: -15px;
    padding-top: 30px;
    flex-wrap: wrap;

    a {
      text-decoration: none;
      background-color: rgba(125, 132, 148, 1);
      color: #fff;
      padding: 6px 14px;
      margin-left: 15px;
      margin-right: 15px;
      margin-bottom: 15px;
      text-transform: uppercase;
      display: inline-block;
      font-family: "Montserrat SemiBold";
      transition: background-color 0.4s;

      @include font-size(1rem);

      &.primary {
        background-color: rgba(229, 213, 9, 0.8);

        &:hover {
          background-color: rgba(229, 213, 9, 1);
        }
      }

      &:hover {
        background-color: rgba(125, 132, 148, 0.8);
      }
    }
  }
  .project-information__column-additional {
    width: 250px;
    margin-left: auto;
    padding-left: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    @include lgMax {
      width: 100%;
      padding-left: 0px;
      margin-top: 30px;
    }
  }
  .project-information__additional-block {
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 30px;
    }
  }

  .project-information__additional-block {
    font-family: "Montserrat Regular";
  }

  .project-information__additional-block-title {
    text-transform: uppercase;
    font-family: "Montserrat Regular";
    letter-spacing: 4px;
  }

  .project-information__additional-share {
    padding-top: 15px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(5, 1fr);
    max-width: 320px;
  }
}
.section {
  @include margin-top(2.5rem);
  @include margin-bottom(2.5rem);
}
.project-heading {
  .project-heading__title {
    font-family: "Montserrat Bold";
    @include font-size(2rem);
    display: flex;
    align-items: center;
    margin-top: 0px;
    margin-bottom: 0.5rem;
  }

  .project-heading__subtitle {
    font-family: "Montserrat SemiBold";
    @include font-size(1.3rem);
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .project-heading__content {
    font-family: "Montserrat Regular";
    opacity: 0.8;
    @include font-size(1rem);
    @include xl {
      max-width: 50%;
    }
  }

  .project-heading__button a {
    text-decoration: none;
    background-color: rgba(125, 132, 148, 1);
    color: #fff;
    padding: 6px 14px;
    text-transform: uppercase;
    display: inline-block;
    font-family: "Montserrat SemiBold";
    transition: background-color 0.4s;

    @include font-size(0.8rem);

    &:hover {
      background-color: rgba(125, 132, 148, 0.8);
    }
  }
}
.project-stepts-grid {
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(3, 1fr);

  @include lgMax {
    grid-template-columns: repeat(2, 1fr);
  }

  @include mdMax {
    grid-template-columns: repeat(1, 1fr);
  }
}
.project-step {
  display: flex;
  flex-direction: column;
  .project-step__top {
    @include margin-bottom(1.5rem);
    display: flex;
  }
  .project-step__counter {
    width: 70px;
    margin-right: 32px;
    display: flex;
    justify-content: center;
    padding-left: 5px;
    padding-top: 32px;
    box-sizing: border-box;

    .project-step__counter-number {
      border-radius: 50%;
      background-color: #7d8494;
      width: 50px;
      height: 50px;
      position: relative;
      padding: 8px;
      box-sizing: border-box;

      &::before {
        content: "";
        display: block;
        width: calc(100% + 8px);
        height: calc(100% + 8px);
        border-radius: 50%;
        position: absolute;
        border: 1px dotted #7d8494;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      span {
        font-family: "Montserrat Bold";
        @include font-size(1.5rem);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
      }
    }
  }

  .project-step__number {
    font-family: "Montserrat Regular";
    line-height: 1;
    color: #121212;
    text-transform: uppercase;
    @include font-size(1rem);
    @include margin-bottom(1rem);
  }
  .project-step__title {
    font-family: "Montserrat SemiBold";
    @include font-size(1.1rem);
    display: flex;
    align-items: center;
  }
  .project-step__bottom {
    height: 0px;
    padding-bottom: 56.25%;
    position: relative;
    overflow: hidden;
    margin-top: auto;

    img {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: contain;
    }
  }
}

.section--support {
  margin: 0px auto;
}

.supports-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 100% !important;
  grid-gap: 1px;

  .grid-item {
    border: 1px solid #e0e2e7;
    margin: -1px;
    padding: 60px 40px;

    &:nth-child(4n + 1) {
      border-left: 0px;
    }
    &:nth-child(4n + 4) {
      border-right: 0px;
    }
  }

  .support-title {
    font-family: "Montserrat SemiBold", sans-serif;
    @include font-size(1.5rem);
  }
  .support-category {
    font-family: "Montserrat Regular", sans-serif;
    @include font-size(1rem);
  }
}

.project--information-blocks {
  .project-heading__content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    max-width: 100%;

    .information-item {
      padding: 60px 40px;
      position: relative;

      &::before {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
        content: "";
        opacity: 0.4;
        background-color: #000;
        z-index: 2;
      }

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
        object-fit: cover;
        object-position: contain;
      }

      h3 {
        position: relative;
        color: #fff;
        z-index: 3;
      }
      p {
        position: relative;
        color: #fff;
        z-index: 3;
      }

      &:nth-child(1) {
        background-color: #ececec;
      }
      &:nth-child(2) {
        background-color: #dcdcdc;
      }
      &:nth-child(3) {
        background-color: #cfcece;
      }
    }
  }
}
</style>