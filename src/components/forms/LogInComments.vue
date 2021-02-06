<template>
  <div class="log-in-comments" @mouseleave="mouseLeave">
    <input @mouseenter="mouseEnter" type="text" class="log-in-comments__input" placeholder="Name"/>

    <div v-if="isHovered" style="display: flex; flex-direction: column;">

      <input type="email" class="log-in-comments__input" placeholder="Email"/>
      <input type="password" class="log-in-comments__input" placeholder="Password"/>

      <div class="log-in-comments__checkbox">
        <div class="log-in-comments__checkbox__group">
          <input type="checkbox" id="first" name="first_agreement">
          <label for="first"> I agree to Smiley Movement Terms of Service</label>
        </div>

        <div class="log-in-comments__checkbox__group">
          <input type="checkbox" id="second" name="second_agreement">
          <label for="second"> I agree to Smiley Movement processing of email and IP address, and the use of cookies
            to facilitate my authentication and posting of comments explained further in the Privacy Policy</label>
        </div>

        <div class="log-in-comments__checkbox__group">
          <input type="checkbox" id="third" name="third_agreement">
          <label for="third"> I agree to additional processing of my information, including first and third party cookies, for 
            personalized content and advertising as outlined in our Data Sharing Policy</label>
        </div>

        <div class="log-in-comments__checkbox__group">
          <input type="checkbox" id="fourth" name="fourth_agreement">
          <label for="fourth"> I'd rather post as guest'</label>
        </div>
        <div class="log-in-comments__checkbox__all">
          <input type="checkbox" id="check-all" name="check-all">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogInComments',
  props: {
    isHovered: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    mouseEnter() {
      this.$emit('mouse-enter');
    },
     mouseLeave() {
      this.$emit('mouse-leave');
    },
  }
}
</script>

<style lang="scss" scoped>
.log-in-comments {
  display: flex;
  flex-direction: column;
  width: 100%;
  &__input {
    max-width: 65%;
    border-radius: 10px;
    font-size: 16px;
    padding: 10px;
    margin-top: 20px;
    &::placeholder {
      font-weight: bold;
      color: black;
    }
  }
  input[type=checkbox] {
    -ms-transform: scale(2); /* IE */
    -moz-transform: scale(2); /* FF */
    -webkit-transform: scale(2); /* Safari and Chrome */
    -o-transform: scale(2); /* Opera */
    transform: scale(2);
  }
  &__checkbox {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    &__group {
      display: flex;
      flex-direction: row;
      margin: 20px 0 5px;
      label {
        font-size: 15px;
        max-width: 80%;
        text-align: left;
        margin-left: 20px;
      }
    }
    &__all {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }
  
}
</style> 