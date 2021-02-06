<template>
  <div>
    <div class="container">
      <banner color="#4C9F38" background="/img/homepage/banner-goals.jpg">
        <template v-slot:logo>
          <img src="/img/un-goals-white.png" style="width: 200px" />
        </template>

        <template v-slot:title>Stronger together</template>
        <template
          v-slot:content
        >The UN Goals are our North Star guiding us to reach our mission to make the world a happier, more equal and sustainable place</template>
      </banner>
    </div>

    <div class="textual-banner textual-banner--contained">
      <div class="container">
        <div class="textual-banner__title">17 GOALS TO TRANSFORM OUR WORLD</div>
        <p>The Sustainable Development Goals (SDG’s) are the blueprint for peace and prosperity for people and the planet, now and into the future. Everything we do is guided by these goals, from the events we host, content we produce to the way organisations and projects are presented to you.Click through each Goal below to uncover the latest Smiley News, Events and Charitable Projects related to that goal and learn how you can get involved.</p>
        <p>Click on each goal to learn more</p>
      </div>
    </div>

    <section class="goals-grid container" v-for="category in categories" :key="category.id">
      <div class="goals-grid__grid">
        <div class="goals-grid__item">
          <img src="/img/un-goals.png" alt="icon" />
        </div>
        <div class="goals-grid__item" v-for="goal in category.goals" :key="goal.name+goal.id">
          <router-link :to="'/goals/' + goal.slug">
            <img :src="$settings.images_path.goals + 's_' + goal.image" alt="icon" />
          </router-link>
        </div>
      </div>
    </section>

    <div class="textual-banner textual-banner--contained">
      <div class="container">
        <p>
          <a href="https://sustainabledevelopment.un.org/?menu=1300">Click here</a> to learn more about the United Nations Sustainable Development Goals
        </p>
      </div>
    </div>

  </div>
</template>

<script>
// Tools
import axios from "@/axios-auth";
// Components
import Banner from "@/components/homepage/Banner.vue";

export default {
  name: "Goals",
  components: {
    Banner,
  },
  data() {
    return {
      categories: []
    };
  },
  mounted() {
    axios
      .get("/goals")
      .then(res => {
        console.log("/goals", res.data);
        this.categories = res.data.goal_categories;
      })
      .catch(error => console.error(error));
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/blocks/homepage/_goals-grid";

.post-title {
  font-family: "Montserrat Regular";
  text-align: center;
  line-height: 1.35;
  @include font-size(1.1rem);
  padding-top: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  border: 1px solid #c7c7c7;
  background-color: #a0a0a0;
  box-sizing: border-box;
  color: #fff;

  .post-title__title {
    @include font-size(2rem);
    font-family: "Montserrat SemiBold", sans-serif;
    margin-bottom: 0px;
  }

  p {
    line-height: 1.45;
  }
}

.goals-grid {
  margin-top: 5px;
  margin-bottom: 5px;

  .goals-grid__grid {
    grid-template-columns: repeat(9, 1fr);

    @include xxlMax {
      grid-template-columns: repeat(6, 1fr);
    }
    @include lgMax {
      grid-template-columns: repeat(5, 1fr);
    }
    @include mdMax {
      grid-template-columns: repeat(4, 1fr);
    }
    @include mdMax {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .goals-grid__item {
    border: 1px solid #c7c7c7;
    line-height: 1;

    a {
      font-size: 0px;
      display: block;
    }

    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>