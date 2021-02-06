<template>
  <footer class="footer">
    <div class="container">
      <p class="footer__trademark">Powered by Smiley Movement. A philanthropic venture sponsored by Smiley.</p>
      <div class="footer__logos-holder">
        <router-link :to="{name: 'home'}" class="footer__link">
          <img src="/images/main/logo-smiley-1.png"/>
        </router-link>
        <router-link :to="{name: 'home'}" class="footer__link">
          <img src="/images/main/logo-smiley-2.png"/>
        </router-link>
      </div>
      <p class="footer__copyrights">All rights reserved Smiley News 2020</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
.footer {
  padding-top: 2rem;
  padding-bottom: 2rem;

  &__trademark {
    text-align: center;
    margin-bottom: 1rem;
  }

  &__logos-holder {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    img {
      width: 240px;
      height: auto;
      object-fit: contain;
    }
  }

  &__link {
    margin: 1rem;
  }

  &__copyrights {
    margin-top: 1rem;
    margin-bottom: 0px;
    text-align: center;
  }
}
</style>
