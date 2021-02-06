<template>
  <section class="subscribe">
    <div class="container">
      <h3 class="subscribe__title">Subscribe to our Newsletter for the latest news!</h3>
      <form action="" class="subscribe__form" @submit="subscribe">
        <input
            class="subscribe__input"
            type="text"
            required
            placeholder="Your Name..."
            minlength="2"
            v-model.trim="name">
        <input
            class="subscribe__input"
            type="email"
            required
            placeholder="Your Email..."
            v-model.trim="email">
        <button class="subscribe__button">Subscribe</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      name: '',
      email: '',
    }
  },
  methods: {
    subscribe() {
      if (this.name && this.email) {

      } else {
        this.$swal('Fill in data');
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .subscribe {
    margin-top: 2rem;
    margin-bottom: 2rem;

    &__title {
      @include font-size(2rem);
      margin-bottom: 1.5rem;
      text-align: center
    }

    &__form {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 1.5rem;
      max-width: 1410px;
      width: 100%;
      margin: 0 auto;

      @include mdMax {
        grid-template-columns: repeat(2, 1fr);
        max-width: 540px;
      }
      @include smMax {
        grid-template-columns: 1fr;
        max-width: 420px;
      }
    }

    &__input {
      text-align: center;
      border-radius: 1rem;
      border: 1px solid #707070;
      font-size: 1rem;
      @include smMax {
        padding: 0.67rem .5rem;
      }
      @include mdMax {
        padding: 0.67rem .5rem;
      }
    }

    &__button {
      background-color: #FFE300;
      box-shadow: 0px 1px 6px #000000;
      border: none;
      border-radius: 44px;
      font-size: 1.5rem;
      line-height: 1;
      padding: 1.2rem 1rem;

      @include mdMax {
        grid-column: 1 / span 2;
        padding: .8rem 1rem;
      }
      @include smMax {
        grid-column: 1;
      }
    }
  }
</style>
