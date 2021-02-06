<template>
  <div class="event-item">
    <div class="event-item__image">
      <media-image
        :src="event.cover_image"
        :alt="event.title"
        :title="event.title"
        size="m"
        type="events"
      />
    </div>
    <div class="event-item__content">
      <div class="event-item__category">
        <div class="event-item__header">
          <div class="event-item__category-badge">
            <div>{{ format(event.date, 'MMM')}}</div>
            <div>{{ format(event.date, 'D') }}</div>
          </div>
          <div
            class="event-item__category-name"
            v-if="event.goals.length > 0"
          >{{event.goals[0].name}}</div>
          <div
            class="event-item__category-postponed"
            v-if="event.postponed === 'true'"
          >Postponed</div>
          <!-- <div class="event-item__category-circle">
            <span>+15</span>
          </div>-->
        </div>
      </div>
      <div class="event-item__spacer"></div>
      <div class="event-item__inner">
        <div
          class="event-item__hours"
        >{{ event.time_start | formatTime }} - {{ event.time_end | formatTime}}</div>
        <h3 class="event-item__title">
          <router-link :to="{name: 'event', params: {slug: event.slug}}">{{event.title}}</router-link>
        </h3>
        <!-- <div class="event-item__description">{{ description | trimDescription }}</div> -->
        <div class="event-item__location">{{ event.location }}</div>
        <div class="event-item__button">
          <router-link :to="{name: 'event', params: {slug: event.slug}}">talk details</router-link>
          <template v-if="!event.past && isAuthenticated">
            <button
                class="register"
                v-if="event.attending == true"
                @click.prevent="unattend"
            >Unattend</button>
            <button class="register" v-else @click.prevent="attend">register</button>

          </template>
          <template v-else>
            <button class="register" v-if="active" @click.prevent="attendNotAuthed">register</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios-auth";
import router from "@/router";

import MediaImage from "@/components/Image.vue";

export default {
  name: "EventCard",
  components: {
    MediaImage
  },
  filters: {
    trimDescription(description) {
      return description.length > 120
        ? description.substring(0, 120) + "..."
        : description;
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
    },
  },
  methods: {
    format(date, format) {
      const result = this.$dayjs(date).format(format);
      return result;
    },
    attend() {
      axios
        .post("/events/" + this.event.slug + "/attend")
        .then(res => {
          this.$swal('You are now attending this event');
          this.$emit('reload_events');
        })
        .catch(error => console.error(error));
    },
    unattend() {
      axios
        .post("/events/" + this.event.slug + "/attend/cancel")
        .then(res => {
          this.$swal('You are now not attending this event');
          this.$emit('reload_events');
        })
        .catch(error => console.error(error));
    },
    attendNotAuthed() {
      let swal = {
        title: "Register or Login",
        text:
          "To register for an event you will need to login or create an account",
        showCancelButton: true,
        confirmButtonText: "Create Account",
        cancelButtonText: "Login"
      };
      this.$swal(swal).then(result => {
        if (result.value) {
          router.push({ name: "register" });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === "cancel"
        ) {
          router.push({ name: "login" });
        }
      });
    }
  },
  props: {
    event: {
      type: Object
    },
    active: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
// TODO: Move styles to separate file
.event-item {
  background-color: #000;
  position: relative;
  padding: 30px;
  min-height: 350px;
  transition: padding-bottom 0.4s;
  color: #fff;
  display: flex;
  flex-direction: column;

  @include mdMax {
    min-height: 400px;
  }

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    background-color: #000;
    opacity: 0.5;
    z-index: 2;
  }

  &:hover {
    .event-item__image {
      img {
        transform: scale(1.1);
      }
    }
  }

  .event-item__image {
    position: absolute;
    left: 0px;
    top: 0px;
    overflow: hidden;
    height: 100%;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform 0.4s;
    }
  }

  .event-item__inner {
    transition: transform 0.4s;
  }

  .event-item__content {
    position: relative;
    z-index: 2;
    display: flex;
    flex: 1;
    flex-direction: column;
    transition: transform 0.4s;
  }

  .event-item__header {
    display: flex;
    align-items: center;
  }

  .event-item__category {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .event-item__category-badge {
    position: absolute;
    background-image: url("/img/date-badge-bg.png");
    height: 70px;
    width: 60px;
    background-repeat: no-repeat;
    background-position: center 1px;
    top: -31px;
    left: 3px;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    div {
      font-family: "Montserrat SemiBold", sans-serif;
      color: #393939;
      text-align: center;
    }
  }

  .event-item__category-name {
    background-color: rgba(125, 132, 148, 0.6);
    color: #fff;
    padding: 6px 14px;
    text-transform: uppercase;
    display: inline-block;
    font-family: "Montserrat SemiBold";
    transition: background-color 0.4s;

    @include font-size(0.6rem);
  }

  .event-item__category-postponed {
    background-color: rgb(208 73 73 / 88%);
    color: #fff;
    padding: 6px 14px;
    text-transform: uppercase;
    display: block;
    font-family: "Montserrat SemiBold";
    transition: background-color 0.4s;

    @include font-size(0.6rem);
  }

  .event-item__category-circle {
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.5);
    font-size: 0px;
    position: relative;
    padding: 16px;
    margin-left: 16px;

    span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -49%);
      @include font-size(0.8rem);
      font-family: "Inter Regular";
    }
  }

  .event-item__timestamp {
    color: #fff;
    font-family: "Montserrat Regular", sans-serif;
    opacity: 0.7;
  }

  .event-item__spacer {
    flex: 1;
    min-height: 50px;
  }

  .event-item__hours {
    @include font-size(1.1rem);
    line-height: 1.45;
    color: #fff;
    font-family: "Montserrat Bold", sans-serif;
  }

  .event-item__title {
    @include font-size(1.1rem);
    line-height: 1.45;
    color: #fff;
    font-family: "Montserrat SemiBold", sans-serif;

    a {
      color: #fff;
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: border-color 0.4s;

      &:hover {
        border-color: #fff;
      }
    }
  }

  .event-item__description {
    font-family: "Inter Regular";
    margin-bottom: 24px;
  }

  .event-item__location {
    @include font-size(1rem);
    font-family: "Inter Regular";
    margin-bottom: 24px;
    padding-left: 24px;
    position: relative;

    &::before {
      content: "";
      display: block;
      width: 18px;
      height: 18px;
      background-image: url("/img/icons/location-icon-white.png");
      background-position: top left;
      background-size: 14px;
      background-repeat: no-repeat;
      position: absolute;
      left: 0px;
      top: 5px;
    }
  }

  .event-item__button {
    display: flex;
    justify-content: space-between;
  }

  .event-item__button {
    a,
    button {
      text-decoration: none;
      background-color: rgba(125, 132, 148, 1);
      color: #fff;
      padding: 6px 14px;
      text-transform: uppercase;
      display: inline-block;
      font-family: "Montserrat SemiBold", sans-serif;
      transition: background-color 0.4s;
      min-width: 108;
      text-align: center;

      @include font-size(0.8rem);

      &:hover {
        background-color: rgba(125, 132, 148, 0.8);
      }
    }
  }
  .event-item__button .register {
    background-color: #f4ed3b !important;
    border-width: 0px;
    color: #393939;
    cursor: pointer;
  }
}
</style>