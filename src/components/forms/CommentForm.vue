<template>
  <form class="comment-form" @submit.prevent="comment">
    <input :placeholder="placeholder" required minlength="10" v-model="text" />
    <button type="submit">
      <i class="fa fa-plus"></i>
    </button>
  </form>
</template>

<script>
import axios from "@/axios-auth";
export default {
  name: "CommentForm",
  data() {
    return {
      text: null
    };
  },
  props: {
    is_reply: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: "Add reply"
    },
    post_to: {
      type: String,
      default: null
    }
  },
  methods: {
    comment() {
      axios
        .post(this.post_to, { text: this.text })
        .then(res => {
          console.log("Comment posted", res);
        })
        .catch(error => console.error("Error whle posting comment"));
    }
  }
};
</script>

<style lang="scss" scoped>
.comment-form {
  display: flex;
  width: calc(100% - 5px);
  max-width: 768px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  border: 1px solid #e5e5e5;

  input {
    border: none;
    flex: 1;
    padding: 10px 15px;
  }

  button {
    -webkit-appearance: none !important;
    border: none;
    background-color: #fff;
    border-left: 1px solid #e5e5e5;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    padding: 5px 15px;

    &::before {
      content: "";
      background-color: #000;
      position: absolute;
      left: 0px;
      width: 100%;
      height: 100%;
      top: 100%;
      transition: top 0.2s;
    }

    i {
      position: relative;
      z-index: 2;
      transition: color 0.2s;
    }

    &:hover {
      &::before {
        top: 0px;
      }

      i {
        color: #fff;
      }
    }
  }
}
</style>