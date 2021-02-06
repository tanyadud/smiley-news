<template>
  <div class="container">
    <div class="holder-404">
      <div class="holder-404__chars">404</div>
      <h2 class="holder-404__title">Sorry, looks like this page doesn't exist anymore</h2>
      <!-- <p class="holder-404__content">Not so long text</p> -->

      <router-link :to="{name: 'home'}">
        <button class="holder-404__button">Go to homepage</button>
      </router-link>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  data() {
    return {};
  },
  components: {
    Footer
  }
};
</script>

<style lang="scss">
.holder-404 {
  padding-bottom: 48px;
  text-align: center;

  &__chars {
    font-family: "Montserrat Bold", sans-serif;
    font-weight: bold;
    font-size: 96px;
    line-height: 1.5;

    @include smMax {
      img {
        display: none;
      }
    }
  }

  &__title {
    font: 700 32px/48px "Montserrat Bold", sans-serif;
  }

  &__content {
    max-width: 640px;
    margin: 0px auto 36px auto;
    font: 400 22px/36px "Muli", sans-serif;
  }

  &__button {
    background-color: #eeb400;
    border-radius: 4px;
    border: none;
    padding: 15px 25px;
    max-width: 240px;
    width: 100%;
    text-transform: uppercase;
    font: 700 16px/24px "Montserrat Bold", sans-serif;
    transition: background-color 0.4s;
    cursor: pointer;

    &:hover {
      background-color: darken(#eeb400, 5%);
    }
  }
}
</style>