<template>
  <div>
    <h1>Testing Test {{seoTitle}}</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
</template>

<script>
    export default {
        name: 'MetaTest',
        data() {
            return {
                seo: {
                    title: null,
                    description: null,
                    image: null,
                    imageHeight: null,
                    imageWidth: null
                }
            }
        },
        computed: {
            seoTitle() {
                return  this.seo;
            }
        },
        created() {
            this.seo.title = 'testing';
        },
        metaInfo() {
            return {
                title: 'Default Title',
                meta: [
                    {name: "og:locale", content: 'en_US'},
                    {name: "og:title", content: this.seoTitle.title},
                    {name: "og:site_name", content: "SmileyMovement"},
                    {name: "og:description", content: this.seoTitle.description},
                    {name: "og:url", content: process.env.VUE_APP_DOMAIN + this.$route.path},

                    {name: "og:image", content: this.seoTitle.image},
                    {name: "og:image:width", content: this.seoTitle.imageWidth},
                    {name: "og:image:height", content: this.seoTitle.imageHeight},

                    {name: "twitter:card", content:"summary"},
                    {name: "twitter:site", content:"@Smiley_Movement"},
                    {name: "twitter:creator", content:"@Smiley_Movement"},
                ]
            }
        }
    }
</script>