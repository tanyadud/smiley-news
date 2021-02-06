<template>
  <div class="event">
    <div class="event__image">
      <MediaImage
        :src="event.cover_image"
        :alt="event.title"
        :title="event.title"
        size="m"
        type="events"
      />
      <div
        class="event-category"
        @mouseenter="showDescription = true"
        @mouseleave="showDescription = false"
      >
        <span class="event-category__name" v-if="manualGoal == null">
          {{
            event.goals != null && event.goals.length > 0
              ? event.goals[0].name
              : ""
          }}
        </span>
        <span class="event-category__name" v-else>{{ manualGoal }}</span>
        <transition name="fade">
          <span v-if="showDescription" class="event-category__description"
            >UN Goal 01</span
          >
        </transition>
      </div>
    </div>

    <div class="event__content">
      <h3 class="event__content-title">
        {{ event.title }}
      </h3>
      <div class="event__content-description">
        {{ cutText(event.short_description, 90) }}
      </div>
      <div class="event__content-metadata">
        <span>{{ event.location }}</span> |
        {{ dateAgo(event.published_at) }}
      </div>
    </div>

    <div class="event__readmore">
      <VButton
        class="event__button"
        @click.native.prevent="openPage"
        shape="round"
      >
        <router-link
          class="event__button-link"
          :to="{ name: 'event', params: { slug: event.slug } }"
          >{{ buttonName }}</router-link
        >
      </VButton>
    </div>
  </div>
</template>

<script>
import axios from "@/axios-auth";
import router from "@/router";

import MediaImage from "@/components/Image.vue";
import { VButton } from "@/components/app";

export default {
  name: "EventCard",
  props: {
    event: {
      type: Object,
    },
    active: {
      type: Boolean,
      default: true,
    },
    buttonName: {
      type: String,
      default: "Button Name",
    },
    manualGoal: {
      default: null,
    },
  },
  data() {
    return {
      showDescription: false,
    };
  },
  components: {
    MediaImage,
    VButton,
  },
  filters: {
    trimDescription(description) {
      return description.length > 120
        ? description.substring(0, 120) + "..."
        : description;
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
    },
  },
  methods: {
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
    attend() {
      axios
        .post("/events/" + this.event.slug + "/attend")
        .then((res) => {
          this.$swal("You are now attending this event");
          this.$emit("reload_events");
        })
        .catch((error) => console.error(error));
    },
    unattend() {
      axios
        .post("/events/" + this.event.slug + "/attend/cancel")
        .then((res) => {
          this.$swal("You are now not attending this event");
          this.$emit("reload_events");
        })
        .catch((error) => console.error(error));
    },
    attendNotAuthed() {
      let swal = {
        title: "Register or Login",
        text:
          "To register for an event you will need to login or create an account",
        showCancelButton: true,
        confirmButtonText: "Create Account",
        cancelButtonText: "Login",
      };
      this.$swal(swal).then((result) => {
        if (result.value) {
          router.push({ name: "register" });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === "cancel"
        ) {
          router.push({ name: "login" });
        }
      });
    },
    cutText(text, limit) {
      if (text.length > limit) {
        return text.slice(0, limit).trim() + "...";
      }

      return text;
    },
  },
};
</script>

<style lang="scss" scoped>
.event {
  background-color: white;
  position: relative;
  min-height: 865px;
  color: #fff;
  box-shadow: 0 3px 6px rgba(#000, 0.16);

  .event__image {
    position: relative;
    height: 460px;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      opacity: 0.9;
      object-fit: cover;
      object-position: center;
    }

    .event-category {
      position: absolute;
      bottom: 0;
      right: 0;
      color: white;
      background: rgba(#888785, 0.6);
      font-size: 24px;
      font-family: "Gotham Bold";
      padding: 8px 16px;

      .event-category__name {
        color: white;
      }

      .event-category__description {
        display: block;
        line-height: 20px;
        font-family: "Gotham Medium";
      }
    }
  }

  .event__content {
    min-height: 310px;
    padding: {
      top: 26px;
      left: 16px;
      right: 16px;
      bottom: 20px;
    }

    .event__content-title {
      color: black;
      font-family: "Gotham Bold", sans-serif;
      font-size: 26px;
      line-height: 35px;
    }

    .event__content-description {
      color: black;
      font-family: "Gotham Book", sans-serif;
      font-size: 25px;
      line-height: 33px;
      margin-top: 40px;
    }

    .event__content-metadata {
      color: black;
      font-family: "Gotham Medium";
      font-size: 22px;
      margin-top: 16px;

      span {
        font-family: "Gotham Bold";
      }
    }
  }

  .event__readmore {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding-bottom: 26px;
  }

  .event__button {
    .event__button-link {
      display: block;
      color: black;
      width: 100%;
      height: 100%;
      line-height: 60px;

      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
