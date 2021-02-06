<template>
  <form class="smiley-signup-form">
    <label for="signup-firstname">
      <input type="text" name="signup-firstname" id="signup-firstname" placeholder="First Name" />
    </label>

    <label for="signup-lastname">
      <input type="text" name="signup-lastname" id="signup-lastname" placeholder="Last Name" />
    </label>

    <label for="email">
      <input type="text" name="email" id="email" placeholder="Your Email" />
    </label>
    <div class="signup-btn-wrap">
      <button class="btn-signup" type="submit" name="submit" value="Sign up">Sign up</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "form_sign_up_notification",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
// TODO: Move styles to separate file
.smiley-signup-form {
  display: flex;
  flex-direction: column;
  align-items: center;

  label,
  input {
    max-width: 331px;
    width: 100%;
  }

  @include md {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;

    label {
      margin-right: 30px;

      &:last-of-type {
        margin-right: 0;
      }
    }
  }

  input {
    border: 1px solid #c7c7c7;
    box-sizing: border-box;
    border-radius: 4px;
    height: 48px;
    margin-bottom: 20px;
    text-indent: 16px;
    font: 400 16px/24px "Montserrat Regular", sans-serif;

    &:focus {
      border: 1px solid #eeb400;
      box-shadow: 0 2px 31px 13px rgba(0, 0, 0, 0.05);
      transition: 0.2s ease-in;
    }

    @include xxl {
      margin-bottom: 0;
    }

    &::placeholder {
      color: #656565;
      font: 400 16px/24px "Muli", sans-serif;
    }
  }

  .signup-btn-wrap {
    width: 100%;

    @include xl {
      max-width: 218px;
      margin: -1px 30px 0;
    }
  }

  .btn-signup {
    border: none;
    box-sizing: border-box;
    background-color: $default-orange-btns;
    border-radius: 4px;
    color: #fff;
    height: 48px;
    max-width: 218px;
    margin-bottom: -1px;
    text-transform: uppercase;
    font: 700 16px/24px "Montserrat Bold", sans-serif;
    width: 100%;
    cursor: pointer;
  }
}
</style>