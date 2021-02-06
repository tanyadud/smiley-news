<template>
  <div>
    <information-hero background="/img/homepage/banner-organisations.jpg">
      <template v-slot:title>Connect with organisations</template>
      <template v-slot:content>
        <p>See what projects organisations are running and how you can help</p>
      </template>
      <template v-slot:buttons>
        <a target="_blank" href="www.smiley.com">We are supported 100% by the Smiley brand</a>
      </template>
    </information-hero>
    <div class>
      <div class="container">
        <div style="height: 75px;"></div>
        <section class="organisations-grid">
          <div
            class="organisation-item"
            v-for="organisation in organisations"
            :key="organisation.slug+'-org-archive'"
          >
            <div class="organisation-item__logo">
              <router-link :to="'/organisation/' + organisation.slug">
                <img
                  v-if="organisation.logo != null"
                  :src="$settings.images_path.organisations + 's_' + organisation.logo"
                  alt
                  title
                  class="organisation-item__image"
                />
                <img v-else src="/img/group.svg" />
              </router-link>
            </div>
            <h2 class="organisation-item__title">
              <router-link :to="'/organisation/' + organisation.slug">{{ organisation.name }}</router-link>
            </h2>
            <p class="organisation-item__description">{{ organisation.description }}</p>
          </div>
        </section>
      </div>
    </div>
    <div class="container">
      <div class="smiley-pagination" v-if="pages_count > 1">
        <br />
        <paginate
          :page-count="pages_count"
          :click-handler="loadPageNumb"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :prev-class="'smiley-pagination-back'"
          :next-class="'smiley-pagination-next'"
          :container-class="'app-pagination'"
        >
          <span slot="breakViewContent">...</span>
        </paginate>
        <br />
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import axios from "@/axios-auth";

import Breadcrumbs from "@/components/Breadcrumbs";
import InformationHero from "@/components/InformationHero.vue";
import Footer from "@/components/Footer";

export default {
  data() {
    return {
      organisations: [],
      pages_count: 0
    };
  },
  methods: {
    loadPageNumb(pageNumb) {
      axios
        .get("/organisations?page=" + pageNumb)
        .then(res => {
          this.organisations = res.data.organisations;
          this.pages_count = res.data.pages_count;
        })
        .catch(error => console.log(error));
    }
  },
  mounted() {
    axios
      .get("/organisations")
      .then(res => {
        console.log("Organisations", res);

        this.organisations = res.data.organisations;
        this.pages_count = res.data.pages_count;
        // this.post = res.data.post;
        // this.related_posts = res.data.related;
      })
      .catch(error => console.log(error));
  },
  components: {
    Breadcrumbs,
    InformationHero,
    Footer
  }
};
</script>

<style lang="scss">
.bg {
  background-image: url("/img/register-bg.jpg");
  background-size: cover;
  padding-top: 24px;
}

.organisations-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  margin: 0px -16px;
  padding-top: 48px;

  @include xxlMax {
    grid-template-columns: repeat(3, 1fr);
  }
  @include xlMax {
    grid-template-columns: repeat(2, 1fr);
  }
  @include smMax {
    grid-template-columns: repeat(1, 1fr);
  }
}

.organisation-item {
  margin: 16px 16px 96px 16px;
  padding: 64px 20px 10px 20px;
  border: 1px solid #c7c7c7;
  border-radius: 4px;
  text-align: center;
  box-sizing: border-box;
  position: relative;
  background-color: #fff;

  &__logo {
    border-radius: 50%;
    background: #c7c7c7;
    width: 128px;
    height: 128px;
    // margin: -70px auto 0px auto;
    position: absolute;
    left: 50%;
    top: 0px;
    overflow: hidden;
    transform: translate(-50%, -50%);
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.4s;
  }

  &:hover {
    .organisation-item__image {
      transform: scale(1.1);
    }
  }

  &__title {
    font: 700 22px/28px "Montserrat Bold", sans-serif;

    a {
      color: unset;
      text-decoration: none;
    }
  }

  &__description {
    font: 400 16px/24px "Muli", sans-serif;
  }
}
</style>
