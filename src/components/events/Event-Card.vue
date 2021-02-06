<template>
  <div class="talk-card-holder">
    <div class="pic-wrap">
      <div class="smiley-img-wrap">
        <div class="smiley-img">
          <img
            :src="$settings.images_path.events +'m_'+event.cover_image"
            :alt="event.title"
            sizes="(max-width: 1160px) 100vw, 1160px"
            :srcset="
$settings.images_path.events + `s_`+event.cover_image+` 150w,` +
$settings.images_path.events + `m_`+event.cover_image+` 360w,` +
$settings.images_path.events + `l_`+event.cover_image+` 1160w`
                     "
          />
        </div>
      </div>
    </div>

    <!-- Register & UnRegister buttons  show only if user is registered-->
    <div class="btns-wrap" v-if="isAuthenticated">
      <div class="attend" id="attending-overlay" :class="{'attend--active' : overlay}">
        <div v-if="!attendedEvents.includes(event.id)">
          <button @click.prevent="registerUser(event.id)">Register for event</button>
        </div>
        <div v-if="attendedEvents.includes(event.id)">
          <button @click.prevent="unregisterUser(event.id)" class="minus">CANCEL ATTENDENCE</button>
        </div>
      </div>
    </div>

    <!-- Show plus button for overlay for Authed users -->
    <template v-if="isAuthenticated">
      <button
        v-if="!attendedEvents.includes(event.id) && !past"
        class="talk-card-checkbox-dt"
        :class="{'talk-card-checkbox-rotate': overlay }"
        @click.prevent="showButtons"
        @mouseover="holderShown = true"
        @mouseleave="holderShown = false"
      ></button>
    </template>
    <template v-else>
      <button class="talk-card-checkbox-dt" @click.prevent="signInModal"></button>
    </template>

    <!-- Show this Upon Hover -->
    <div
      class="overlay"
      :class="{'overlay--active' : holderShown && !overlay}"
      v-if="isAuthenticated"
    >
      <span v-if="attendedEvents.includes(event.id)">Click to cancel</span>
      <span v-else>Click to attend</span>
    </div>

    <!-- Show if User attended to event -->
    <div
      class="confirmed-box"
      v-if="attendedEvents.includes(event.id) && isAuthenticated"
      @click.prevent="showButtons"
      @mouseover="holderShown = true"
      @mouseleave="holderShown = false"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.91007 17.4958L3.70711 11.2929C3.31658 10.9024 2.68342 10.9024 2.29289 11.2929C1.90237 11.6834 1.90237 12.3166 2.29289 12.7071L9.29289 19.7071C9.71682 20.131 10.4159 20.0892 10.7863 19.6178L21.7863 5.6178C22.1275 5.18353 22.0521 4.55488 21.6178 4.21366C21.1835 3.87245 20.5549 3.94789 20.2137 4.38216L9.91007 17.4958Z"
          fill="#fff"
        />
      </svg>
    </div>

    <!-- Information box -->
    <div class="info-wrap">
      <!-- Text description -->
      <div class="info-border">
        <h2>{{event.title}}</h2>
        <p class="info-full-height">{{event.short_description}}</p>

        <div class="spacer"></div>

        <div class="date-and-time-wrap">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17 2C17.5523 2 18 2.44772 18 3V4H19C20.6569 4 22 5.34315 22 7V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V7C2 5.34315 3.34315 4 5 4H6V3C6 2.44772 6.44772 2 7 2C7.55228 2 8 2.44772 8 3V4H16V3C16 2.44772 16.4477 2 17 2ZM4 12V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V12H4ZM4 10H20V7C20 6.44772 19.5523 6 19 6H18V7C18 7.55228 17.5523 8 17 8C16.4477 8 16 7.55228 16 7V6H8V7C8 7.55228 7.55228 8 7 8C6.44772 8 6 7.55228 6 7V6H5C4.44772 6 4 6.44772 4 7V10Z"
              fill="#d21217"
            />
          </svg>
          <div class="date-and-time-info">
            <div
              class="date-info"
            >{{event.date | formatDate('en-US', {weekday: 'short', day: 'numeric', month: 'long', year: 'numeric'}) | stripComas}}</div>
            <div
              class="time-info"
            >{{event.time_start | formatTime}} - {{event.time_end | formatTime}}</div>
          </div>
        </div>

        <div class="location-info">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 2C16.9706 2 21 5.98572 21 10.9024C21 14.1559 18.2777 17.5958 12.9483 21.3432L12 22L11.4278 21.6051C5.85042 17.7559 3 14.2315 3 10.9024C3 5.98572 7.02944 2 12 2ZM12 3.9783C8.13401 3.9783 5 7.07831 5 10.9024C5 13.3049 7.29672 16.2364 12 19.5818C16.7033 16.2364 19 13.3049 19 10.9024C19 7.07831 15.866 3.9783 12 3.9783ZM12 6C14.2091 6 16 7.79086 16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10C8 7.79086 9.79086 6 12 6ZM12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8Z"
              fill="#d21217"
            />
          </svg>
          <div>{{event.location}}</div>
        </div>
      </div>

      <!-- Show attendees only if user is attended to event -->
      <!-- TODO: Rework attendees -->

      <div class="attending-info" v-if="event.attendees_random.length !== 0">
        <span>Attending:</span>
        <div class="attending-wrap">
          <div
            class="attendees-avatar"
            v-for="(attendee, index) in event.attendees_random"
            :key="attendee.id + '-attendee'"
            :class="{'next': index > 0}"
          >
            <template v-if="attendee.avatar !== null">
              <img
                :src="$settings.images_path.users + 's_' + attendee.avatar"
                :alt="attendee.full_name"
                :title="attendee.full_name"
              />
            </template>
            <template v-else>
              <div class="attendees-avatar__letter-holder">
                <span
                  class="attendees-avatar__letter"
                  :title="attendee.full_name"
                >{{attendee.full_name || attendee.full_name | filterAvatar}}</span>
              </div>
            </template>
          </div>
          <div class="attendees-avatar next last" v-if="event.attendees_random.length !== 0">
            <div class="attendees-avatar__letter-holder">
              <span class="attendees-avatar__letter">{{event.attendees_count}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "EventCard",
  data() {
    return {
      overlay: false,
      holderShown: false
    };
  },
  methods: {
    showButtons() {
      this.overlay = !this.overlay;
    },
    signInModal() {
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
          router.push({ path: "/register" });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === "cancel"
        ) {
          router.push({ path: "/login" });
        }
      });
    },
    registerUser(id) {
      this.registerUserForEvent({ id: id, organisation: false });
    },
    unregisterUser(id) {
      this.unregisterUserForEvent({ id: id, organisation: false });
    },
    ...mapActions("events", ["registerUserForEvent", "unregisterUserForEvent"])
  },
  mounted() {
    // console.log(event);
  },
  computed: {
    ...mapState("user", {
      attendedEvents: state => state.attendingEvents
    }),
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
    }
  },
  props: {
    event,
    past: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/components/_event-card.scss";

// TODO: Move styles to file

.attendees-avatar {
  position: relative;
  z-index: 1;
}

.attendees-avatar {
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
.attendees-avatar__letter-holder {
  width: 100%;
  height: 100%;
  background-color: #7a7a7a;
  position: relative;
}

.attendees-avatar__letter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff !important;
  font-family: "Muli", sans-serif;
}
</style>