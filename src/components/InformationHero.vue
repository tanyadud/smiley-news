<template>
  <div class="project-information">
    <img
      :src="background"
      class="project-information__banner"
      :style="{'object-position': position}"
    />

    <!-- <div class="project-information__top" v-if="isNotEmptySlot('title')">
      <div class="project-information__user">
        <slot name="avatar"></slot>
      </div>
    </div>-->
    <div class="project-information__bottom">
      <div class="project-information__column-info">
        <h1 class="project-information__title" v-if="isNotEmptySlot('title')">
          <slot name="title"></slot>
        </h1>
        <div class="project-information__description" v-if="isNotEmptySlot('content')">
          <slot name="content"></slot>
        </div>
        <!-- <div class="project-information__location">Kent, England</div> -->
        <div class="project-information__buttons" v-if="isNotEmptySlot('buttons')">
          <slot name="buttons"></slot>
        </div>
      </div>
      <div class="project-information__column-additional" v-if="isNotEmptySlot('sidebar')">
        <slot name="sidebar"></slot>
      </div>
    </div>
    <div class="project-information__additional" v-if="isNotEmptySlot('additional')">
      <slot name="additional"></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    isNotEmptySlot(slotName) {
      return !!this.$slots[slotName];
    }
  },
  props: {
    background: {
      type: String,
      default: "/img/components/information-hero.jpg"
    },
    position: {
      type: String,
      default: "center"
    }
  }
};
</script>

<style lang="scss" scoped>
.project-information {
  position: relative;
  color: #fff;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  padding-right: 15px;

  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    left: 0px;
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
    max-width: 1780px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    z-index: 2;
    padding-top: 2rem;
    flex: 1;
    width: 100%;
    @include margin-bottom(4rem);
  }

  .project-information__bottom {
    max-width: 1780px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    z-index: 2;
    padding-bottom: 2rem;
    display: flex;
    margin-top: auto;
    flex: 1;
    width: 100%;
    align-items: flex-end;

    @include lgMax {
      flex-direction: column;
    }
  }

  .project-information__user {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
  }
  .project-information__user-avatar {
    width: 45px;
    height: 45px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    margin-right: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    font-family: "Montserrat SemiBold";
    background-color: rgba(125, 132, 148, 1);
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

  .project-information__additional-block p {
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

  .project-information__additional {
    margin: 0 auto;
    max-width: 1780px;
    width: 100%;
    position: relative;
    z-index: 3;
  }
}

.user-info-grid {
  position: relative;
  z-index: 3;
}
</style>