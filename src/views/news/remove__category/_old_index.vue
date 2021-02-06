<template>
  <div>
    <Breadcrumbs />
    <router-view key="$route.fullPath"></router-view>
    <Footer />
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

export default {
  components: {
    Footer,
    Breadcrumbs,
  },
  mounted() {
    const metaPayload = {
      title: "Smiley News",
      meta: {
        description:
          "Daily positive news about charities, organisations and everyday heroes making the world a better place.",
      },
    };
    this.$store.dispatch("meta/setMeta", metaPayload);
  },
};
</script>
