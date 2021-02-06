<template>
  <div>
    <router-view key="$route.fullPath"></router-view>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer";

export default {
  components: {
    Footer,
  },
  mounted() {
    const metaPayload = {
      title: "Smiley Talks",
      meta: {
        description:
          "Free live-events themed around the Sustainable Development Goals. A chance to interact with leading organisations and meet like-minded individuals.",
      },
    };

    this.$store.dispatch("meta/setMeta", metaPayload);
  },
};
</script>
