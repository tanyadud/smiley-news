<template>
  <div>
  <Breadcrumbs/>

    <div class="textual-banner textual-banner--contained">
      <div class="container">
        <p>We connect people, projects & resources to help good causes go further, faster.</p>
      </div>
    </div>
    <div class="container">
      <banner color="#4696D2">
        <template v-slot:name>Network</template>
        <template v-slot:title>MATCHMAKER FOR GOOD &trade;</template>
        <template v-slot:content>Connect with changemakers and get inspired to take positive action</template>
      </banner>

      <div class="network-diagram">
        <img src="/img/network-image.png" alt="Workplace"/>
        <router-link :to="{name: 'organisations'}" class="diagram-link diagram-link--organisations"></router-link>
        <router-link :to="{name: 'users'}" class="diagram-link diagram-link--users"></router-link>
        <router-link :to="{name: 'partners'}" class="diagram-link diagram-link--partners"></router-link>
        <router-link :to="{name: 'projects'}" class="diagram-link diagram-link--projects"></router-link>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
    import Breadcrumbs from "@/components/Breadcrumbs";
    import Banner from "@/components/homepage/Banner";
    import Footer from "@/components/Footer";

    export default {
        components: {
            Breadcrumbs,
            Banner,
            Footer
        },
        mounted() {
            const metaPayload = {
                title: 'Smiley Network',
                meta: {
                    description: ''
                }
            }

            this.$store.dispatch('meta/setMeta', metaPayload);
        }
    };
</script>

<style lang="scss" scoped>
  .network-diagram {
    width: 100%;
    height: auto;
    position: relative;

    img {
      max-width: 100%;
    }

    .diagram-link {
      width: 20%;
      height: 18%;
      // background-color: red;
      display: block;
      position: absolute;

      &--organisations {
        top: 38%;
        left: 2%;
      }

      &--users {
        top: 55%;
        left: 27.5%;
      }

      &--partners {
        top: 55%;
        right: 27.5%;
      }

      &--projects {
        top: 38%;
        right: 2%;
      }
    }
  }
</style>