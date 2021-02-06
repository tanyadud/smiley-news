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
                title: 'Members',
                meta: {
                    description: 'Initiatives and campaigns by members and organisations part of our network. Offer your support, lend your skills or create your own project.'
                }
            }

            this.$store.dispatch('meta/setMeta', metaPayload);
        }
    }
</script>