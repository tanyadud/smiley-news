<template>
  <div>
    <div class="header">
      <iframe
        class="header-video"
        width="100%"
        height="775"
        src="https://www.youtube.com/embed/4b33NTAuF5E"
      >
      </iframe>
    </div>
    <div class="filters">
      <div class="container filter-toggle">
        <div class="filter-toggle__title">Filter</div>
        <div class="filter-toggle__button-holder">
          <button
            type="button"
            class="filter-toggle__button"
            @click.prevent="toggleFilterMenu"
          >
            <i class="fa fa-sliders"></i>
          </button>
        </div>
      </div>
      <form
        class="container"
        v-show="is_shown"
        @submit.prevent="sendFilterData"
      >
        <div class="filters-container">
          <div class="filter-column filter filter--location">
            <label class="filter__label" for="inputLocation">
              <div class="filter__title">Location</div>
            </label>

            <VSearchLocation
              id="inputLocation"
              @place_changed="getAddressData"
            ></VSearchLocation>
          </div>
          <div class="filter-column filter filter--radius">
            <label class="filter__label" for="inputRadius">
              <div class="filter__title">Radius</div>
            </label>

            <VDropdown
              id="inputRadius"
              :options="filter.radius"
              v-model="filterQuery.radius"
            ></VDropdown>
          </div>
          <div class="filter-column filter filter--timing">
            <div class="filter__label">
              <div class="filter__title">Timing</div>
            </div>

            <VSwitch
              name="timing"
              left="Upcoming"
              right="Past"
              v-model="filterQuery.timing"
            >
            </VSwitch>
          </div>
          <div class="filter-column filter filter--date">
            <div class="filter__label">
              <div class="filter__title">Dates</div>
            </div>

            <div class="filter__input filter__input--icon">
              <i class="fa fa-calendar" aria-hidden="true"></i>
              <date-picker
                v-model="filterQuery.date"
                mode="range"
                id="inputDate"
                class="filter__input-date"
                color="red"
              />
            </div>
          </div>
          <div class="filter-column filter filter--submit">
            <div class="filter__label">
              <div class="filter__title">
                <br />
              </div>
            </div>
            <button type="submit" class="filter__button filter__button-submit">
              Apply
            </button>
          </div>
          <div class="filter-column filter filter--reset">
            <div class="filter__label">
              <div class="filter__title">
                <br />
              </div>
            </div>
            <button type="reset" class="filter__button filter__button-reset">
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="container" style="margin-bottom: 150px;" v-if="events.length">
      <div class="event-category">
        <h2 class="event-category__title"><b>Upcoming</b> | Events</h2>
      </div>
      <div class="event-grid">
        <EventCard
          v-for="(event, key) in events"
          :key="'event-card-' + key"
          :event="event"
          button-name="Register"
        ></EventCard>
      </div>
    </div>

    <div class="container">
      <div class="event-category">
        <h2 class="event-category__title"><b>Past</b> | Events</h2>
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
    </div>
  </div>
</template>

<script>
import axios from "@/axios-auth";

import EventCard from "@/components/cards/EventCard.vue";
import { VSearchLocation, VDropdown, VSwitch } from "@/components/app";

export default {
  name: "Talks",
  components: {
    VSearchLocation,
    VDropdown,
    VSwitch,
    EventCard,
  },
  data() {
    return {
      events: [],
      past: [],
      // events_pages: 0,
      // past_pages: 0,
      // is_mobile: false,
      // is_shown: false,
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
.header {
  .header-video {
    border: none;
  }
}

.filters {
  padding-top: 60px;
  padding-bottom: 50px;
}

.filters-container {
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(10, 1fr);

  @include mdMax {
    padding-top: 24px;
  }

  @include smMax {
    display: block;

    .filter {
      &:not(:last-child) {
        margin-bottom: 24px;
      }
    }
  }
}

// =-=-=-=-=-=
.filter-column {
  display: flex;
  flex-wrap: wrap;
}

.filter {
  &.filter--location {
    grid-column: 1 / span 2;

    @include xxlMax {
      grid-column: 1 / span 4;
    }
  }
  &.filter--radius {
    grid-column: 3 / span 2;

    @include xxlMax {
      grid-column: 5 / span 4;
    }
  }
  &.filter--timing {
    grid-column: 5 / span 2;

    @include xxlMax {
      order: 2;
      grid-column: 5 / span 4;
    }
  }
  &.filter--date {
    grid-column: 7 / span 2;

    @include xxlMax {
      order: 1;
      grid-column: 1 / span 4;
    }
  }
  &.filter--submit {
    @include xxlMax {
      grid-column: 9 / span 2;
    }
    @include smMax {
      .filter__label {
        display: none;
      }
    }
  }
  &.filter--reset {
    @include xxlMax {
      order: 3;
      grid-column: 9 / span 2;
    }

    @include smMax {
      .filter__label {
        display: none;
      }
    }
  }

  .filter__label {
    width: 100%;
    margin-bottom: 0px;
  }
  .filter__title {
    width: 100%;
    font-family: "Gotham Medium", sans-serif;
    font-size: 20px;
    margin-bottom: 6px;
  }
  .filter__input {
    position: relative;
    width: 100%;
  }
  .filter__input--icon {
    i {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: darken(#e5e5e5, 40%);
    }
  }

  .filter__input-date {
    padding: 0px 30px 0px 30px;
    line-height: 1;
    font-size: 18px;
    border: 1px solid #aca9a9;
    border-radius: 5px;
    width: 100%;
    background-color: #fff;
    display: block;
    height: 60px;

    &::v-deep input {
      border: none;
      box-shadow: none;
      height: 100%;
      width: 100%;
    }
  }

  .filter__button {
    font-family: "Gotham Medium", sans-serif;
    border: none;
    border-radius: 5px;
    line-height: 1;
    font-size: 18px;
    height: 60px;
    cursor: pointer;
    transition: background-color 0.4s;
    width: 100%;
    display: block;

    &-submit {
      background-color: #f4ed3b;
      font-family: "Gotham Medium", sans-serif;
    }

    &-reset {
      background-color: #e5e5e5;
    }
  }
}

.filter-toggle {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;

  @include md {
    display: none;
  }

  .filter-toggle__title {
    font-family: "Gotham Medium", sans-serif;
    @include font-size(1.5rem);
    display: flex;
    align-items: center;
  }

  .filter-toggle__button-holder {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .filter-toggle__button {
    @include font-size(1.5rem);
    // -webkit-appearance: none;
    -webkit-border-radius: 0px;
    background-color: #fff;
    border: 1px solid rgba(57, 57, 57, 0.5);
    padding: 1px 10px;
  }
}

.event-category {
  padding-bottom: 16px;
  border-bottom: 2px solid #ffe300;

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
