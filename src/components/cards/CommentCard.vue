<template>
  <div class="comment">
    <div class="comment__avatar">
      <router-link to="/">
        <img
          :src="$settings.images_path.users + 'm_'+ comment.user.avatar"
          v-if="comment.user.avatar != null"
        />
        <div v-else>{{comment.user.initials}}</div>
      </router-link>
    </div>
    <div class="comment__info">
      <div class="comment__meta">
        <router-link to="/" class="comment__username">{{comment.user.name}}</router-link>
        <div class="comment__date">{{dateAgo(comment.date)}}</div>
        <!-- <div class="comment__settings">
          <button class="activator">
            <i class="fa fa-ellipsis-h"></i>
          </button>
        </div>-->
      </div>
      <div class="comment__text">{{comment.text}}</div>
      <div class="comment__actions">
        <button class="comment__actions-like" @click.prevent="like">
          <span class="likes-count">0</span>
          <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
          <span class="button-text">Like</span>
        </button>
        <button
          class="comment__actions-report"
          v-if="!is_reply"
          @click.prevent="toggleReplies = !toggleReplies"
        >
          <i class="fa fa-mail-reply" aria-hidden="true"></i>
          <template v-if="comment.replies.length > 0">
            <span class="button-text">Replies ({{comment.replies.length}})</span>
          </template>
          <template v-else>
            <span class="button-text">Reply</span>
          </template>
          <!-- TODO: Show replies number if they exist -->
        </button>
        <button class="comment__actions-report" @click.prevent="report">
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
          <span class="button-text">Report</span>
        </button>
        <button class="comment__actions-report">
          <i class="fa fa-edit" aria-hidden="true"></i>
          <span class="button-text">Edit</span>
        </button>
        <button class="comment__actions-report">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
          <span class="button-text">Delete</span>
        </button>
      </div>
      <transition
        name="accordion"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:before-leave="beforeLeave"
        v-on:leave="leave"
      >
        <div class="comment__replies" v-show="toggleReplies">
          <slot name="replies"></slot>
          <comment-form
            v-if="!is_reply"
            :is_reply="true"
            :post_to="'/news/' + this.$route.params.slug + '/comments/' + comment.id"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import CommentForm from "@/components/forms/CommentForm";

export default {
  name: "CommentCard",
  components: {
    CommentForm
  },
  data() {
    return {
      showSettings: false,
      toggleReplies: false
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters["user/isAuthenticated"];
    }
  },
  props: {
    is_reply: {
      type: Boolean,
      default: false
    },
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    like() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: toast => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: "success",
        title: "You've liked this article"
      });
    },
    report() {
      this.$swal
        .fire({
          title: "Report Spam or Abuse",
          text:
            "If you come across content that is discriminatory, derogatory or in violation of our Terms of Service, let us know",
          input: "textarea",
          inputAttributes: {
            autocapitalize: "off",
            placeholder: "Tell us why"
          },
          showCancelButton: true,
          confirmButtonText: "report",
          showLoaderOnConfirm: true
        })
        .then(result => {
          if (result.value) {
            console.log(result.value);
          }
        });
    },
    delete() {},
    edit() {},
    dateAgo(date) {
      const currentStamp = Date.now();
      const realDate = this.$dayjs(date);
      const postStamp = this.$dayjs(date).unix() * 1000;
      const dateDiff = currentStamp - postStamp;
      const days = dateDiff / (1000 * 3600 * 24);

      const result = Math.floor(days);

      const append = result == 1 ? "day" : "days";

      let time = "";

      if (result == 0) {
        time = "Today";
      } else if (result < 28) {
        time = result + " " + append + " ago";
      } else {
        const month = realDate.date();
        const day = realDate.month() + 1;
        const year = realDate.year();
        time = day + "-" + month + "-" + year;
      }

      return time;
    },
    // Height
    beforeEnter: function(el) {
      el.style.height = "0";
    },
    enter: function(el) {
      el.style.height = el.scrollHeight + "px";
    },
    beforeLeave: function(el) {
      el.style.height = el.scrollHeight + "px";
    },
    leave: function(el) {
      el.style.height = "0";
    }
  }
};
</script>

<style lang="scss" scoped>
.comment {
  display: grid;
  grid-template-columns: 54px auto;
  grid-gap: 20px;
  margin-bottom: 20px;

  .comment__avatar {
    a {
      border-radius: 50%;
      width: 54px;
      height: 54px;
      overflow: hidden;
      line-height: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 5px auto 14px auto;
      background-color: #e5e9f0;
      text-decoration: none;
      color: #393939;
      font-family: "Montserrat Bold", sans-serif;
      @include font-size(1.6rem);
      letter-spacing: 2px;
      position: relative;
      border: 1px solid #e5e5e5;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }

      div {
        background-color: #e5e5e5;
        width: 100%;
        height: 100%;
        border: 2px solid #e5e5e5;
        padding: 15px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        text-align: center;
        @include font-size(0.8rem);

        &::before {
          content: "";
          display: block;
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0px;
          top: 0px;
          border-radius: 50%;
          border: 5px solid #fff;
        }
      }
    }
  }
  .comment__info {
  }
  .comment__meta {
    display: flex;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }
  .comment__username {
    font-family: "Montserrat SemiBold", sans-serif;
    color: #393939;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
    margin-right: 20px;

    &:hover {
      border-color: #393939;
    }
  }
  .comment__date {
    color: rgba(57, 57, 57, 0.7);
    margin-right: 20px;

    @include smMax {
      order: 3;
      width: 100%;
    }
  }
  .comment__settings {
    button.activator {
      -webkit-appearance: none !important;
      -webkit-border-radius: 0 !important;
      border: none;
      line-height: 1;
      cursor: pointer;
      line-height: 1;
    }
  }
  .comment__text {
  }
  .comment__actions {
    margin-top: 12px;

    button {
      -webkit-appearance: none !important;
      -webkit-border-radius: 0 !important;
      border: none;
      line-height: 1;
      cursor: pointer;
      line-height: 1;
      position: relative;
      overflow: hidden;
      padding: 5px 5px;

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

      &:not(:last-child) {
        margin-right: 6px;
      }

      div,
      span,
      i {
        position: relative;
        z-index: 2;
      }

      i {
        transition: color 0.2s;
      }

      &:hover {
        color: #fff;

        &::before {
          top: 0px;
        }
      }

      .button-text {
        margin-left: 12px;
        @include smMax {
          display: none;
        }
      }

      .likes-count {
        margin-right: 12px;
      }
    }
  }

  .comment__replies {
    margin-top: 20px;
    border-left: 1px solid #393939;
    padding-left: 20px;
    padding-bottom: 10px;

    overflow: hidden;
    transition: 150ms ease-out;

    @include smMax {
      margin-left: -73px;
    }
  }
}

// body::v-deep .swal2-title {
//   @include font-size(1.5rem);
// }

//
// * {
//   will-change: height;
//   transform: translateZ(0);
//   backface-visibility: hidden;
//   perspective: 1000px;
// }

// .expand-enter-active,
// .expand-leave-active {
//   transition: height 1s ease-in-out;
//   overflow: hidden;
// }

// .expand-enter,
// .expand-leave-to {
//   height: 0;
// }
</style>