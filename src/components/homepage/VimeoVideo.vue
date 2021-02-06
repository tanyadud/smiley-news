<template>
  <div class="video">
    <div class="video__container">
      <iframe
        :src="'https://player.vimeo.com/video/'+video.video_id+'?title=0&amp;byline=0&amp;portrait=0'"
        frameborder="0"
        allow="fullscreen"
        allowfullscreen
      ></iframe>
    </div>
    <div class="video__content">
      <div class="video__title">{{video.title}}</div>
      <div class="video__subtitle">{{video.description}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Vimeo_Video_Block",
  data() {
    return {};
  },
  props: {
    video: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/blocks/homepage/_video-block";
</style>