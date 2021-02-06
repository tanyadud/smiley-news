<template>
  <div>
    <div class="container" style="max-width: 740px">
      <label>
        <span>Put your YouTube Video ID here:</span> <br>
      <input type="text" v-model="video_id">
      </label>

      <br>
      <div style="height: 0px; padding-bottom: 56.25%; width: 100%; position: relative">
      <iframe style="width: 100%; height: 100%; position: absolute; left: 0px; top: 0px; object-fit: cover;" :src="'https://www.youtube.com/embed/'+video_id" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer";

export default {
  name: "Event",
  components: {
    Footer
  },
  data() {
    return {
      video_id: 'Qn-4a2k0a4o'
    }
  }
}
</script>