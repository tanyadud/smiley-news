<template>
  <article class="news-article">
    <div class="news-article__image">
      <media-image
          :src="event.cover_image"
          :alt="event.title"
          :title="event.title"
          size="m"
          type="events"
      />
      <div class="news-article__date">
        <div>{{ format(event.date, 'MMM')}}</div>
        <div>{{ format(event.date, 'D') }}</div>
      </div>
    </div>
    <div class="news-article__description">
      <h3 class="news-article__title">
        <router-link :to="{name: 'event', params: {slug: event.slug}}">{{ event.title }}</router-link>
      </h3>
      <div class="news-article__excerpt">
        <span v-html="event.short_description"></span>
        <router-link :to="{name: 'event', params: {slug: event.slug}}"> more...</router-link>
      </div>
      <ul class="news-article__infos">
        <li class="news-article__infos-item">Interview</li>
        <li class="news-article__infos-item">{{
            event.date | formatDate('en-US', {
              weekday: 'short', day: 'numeric', month: 'long', year:
                  'numeric'
            }) | stripComas
          }}</li>
        <li class="news-article__infos-item">{{ event.time_start | formatTime }} - {{ event.time_end | formatTime }}</li>
      </ul>
    </div>
    <div class="news-article__actions">
      <router-link
          :to="{name: 'event', params: {slug: event.slug}}"
          class="news-article__actions-item"
      >Talk details</router-link>
      <template v-if="!event.past && isAuthenticated">
        <button
            class="news-article__actions-item"
            v-if="event.attending == true"
            @click.prevent="unattend"
        >Unattend</button>
        <button class="news-article__actions-item" v-else @click.prevent="attend">Register</button>

      </template>
      <template v-else>
        <button class="news-article__actions-item" v-if="active" @click.prevent="attendNotAuthed">Register</button>
      </template>
    </div>
  </article>
</template>

<script>
import axios from "@/axios-auth";
import router from "@/router";

import MediaImage from "@/components/Image.vue";

export default {
  name: "EventCardNew",
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
.news-article {
  box-shadow: 0px 3px 6px rgba(0,0,0,.15);
  display: flex;
  flex-direction: column;

  &__image {
    position: relative;
    width: 100%;
    height: 0px;
    padding-top: 56.25%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
      object-fit: cover;
    }
  }

  &__date {
    background-color: #FFE300;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    padding: .5rem 1rem;
    position: absolute;
    left: 1.5rem;
    top: 0px;
    text-align: center;
  }

  &__category {
    position: absolute;
    bottom: 0px;
    right: 0px;
    padding: .5rem 1rem;
    background-color: rgba(135,135,133,.6);
    color: #fff;
  }

  &__description {
    background-color: #fff;
    padding: 1.5rem 1rem;
    display: flex;
    flex: 1;
    flex-direction: column;
    height: auto;
  }

  &__title {
    @include font-size(1.4rem);
    line-height: 1.4;
    flex: 1;

    a {
      color: #000;
      border-bottom: 1px solid transparent;
      transition: border-color .2s;

      &:hover {
        text-decoration: none;
        border-color: #000;
      }
    }
  }

  &__excerpt {
    margin-top: 1.45rem;
  }

  &__infos {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 1.45rem;
    @include font-size(.8rem);

    &-item {
      margin-right: .5rem;
      padding-right: .5rem;
      position: relative;
      &::after {
        content: '';
        width: 1px;
        height: 60%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0px;
        background-color: #000;
      }
      &:first-child {
        font-weight: bold;
      }
      &:last-child {
        &::after {
          display: none;
        }
      }
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    &-item {
      margin: 1rem;
      border-radius: 40px;
      background-color: #FFE300;
      box-shadow: 0px 3px 6px rgba(0,0,0,.15);
      display: inline-block;
      padding: .5rem 1.2rem;
      color: #000;
      text-decoration: none !important;
      border: none;
      min-width: 130px;
      text-align: center;
    }
  }
}
</style>
