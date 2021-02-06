export default {
  data() {
    return {
      screenSize: 0,
    };
  },
  mounted() {
    this.$_resizeHandler();
    window.addEventListener("resize", this.$_resizeHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.$_resizeHandler);
  },
  methods: {
    $_resizeHandler() {
      this.screenSize = window.innerWidth;
    },
  },
};
