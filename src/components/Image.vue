<template>
  <img
    :src="getImageUrl()"
    :alt="alt"
    :title="title"
    :class="(classes.length > 0) ? classes.join(' ') : ''"
  />
</template>

<script>
export default {
  name: "PieceOfArt",
  methods: {
    getImageUrl(src, size) {
      // TODO - add sizes & generate src set
      let result =
        this.$settings.images_path[this.type] + this.size + "_" + this.src;
      return result;
    },
    getSrcSet() {
      // const sizes = [
      //   {s: `${$settings.images_path[this.type]}s_+${this.src} 150w`},
      //   {m: `${$settings.images_path[this.type]}m_+${this.src} 360w`},
      //   {l: `${$settings.images_path[this.type]}l_+${this.src} 1160w`},
      // ];
      // const sizes = ['s', 'm', 'l'];
      // const sizes = [
      //   "${this.$settings.images_path[this.type]}s_${this.src} 150w",
      //   "${this.$settings.images_path[this.type]}m_${this.src} 360w",
      //   "${this.$settings.images_path[this.type]}l_${this.src} 1160w"
      // ];
      // let result = sizes.join(", ");
      // let result = "test";
      // return result;
    }
  },
  mounted() {
    this.getSrcSet();
  },
  props: {
    src: {
      type: String
    },
    classes: {
      type: Array,
      default: () => []
    },
    alt: {
      type: String
    },
    title: {
      type: String
    },
    type: {
      type: String
    },
    size: {
      type: String
    }
  }
};
</script>