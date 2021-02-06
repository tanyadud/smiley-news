<template>
  <div class="talks_container" style="margin-bottom: 150px;">

    <div class="event-title">
      <div class="event-category">
        <h2 class="event-category__title"><b>Event title</b></h2>
      </div>
      <div>
        <iframe
          class="event-title__video"
          style="display: block;"
          width="100%"
          height="700"
          src="https://www.youtube.com/embed/4b33NTAuF5E"
        >
        </iframe>
      </div>
      <p class="event-title__video-description">
        Partners/ Speakers | Tuesday 12pm (BST), Dec 8<sup>th</sup>,2020 | 3 Comments
      </p>
      <div class="event-title__link-actions">
        <VButton
          class="event-title__link-actions__register-button"
          shape="round"
          size="small"
        >
          <router-link
            class="event__button-link"
            :to="'#'">Register</router-link>
        </VButton>

        <div class="event-title__link-actions__un-goals">
          <VButton
            class="event-title__link-actions__icon-btn"
            shape="round"
            size="small"
            color="red"
          >
            <router-link
              class="event__button-link"
              :to="'#'"><i class="fa fa-facebook"></i></router-link>
          </VButton>
          <VButton
            class="event-title__link-actions__icon-btn"
            shape="round"
            size="small"
            color="orange"
          >
            <router-link
              class="event__button-link"
              :to="'#'"><i class="fa fa-facebook"></i></router-link>
          </VButton>
          <p><b>{{ unGoalsText }}</b></p>
        </div>

        <div class="event-title__link-actions__social-networks">
          <VButton
            class="event-title__link-actions__icon-btn"
            shape="round"
            size="small"
            color="blue"
          >
            <router-link
              class="event__button-link"
              :to="'#'"><i class="fa fa-facebook"></i></router-link>
          </VButton>
          <VButton
            class="event-title__link-actions__icon-btn"
            shape="round"
            size="small"
            color="purple"
          >
            <router-link
              class="event__button-link"
              :to="'#'"><i class="fa fa-instagram"></i></router-link>
          </VButton>
          <VButton
            class="event-title__link-actions__icon-btn"
            shape="round"
            size="small"
            color="light-blue"
          >
            <router-link
              class="event__button-link"
              :to="'#'"><i class="fa fa-twitter"></i></router-link>
          </VButton>
          <VButton
            class="event-title__link-actions__icon-btn"
            shape="round"
            size="small"
            color="red"
          >
            <router-link
              class="event__button-link"
              :to="'#'"><i class="fa fa-youtube"></i></router-link>
          </VButton>
          <p>{{ shareText }}</p>
        </div>
      </div>
      <div class="event-title__paragraph-section">
        <p class="event-title__paragraph-section__paragraph">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Vel ipsum dolor perferendis similique, provident error animi dolorem fugit nostrum, odit unde esse inventore reiciendis in aliquid temporibus culpa harum? Officia.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus beatae atque mollitia corrupti aliquam veniam architecto rerum, sed iure eaque voluptate ea dolorem iusto perferendis blanditiis eum magni consequuntur asperiores.
        </p>
        <p class="event-title__paragraph-section__paragraph">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Vel ipsum dolor perferendis similique, provident error animi dolorem fugit nostrum, odit unde esse inventore reiciendis in aliquid temporibus culpa harum? Officia.
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, laudantium excepturi porro, sunt sequi impedit cupiditate dolorem dicta beatae ut, veniam molestias animi possimus! Fugit corrupti error nulla esse beatae?
        </p>
      </div>
      <div class="event-title__people-section">
        <div v-for="(user, index) in peoples" :key="index">
          <PeopleSection
            :profilePicture="user.profilePicture"
            :userName="user.userName"
            :partnership="user.partnership"
            :role="user.role"
          />
        </div>
      </div>
      <!-- Comments Section -->
      <Comments
        :shareText="shareText"
      />
    </div>

    <div class="event-category">
      <h2 class="event-category__title"><b>Related</b> | Events</h2>
    </div>
    <div class="event-grid">
      <EventCard
        class="event-card"
        v-for="(event, key) in past"
        :key="'event-card-' + key"
        :event="event"
        button-name="Watch Now"
      ></EventCard>
    </div>

    <Subscribe />
  </div>
</template>

<script>
import axios from "@/axios-auth";
import EventCard from "@/components/cards/EventCard.vue";
import { VSearchLocation, VDropdown, VSwitch, VButton } from "@/components/app";
import PeopleSection from "@/components/People.vue";
import Subscribe from '@/components/forms/Subscribe.vue';
import Comments from "../../components/Comments";
export default {
  name: "Talks",
  components: {
    Comments,
    VSearchLocation,
    VDropdown,
    VSwitch,
    VButton,
    EventCard,
    PeopleSection,
    Subscribe,
  },
  data() {
    return {
      events: [],
      past: [],
      // events_pages: 0,
      // past_pages: 0,
      // is_mobile: false,
      // is_shown: false,
      peoples: [
        {
          profilePicture: 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png',
          userName: 'John Wick',
          partnership: 'Partnerships Manager at Plastic Oceans UK Partnerships',
          role: 'Manager at Plastic Oceans UK'
        },
        {
          profilePicture: 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png',
          userName: 'John Wick',
          partnership: 'Partnerships Manager at Plastic Oceans UK Partnerships',
          role: 'Manager at Plastic Oceans UK'
        },
        {
          profilePicture: 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png',
          userName: 'John Wick',
          partnership: 'Partnerships Manager at Plastic Oceans UK Partnerships',
          role: 'Manager at Plastic Oceans UK'
        },
        {
          profilePicture: 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png',
          userName: 'John Wick',
          partnership: 'Partnerships Manager at Plastic Oceans UK Partnerships',
          role: 'Manager at Plastic Oceans UK'
        }
      ],
      unGoalsText: '| UN Goals',
      shareText: '< share',
      filter: {
        city: null,
        radius: [
          {
            value: 2,
            text: "2 miles",
          },
          {
            value: 5,
            text: "5 miles",
          },
          {
            value: 10,
            text: "10 miles",
          },
          {
            value: 25,
            text: "25 miles",
          },
          {
            value: 50,
            text: "50 miles",
          },
          {
            value: 100,
            text: "100 miles",
          },
          {
            value: 0,
            text: "Any distance",
          },
        ],
        country: "London, GB",
      },
      filterQuery: {
        city: null,
        country: null,
        latitude: null,
        longitude: null,
        radius: 0,
        timing: "Upcoming",
        date: {
          end: new Date(),
          start: new Date(),
        },
      },
    };
  },
  methods: {
    handleResize() {
      this.is_mobile = window.innerWidth >= 768 ? false : true;
      if (window.innerWidth >= 768) {
        this.is_shown = true;
      }
    },
    toggleFilterMenu() {
      this.is_shown = !this.is_shown;
    },
    getAddressData: function(data) {
      data.address_components.forEach((prop) => {
        if (prop.types.includes("locality")) {
          this.filterQuery.city = prop.long_name;
        }
        if (prop.types.includes("country")) {
          this.filterQuery.country = prop.long_name;
        }
      });
      this.filterQuery.latitude = data.geometry.location.lat();
      this.filterQuery.longitude = data.geometry.location.lng();
    },
    sendFilterData() {
      // let filter = this.filterQuery;
      // // console.log(this.filterQuery);
      // filter.date.start = Math.floor(
      //   new Date(filter.date.start).getTime() / 1000
      // );
      // filter.date.end = Math.floor(new Date(filter.date.end).getTime() / 1000);
      // console.log(filter);
      this.$swal({ text: "This feature will work soon" });
    },
    loadEvents(page) {
      axios
        .get("/events?page=" + page)
        .then((res) => {
          this.events = res.data.events;
        })
        .catch((error) => console.error(error));
    },
    loadPastEvents(page) {
      axios
        .get("/events/past?page=" + page)
        .then((res) => {
          this.past = res.data.events;
        })
        .catch((error) => console.error(error));
    },
  },
  mounted() {
    axios
      .get("/events")
      .then((res) => {
        console.log("Future events", res);
        this.events = res.data.events;
        this.events_pages = res.data.pages_count;
      })
      .catch((error) => console.error(error));
    axios
      .get("/events/past")
      .then((res) => {
        console.log("Past events", res);
        this.past = res.data.events;
        this.past_pages = res.data.pages_count;
      })
      .catch((error) => console.error(error));
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style lang="scss" scoped>
.talks_container {
  padding: 0 150px;
}
.event-title {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  &__video {
    border: none;
  }
  &__video-description {
    color: red;
    font-weight: 700;
    margin-top: 20px;
  }
  &__link-actions {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    a {
      text-decoration: none;
      color: white
    }
    &__un-goals {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 15px;
      p {
        margin-top: 5px;
      }
    }
    &__social-networks {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 30px;
      p {
        margin-top: 5px;
      }
    }
    &__register-button {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: 700;
      margin: 20px 15px 30px 0;
      a {
        color: black;
      }
    }
    &__icon-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: 700;
      margin: 20px 10px 30px 0;
      width: 25px;
      height: 23px;
      padding: 0;
    }
  }
  &__paragraph-section {
    &__paragraph {
      font-size: 14px;
      font-weight: 600;
    }
  }
  &__people-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
  }
  &__comments-section {
    &__category {
      display: flex;
      flex-direction: column;
      padding-top: 14px;
      border-bottom: 2px solid #ffe300;
      border-top: 2px solid #ffe300;
      &__title {
        color: black;
        font-family: "Gotham Light", sans-serif;
        font-size: 30px;
        line-height: 40px;
        display: flex;
        flex-direction: column;
        b {
          font-family: "Gotham Bold", sans-serif;
        }
        span {
          font-size: 15px;
          margin-top: -10px;
        }
      }
      &__subtitle {
        color: black;
        font-family: "Gotham Light", sans-serif;
        line-height: 40px;
        margin: 0;
        b {
          font-family: "Gotham Bold", sans-serif;
        }
      }
      &__info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        &__comments-counter {
          color: black;
          font-family: "Gotham Light", sans-serif;
          font-size: 17px;
          margin-top: 5px;
          b {
          font-family: "Gotham Bold", sans-serif;
        }
        }
        &__user-login {
          img {
            margin: 0 15px;
            margin-bottom: 4px;
          }
        }
      }
    }
    &__recommend {
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      a {
        text-decoration: none;
        color: white
      }
      &__icon-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 700;
        margin: 0 10px;
        width: 25px;
        height: 23px;
        padding: 0;
      }
    }
    &__join-conversation-input {
      width: 70%;
      border-radius: 10px;
      font-size: 16px;
      padding: 10px;
      margin-top: 20px;
      &::placeholder {
        font-weight: bold;
        color: black;
      }
    }
    &__login-view {
      display: flex;
      &__left-side {
        position: static;
        width: 200px;
        margin-top: 30px;

        a {
          color: white;
        }
        &__comments {
          display: flex;
          flex-direction: row;
          width: 600px;
          text-align: left;
          margin-left: 20px;
          position: absolute;
          p {
            margin-left: 20px;
          }
          button {
            border: none;
            background: none;
            color: black;
            font-weight: bold;
            font-size: 16px;
            margin: 0 15px;
            z-index: 999;
            &:hover {
              color: #ffe300;
              cursor: pointer;
            }
          }
        }
        &__login-with {
          display: flex;
          margin-top: -10px;
          &__icon-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            font-weight: 700;
            margin: 20px 10px 30px 0;
            width: 25px;
            height: 23px;
            padding: 0;
          }
        }
      }
    }
  }
}
.event-category {
  padding: 16px 0;
  border-bottom: 2px solid #ffe300;
  display: flex;
  margin: 150px 0;
  .event-category__title {
    color: black;
    font-family: "Gotham Light", sans-serif;
    font-size: 30px;
    line-height: 40px;
    b {
      font-family: "Gotham Bold", sans-serif;
    }
  }
}
.event-grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(375px, 1fr));
  grid-gap: 100px 50px;
}
</style>
