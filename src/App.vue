<template>
  <div id="app">
    <Header />
    <router-view :key="$route.fullPath" />
    <tooltip />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "home",
  components: {
    Header,
    Footer,
  },
  computed: {
    appMeta() {
      return this.$store.getters["meta/getMeta"];
    },
    appTitle() {
      return this.$store.getters["meta/getTitle"];
    },
  },
  watch: {
    $route(to, from) {
      document.title =
        to.meta.title + " | Smiley Movement" || "Smiley Movement";
      this.$store.dispatch("meta/clearMeta");
    },
  },
  methods: {},
  created() {},
  metaInfo: function() {
    // TODO: Refactor
    let metaArray = [];
    if (this.appMeta != null) {
      metaArray = [
        { name: "title", content: this.appMeta?.title || this.appTitle },
        { name: "description", content: this.appMeta?.description },
        { property: "og:locale", content: "en_US" },
        { property: "og:title", content: this.appMeta?.title || this.appTitle },
        { property: "og:site_property", content: "SmileyMovement" },
        { property: "og:description", content: this.appMeta?.description },
        {
          property: "og:url",
          content: process.env.VUE_APP_DOMAIN + this.$route.path,
        },
        {
          property: "fb:app_id",
          content: this.appMeta?.facebook_app_id || 486208715194516,
        },
        {
          property: "og:image",
          content: this.appMeta?.image || "/img/smiley_default.png",
        },
        {
          property: "og:image:width",
          content: this.appMeta?.image_width || 1200,
        },
        {
          property: "og:image:height",
          content: this.appMeta?.image_height || 628,
        },

        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: this.appMeta?.title || this.appTitle,
        },
        { name: "twitter:description", content: this.appMeta?.description },
        {
          name: "twitter:site",
          content: this.appMeta?.twitter_user || "@Smiley_Movement",
        },
        {
          name: "twitter:creator",
          content: this.appMeta?.twitter_user || "@Smiley_Movement",
        },
      ];
    } else {
      metaArray = [];
    }
    return {
      title: this.appTitle,
      titleTemplate: "%s | SmileyMovement",
      meta: metaArray,
    };
  },
};
</script>

<style lang="scss">
/* Utils */
.social {
  display: flex;
  align-items: center;
  padding: 0px;
  margin: 0px;
  list-style-type: none;

  li {
    margin-left: .5rem;
    margin-right: .5rem;

    &:first-child {
      margin-left: 0px;
    }

    &:last-child {
      margin-right: 0px;
    }
  }

  &__icon {
    border-radius: 50%;
    overflow: hidden;
    display: block;
  }
}
#app {
}


#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

::placeholder {
  color: #666;
}

//::selection {
//  color: #fff;
//}

a:hover {
  text-decoration: none;
}

.invisible {
  visibility: hidden;
}

.visible {
  visibility: visible;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

body {
  font-size: 16px;
  min-width: 320px;
  position: relative;
  line-height: 1.65;
  // overflow-x: hidden;
  margin: 0;

  input,
  textarea {
    border: #666 1px solid;
    outline: none;

    &:focus:required:invalid {
      border-color: red;
    }

    &:required:valid {
      border-color: green;
    }
  }

  &.mobile-menu--opened {
    position: fixed !important;
    overflow: hidden !important;
    width: 100% !important;
    height: 100vh !important;
  }
}

.img-responsive {
  display: block;
  max-width: 100%;
  height: auto;

  &.img-width {
    width: 100%;
  }
}

.text-center {
  text-align: center;
}

b,
strong {
  font-weight: bold;
}

.smiley-img-wrap {
  overflow: hidden;

  .smiley-img {
    width: 100%;
    height: 100%;
    transition: all 0.8s;

    img {
      display: block;
      object-fit: cover;
      height: 100%;
    }

    &:hover {
      opacity: 1;
      -webkit-animation: flash 1.5s;
      animation: flash 1.5s;
      transform: scale(1.1);
    }
  }
}

.container {
  max-width: 1630px;
  margin: 0 auto;
  // padding: 0 15px;
  padding-left: 15px;
  padding-right: 15px;

  @media (max-width: 1600px) {
    // padding: 0 20px;
  }
}
</style>
