<template>
  <section class="forgot-pass container">
    <h2 class="forgot-pass-title">Password reset</h2>
    <p class="forgot-pass-subtitle">Please enter your new password and confirm</p>

    <form class="forgot-pass-wrap" @submit.prevent="resetPassword">
      <label for="reset_pass">
        Password
        <input
          type="password"
          name="password"
          id="reset_pass"
          required
          autocomplete="new-password"
          v-model="form.password"
        />
      </label>
      <label for="reset_pass_confirm">
        Password confirm
        <input
          type="password"
          name="password_confirmation"
          id="reset_pass_confirm"
          autocomplete="new-password"
          v-model="form.passwordConfirm"
          required
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
export default {
  name: "Reset",
  data() {
    return {
      form: {
        password: null,
        passwordConfirm: null,
        token: null
      }
    };
  },
  mounted() {
    this.form.token = this.$route.query.token;
  },
  methods: {
    // TODO: check for token?
    resetPassword() {
      if (this.form.password == this.form.passwordConfirm) {
        this.$store.dispatch("user/reset", this.form).then(res => {
          console.log(res);

          this.$swal("Password changed", res.data.message, "success");
        });
      } else {
        this.$swal("Passwords don't match", "", "error");
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/scss/sections/_page-forgot";
</style>