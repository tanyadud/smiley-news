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
                title: 'Organisations',
                meta: {
                    description: 'Discover charities and organisations tackling each of the Sustainable Development Goals. Support their cause and get involved.'
                }
            }

            this.$store.dispatch('meta/setMeta', metaPayload);
        }
    }
</script>