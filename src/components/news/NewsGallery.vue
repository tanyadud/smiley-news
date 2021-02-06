<template>
  <fragment>
    <ButtonArrow
      :id="'news-gallery-button-prev-' + id"
      class="news-gallery-button news-gallery-button-prev"
    />
    <Swiper class="news-gallery" :key="key" :options="options">
      <SwiperSlide v-for="article in news" :key="article.slug">
        <NewsCard class="news-gallery__card" :article="article" />
      </SwiperSlide>
    </Swiper>
    <ButtonArrow
      :id="'news-gallery-button-next-' + id"
      class="news-gallery-button news-gallery-button-next"
    />
  </fragment>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { VSearch } from "@/components/app";
import { ButtonArrow } from "@/components/buttons";
import NewsCard from "@/components/cards/NewsCard.vue";

export default {
  name: "NewsGallery",
  props: {
    news: {
      type: Array,
      required: true,
    },
  },
  components: {
    NewsCard,
    ButtonArrow,
  },
  data() {
    return {
      id: 0,
      key: 0,
      options: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 25,
        loop: true,
        loopFillGroupWithBlank: true,
        navigation: {
          nextEl: "",
          prevEl: "",
        },
        breakpoints: {
          900: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1440: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        },
      },
    };
  },
  created() {
    this.id = this._uid;
    this.options.navigation = {
      nextEl: `#news-gallery-button-next-${this.id}`,
      prevEl: `#news-gallery-button-prev-${this.id}`,
    };
  },
};
</script>

<style lang="scss" scoped>
.news-gallery {
  padding: 10px;
}

.news-gallery-button {
  position: absolute;
  cursor: pointer;
  z-index: 5;
  top: 400px;
}

.news-gallery-button-prev {
  @include custom-max-width(1600px) {
    left: 0;
    top: 300px;
    opacity: 0.8;
  }

  left: -80px;
}

.news-gallery-button-next {
  @include custom-max-width(1600px) {
    right: 0;
    top: 300px;
    opacity: 0.8;
  }

  right: -80px;
  transform: rotate(180deg);
}
</style>
