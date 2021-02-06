<template>
  <div>
    <section class="textual-content">
      <div class="textual-content-title">
        <div class="container">
          <h2>Welcome to Smiley Movement (CIC)!</h2>
        </div>
      </div>
      <div class="textual-content-description">
        <div class="container">
          <p>We are a non-profit organisation sponsored by the original Smiley Company.</p>
          <p>Our mission and ethos is to inspire optimism, promote the United Nations stainable Development Goals and bring about positive action to solve the biggest issues of our time!</p>
          <p>These include gender inequality, climate change and poverty. And, of course, our goal is to also bring about real smiles wherever we go!</p>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  components: {
    Footer
  }
};
</script>

<style lang="scss">
@import "@/scss/sections/_text-page";
</style>