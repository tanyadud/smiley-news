<template>
  <section class="forgot-pass container">
    <h2 class="forgot-pass-title">Forgot my password</h2>
    <p
      class="forgot-pass-subtitle"
    >Please enter your email address in order to receive instructions on how to reset your account</p>

    <form class="forgot-pass-wrap" @submit.prevent="onSubmit">
      <label for="forgot-pass-email" style="width: 100%;">
        Email Address
        <input
          type="text"
          name="forgot-pass-email"
          id="forgot-pass-email"
          v-model="email"
          placeholder
        />
      </label>

      <div class="forgot-pass-btn-wrap">
        <button
          class="forgot-pass-btn"
          type="submit"
          name="submit"
          value="forgot-pass"
        >reset my password</button>
      </div>
    </form>
  </section>
</template>

<script>
import router from "@/router";

export default {
  name: "Forgot",
  data() {
    return {
      email: null
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.$store
        .dispatch("user/forgot", this.email)
        .then(res => {
          console.log("Reset password reset", res);
          this.$swal({ text: res.data.message });

        })
        .catch(error => {
          this.$swal({ text: error });
        });
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/scss/sections/_page-forgot";
</style>