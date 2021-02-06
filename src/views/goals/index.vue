<template>
  <div>
    <Breadcrumbs/>
    <router-view key="$route.fullPath"></router-view>
    <Footer/>
  </div>
</template>

<script>
    import Breadcrumbs from "@/components/Breadcrumbs";
    import Footer from "@/components/Footer";

    export default {
        components: {
            Footer,
            Breadcrumbs
        },
        mounted() {
            const metaPayload = {
                title: 'UN Goals',
                meta: {
                    description: 'Explore tools and solutions to connect and learn about each of the Sustainable Development Goals.'
                }
            }

            this.$store.dispatch('meta/setMeta', metaPayload);
        }
    }
</script>