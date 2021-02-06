<template>
  <div>
    <breadcrumbs/>
    <information-hero background="/img/backgrounds/partners.jpg">
      <template v-slot:title>Our Partners</template>
      <template v-slot:content>
        <p>Working together to help build and support build resilient communities</p>
      </template>
    </information-hero>
    <section class="partners">
      <div class="partners__together">
        <div class="container">
          <h1>Event Partners</h1>
          <div class="partners opened">
            <a
                class="partner"
                :href="(partner.website != null) ? partner.website : '/#'"
                target="_blank"
                v-for="partner in partners"
                :key="partner.id"
            >
              <div class="special-w"></div>

              <div class="partner__logo">
                <img :src="$settings.images_path.partners + 'm_' + partner.image"/>
              </div>
              <!-- <div class="partner__name">{{partner.name}}</div> -->
            </a>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <div class="smiley-pagination">
        <paginate
            :page-count="totalPages"
            :click-handler="goToPage"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :prev-class="'smiley-pagination-back'"
            :next-class="'smiley-pagination-next'"
            :container-class="'app-pagination'"
        >
          <span slot="breakViewContent">...</span>
        </paginate>
      </div>

      <br/>
      <br/>
      <div class="partners__main partners__main--contact">
        <div class="container">
          <div class="content-w">
            <div class="main__content">
              <h1>Let’s Work Together</h1>

              <div class="main__text">
                <p>Interested in making a difference? Get in touch to find out how to partner with Smiley Movement</p>
              </div>

              <a class="cta cta--solid-yellow" href="/contact">CONTACT US</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer/>
  </div>
</template>

<script>
    import axios from "@/axios-auth";

    import Breadcrumbs from "@/components/Breadcrumbs";

    import InformationHero from "@/components/InformationHero.vue";
    import Footer from "@/components/Footer";

    export default {
        name: "Partners",
        components: {
            Breadcrumbs,
            InformationHero,
            Footer
        },
        data() {
            return {
                partners: [],
                totalPages: 0
            };
        },
        mounted() {
            console.log("partners loaded");
            axios
                .get("/partners")
                .then(res => {
                    console.log("Partners", res);
                    this.partners = res.data.partners;
                    this.totalPages = res.data.pages_count;

                    const metaPayload = {
                        meta: {},
                        title: 'Partners'
                    }

                    metaPayload.meta.description = 'Leaders who support our vision and whose work contributes to the Sustainable Development Goals. Together we co-host events and facilitate support.';
                    this.$store.dispatch('meta/setMeta', metaPayload);
                })
                .catch(error => console.log(error));
        },
        methods: {
            goToPage(pageNumb) {
                axios
                    .get("/partners?page=" + pageNumb)
                    .then(res => {
                        this.partners = res.data.partners;
                        this.totalPages = res.data.pages_count;
                        window.scrollTo(0, 0);
                    })
                    .catch(error => console.log(error));
            }
        }
    };
</script>


<style lang="scss" scoped>
  @import "@/scss/sections/_partners";
</style>