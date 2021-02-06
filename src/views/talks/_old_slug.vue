<template>
  <div>

    <section class="event-section" v-if="event">
      <h1 class="event-section-title container">{{ event.title }}</h1>
      <div class="event-content">
        <div class="event-content-wrap">
          <div class="event-img">
            <img
                :src="$settings.images_path.events  +'l_'+event.cover_image"
                :alt="event.title"
                :title="event.title"
                v-if="event.cover_image"
            />
            <div v-if="event.postponed === 'true'" class="event-postponed">Postponed</div>
          </div>
          <div class="event-sidebar">
            <div class="sidebar-btn-wrap" v-if="!event.past">
              <template v-if="isAuthenticated">
                <button
                    class="reg-event-btn"
                    v-if="event.attending"
                    @click="unattend"
                >CANCEL ATTENDENCE
                </button>
                <button
                    class="reg-event-btn"
                    @click="attend"
                    v-else
                >Register for event
                </button>
                <!--                <button class="chat-btn">Join the chat room</button>-->
              </template>
              <template v-else>
                <button class="reg-event-btn" @click="quickRegistration">Quick event registration</button>
                <button class="reg-event-btn" @click="attendNotAuthed">Join Smiley News</button>
              </template>
            </div>
            <div class="sidebar-block">
              <button class="accordion">Date and time</button>
              <div class="panel">
                <div class="panel-content-wrap">
                  <div
                      class="event-date-time"
                      v-if="event.date != null"
                  >{{
                      event.date | formatDate('en-US', {
                        weekday: 'short', day: 'numeric', month: 'long', year:
                            'numeric'
                      }) | stripComas
                    }}
                  </div>
                  <div
                      class="event-date-time"
                  >{{ event.time_start | formatTime }} - {{ event.time_end | formatTime }}
                  </div>
                </div>
              </div>
            </div>
            <div class="sidebar-block">
              <button class="accordion">Location</button>
              <div class="panel">
                <div class="panel-content-wrap">
                  <div class="event-location">{{ event.location }}</div>
                </div>
              </div>
            </div>
            <!-- Hidden speakers block in sidebar -->
            <div class="sidebar-block" style="display: none;">
              <button class="accordion">Speakers</button>
              <div class="panel">
                <div class="panel-content-wrap">
                  <div class="speaker-item" v-for="speaker in event.speakers" :key="speaker.id">
                    <div class="speaker-avatar-wrap">
                      <div class="speaker-avatar">
                        <img
                            :src="'https://new-smiley.s3.eu-west-2.amazonaws.com/speakers/m_' + speaker.image"
                        />
                      </div>
                    </div>
                    <div class="speaker-name-caption">
                      <div class="speaker-name">{{ speaker.full_name }}</div>
                      <div class="speaker-caption">{{ speaker.role }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- TODO: Rework attendees -->
            <div class="sidebar-block attendees-block" v-if="event.attendees_count !== 0">
              <button class="accordion">Attendees</button>
              <div class="panel">
                <div class="panel-content-wrap">
                  <div
                      class="attendees-wrap"
                      :class="{'attendees-wrap--full' : attendeesDisplayStatus}"
                  >
                    <div
                        class="attendees-avatar"
                        v-for="(attendee, index) in event.attendees"
                        :key="attendee.id + '-attendee'"
                        :class="{'next': index > 0, 'hidden-item': index > 10}"
                    >
                      <template v-if="attendee.avatar != null">
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
                            >{{ attendee.full_name | filterAvatar }}</span>
                        </div>
                      </template>
                    </div>

                    <div class="attendees-avatar next last" v-if="event.attendees.length > 0">
                      <div class="attendees-avatar__letter-holder">
                        <span class="attendees-avatar__letter">{{ event.attendees.length }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="attendees-btn-wrap" v-if="event.attendees.length > 10">
                    <button
                        class="show-all-btn"
                        @click="attendeesDisplayStatus = !attendeesDisplayStatus"
                    >
                      <template v-if="!attendeesDisplayStatus">show all</template>
                      <template v-else>show less</template>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- TODO: Drop to component -->
            <div class="sidebar-block">
              <button class="accordion">Share with friends</button>
              <div class="panel">
                <div class="panel-content-wrap">
                  <div class="share-icons">
                    <ul>
                      <li class="facebook">
                        <a
                            :href="'https://www.facebook.com/sharer.php?u='+$settings.domain+'smiley-talks/'+encodeURI(event.slug)+'&t='+encodeURI(event.title)"
                            target="_blank"
                            title="Share on Facebook"
                        >
                          <svg
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z"
                                fill="#3B5998"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12.938 22.3012H15.67V14.7971H17.7195L18.1248 12.4524H15.67V10.7533C15.67 10.2056 16.0241 9.63047 16.5303 9.63047H17.9255V7.28571H16.2156V7.29623C13.5403 7.39333 12.9906 8.94276 12.943 10.5703H12.938V12.4524H11.5713V14.7971H12.938V22.3012Z"
                                fill="white"
                            />
                          </svg>
                        </a>
                      </li>
                      <li class="linkedin">
                        <a
                            :href="'https://www.linkedin.com/shareArticle?mini=true&amp;url='+$settings.domain+'smiley-talks/'+encodeURI(event.slug)"
                            target="_blank"
                            title="Share on LinkedIn"
                        >
                          <svg
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z"
                                fill="#0976B4"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.15654 11.1286C10.1892 11.1286 11.0264 10.3651 11.0264 9.42233C11.0264 8.47869 10.1892 7.71423 9.15654 7.71423C8.12287 7.71423 7.28571 8.47869 7.28571 9.42233C7.28571 10.3651 8.12287 11.1286 9.15654 11.1286Z"
                                fill="white"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M7.71429 22.1047H11.0693V12.4286H7.71429V22.1047Z"
                                fill="white"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M15.7781 16.723C15.7781 15.6134 16.3031 14.5283 17.5584 14.5283C18.8138 14.5283 19.1224 15.6134 19.1224 16.6965V21.9811H22.4624V16.4805C22.4624 12.6588 20.2034 12 18.8138 12C17.4253 12 16.6594 12.4697 15.7781 13.6077V12.305H12.4286V21.9811H15.7781V16.723Z"
                                fill="white"
                            />
                          </svg>
                        </a>
                      </li>
                      <li class="google-plus">
                        <a
                            :href="'https://plus.google.com/share?url='+$settings.domain+'smiley-talks/'+encodeURI(event.slug)"
                            target="_blank"
                            title="Share on Google+"
                        >
                          <svg
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z"
                                fill="#DD4B39"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8.01355 15.7499C8.05747 13.1741 10.4732 10.9182 13.1008 11.0042C14.3597 10.947 15.5432 11.484 16.5075 12.2384C16.0961 12.6966 15.67 13.1384 15.2145 13.5514C14.0554 12.7659 12.4066 12.5416 11.2476 13.4488C9.58907 14.573 9.51373 17.2276 11.1087 18.4378C12.6599 19.8177 15.592 19.1324 16.0206 17.0198C15.0489 17.0055 14.0748 17.0198 13.1032 16.9889C13.1008 16.4207 13.0984 15.8525 13.1008 15.2843C14.7251 15.2796 16.3494 15.2772 17.9761 15.2891C18.0735 16.6259 17.8933 18.0486 17.0556 19.154C15.7868 20.9038 13.2395 21.4147 11.2524 20.6651C9.25803 19.9203 7.84552 17.8553 8.01355 15.7499Z"
                                fill="white"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M20.34 13H21.6622C21.6644 13.4423 21.6667 13.8866 21.6711 14.3289C22.1134 14.3333 22.5577 14.3333 23 14.3378V15.66C22.5577 15.6644 22.1156 15.6667 21.6711 15.6711C21.6667 16.1156 21.6644 16.5579 21.6622 17H20.3378C20.3333 16.5579 20.3333 16.1156 20.3289 15.6733C19.8866 15.6689 19.4421 15.6644 19 15.66V14.3378C19.4421 14.3333 19.8844 14.3311 20.3289 14.3289C20.3311 13.8844 20.3356 13.4423 20.34 13Z"
                                fill="white"
                            />
                          </svg>
                        </a>
                      </li>
                      <li class="twitter">
                        <a
                            :href="'https://twitter.com/share?text='+encodeURI(event.short_description)+'&url='+$settings.domain+'smiley-talks/'+encodeURI(event.slug)"
                            target="_blank"
                            title="Share on Twitter"
                        >
                          <svg
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z"
                                fill="#55ACEE"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M21.871 9.26277C21.4476 9.53396 20.4755 9.92804 19.9961 9.92804V9.92885C19.4487 9.357 18.6781 9 17.8234 9C16.1634 9 14.8173 10.3461 14.8173 12.0054C14.8173 12.236 14.844 12.4609 14.8934 12.6765H14.8929C12.6411 12.6174 10.1784 11.4888 8.69582 9.55711C7.7843 11.1349 8.5731 12.8896 9.60751 13.529C9.25342 13.5557 8.60159 13.4882 8.29478 13.1888C8.27422 14.236 8.77775 15.6235 10.6137 16.1269C10.2601 16.3171 9.63422 16.2626 9.36206 16.2221C9.45758 17.1061 10.6955 18.2618 12.0492 18.2618C11.5667 18.8198 9.75144 19.8321 7.71436 19.51C9.09783 20.3518 10.7102 20.8393 12.4169 20.8393C17.2667 20.8393 21.0331 16.9087 20.8304 12.0598C20.8296 12.0545 20.8296 12.0492 20.8291 12.0433C20.8296 12.0309 20.8304 12.0184 20.8304 12.0054C20.8304 11.9904 20.8291 11.9761 20.8286 11.9616C21.2702 11.6596 21.8626 11.1255 22.2858 10.4225C22.0403 10.5577 21.304 10.8284 20.6188 10.8956C21.0585 10.6582 21.7101 9.88092 21.871 9.26277Z"
                                fill="white"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="event-tabs" id="tabs">
            <ul class="tabs-nav">
              <li v-for="(ev, index) in event.tabs" :key="ev.id">
                <a :href="'#tab-' + ++index" :class="{active: index === 0}">{{ ev.title }}</a>
              </li>
              <li v-if="event.speakers.length >0">
                <a href="#tab-speakers">Speakers</a>
              </li>
            </ul>

            <div class="tabs-items">
              <div
                  :class="'tabs-item item-' + ++index"
                  :id="'tab-' + index"
                  v-for="(ev, index) in event.tabs"
                  :key="ev.id"
              >
                <div :class="'content-tab-' + index">
                  <p v-html="ev.content"></p>
                </div>
              </div>
              <div
                  class="tabs-item item-speakers"
                  id="tab-speakers"
                  v-if="event.speakers.length >0"
              >
                <div class="content-tab-speakers content-tab-speakers--columns">
                  <div class="speaker-item" v-for="speaker in event.speakers" :key="speaker.id">
                    <div class="speaker-avatar-wrap">
                      <div class="speaker-avatar">
                        <img
                            :src="'https://new-smiley.s3.eu-west-2.amazonaws.com/speakers/m_' + speaker.image"
                        />
                      </div>
                    </div>
                    <div class="speaker-name-caption">
                      <div class="speaker-name">{{ speaker.full_name }}</div>
                      <div class="speaker-caption">{{ speaker.role }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TODO: Manage blocks into components? -->
          <template v-for="block in event.video_blocks">
            <section class="event-videos" :key="block.title">
              <div class="event-videos-wrap">
                <h2 class="event-videos-title" v-if="block.title !== null">{{ block.title }}</h2>
                <div class="event-videos-cards">
                  <div
                      class="video-card-holder"
                      v-for="(video, index) in block.videos"
                      :key="index +'-vd'"
                  >
                    <div class="video-card">
                      <template v-if="video.sub_type == 'vimeo'">
                        <iframe
                            :src="'https://player.vimeo.com/video/'+video.content+'?title=0&amp;byline=0&amp;portrait=0'"
                            frameborder="0"
                            allow="fullscreen"
                            allowfullscreen
                        ></iframe>
                      </template>
                      <template v-else>
                        <iframe
                            :src="'https://www.youtube.com/embed/'+video.content"
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                      </template>
                    </div>
                    <div class="video-card__info">
                      <div class="video-card__title">{{ video.title }}</div>
                      <div
                          class="video-card__description"
                          v-if="video.description != null"
                      >{{ video.description }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </template>

          <!-- TODO: Show event audio block -->
          <section class="event-audios" v-if="audios.length > 0">
            <div class="event-audios-wrap">
              <h2 class="event-audios-title">Audio</h2>

              <div class="event-audios-cards">
                <div
                    class="audio-item"
                    v-for="(audio, index) in audios"
                    :key="audio.title +'-vd-'+index"
                >
                  <div class="audio-item__title">{{ audio.title }}</div>
                  <audio controls :src="audio.url">
                    Your browser does not support the
                    <code>audio</code> element.
                  </audio>
                </div>
              </div>
            </div>
          </section>

          <section class="event-partners" v-if="event.partners.length > 0">
            <div class="event-partners-wrap">
              <h2 class="event-partners-title">Partners</h2>

              <div class="event-partners-cards">
                <div class="event-partners-cards__sides"></div>
                <div
                    class="event-partners-cards__holder"
                    v-for="partner in event.partners"
                    :key="partner.name + partner.id"
                >
                  <a :href="partner.website" target="_blank" v-if="partner.website !== null">
                    <img
                        :src="$settings.images_path.partners + 'm_' +partner.image"
                        :alt="partner.name"
                        :title="partner.name"
                    />
                  </a>
                  <img
                      v-else
                      :src="$settings.images_path.partners + 'm_' +partner.image"
                      :alt="partner.name"
                      :title="partner.name"
                  />
                </div>
              </div>
            </div>
          </section>

          <!-- TODO: Rework join chatroom -->
          <section class="chatroom-btn-section" style="display: none;">
            <div class="chatroom-btn-section-wrap">
              <div class="chatroom-btn-wrap">
                <h2 class="chatroom-btn-title">WANT TO CONTINUE THE CONVERSATION</h2>
                <button class="chatroom-btn">Join the chat room</button>
              </div>
            </div>
          </section>

          <section class="invite-friends" v-if="isAuthenticated">
            <div class="invite-friends-section-wrap">
              <h2 class="invite-friends-title">Invite friends</h2>
              <form class="invite-friends-form-wrap" @submit.prevent="sendInvite">
                <label for="invite">
                  <input
                      type="email"
                      name="invite"
                      id="invite"
                      multiple
                      placeholder="Separate multiple emails with commas"
                      v-model="inviteEmails"
                  />
                </label>
                <button class="invite-btn">Send invite</button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </section>

    <!--<section class="event-location-section container">-->
    <!--&lt;!&ndash;      <div id="map"></div>&ndash;&gt;-->

    <!--<gmap-map-->
    <!--:center="center"-->
    <!--:zoom="12"-->
    <!--style="width:100%;  height: 586px;"-->
    <!--&gt;-->
    <!--<gmap-marker-->
    <!--:key="index"-->
    <!--v-for="(m, index) in markers"-->
    <!--:position="m.position"-->
    <!--@click="center=m.position"-->
    <!--&gt;</gmap-marker>-->
    <!--</gmap-map>-->
    <!--</section>-->
  </div>
</template>

<script>
import $ from "jquery";
import axios from "@/axios-auth";

import router from "@/router";

import {mapActions, mapState} from "vuex";

export default {
  name: "Event",
  data() {
    return {
      center: {lat: 45.508, lng: -73.587},
      attendeesDisplayStatus: false,
      markers: [],
      places: [],
      currentPlace: null,
      id: this.$route.params.id,
      event: null,
      audios: [],
      videos: [],
      inviteEmails: null,
    };
  },
  computed: {
    ...mapState("user", {
      attendedEvents: state => state.attendingEvents
    }),
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
    }
  },
  mounted() {
    setTimeout(() => {
      var acc = document.getElementsByClassName("accordion");
      var i;

      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
        });
      }
      $(window).on("resize", function () {
        let ss = acc;
        let el = $(window).width() >= 1200;

        if ($(window).width() >= 1200) {
          $(acc)
              .addClass("active")
              .attr("disabled", true)
              .next()
              .css("max-height", "initial");
        }
        if ($(window).width() < 1200) {
          $(acc)
              .removeClass("active")
              .attr("disabled", false)
              .next()
              .removeAttr("style");
        }
      });

      var tab = $("#tabs .tabs-items > div");
      tab
          .hide()
          .filter(":first")
          .show();

      $("#tabs .tabs-nav a")
          .click(function () {
            tab.hide();
            tab.filter(this.hash).show();
            $("#tabs .tabs-nav a").removeClass("active");
            $(this).addClass("active");
            return false;
          })
          .filter(":first")
          .click();

      $(".tabs-target").click(function () {
        $("#tabs .tabs-nav a[href=" + $(this).data("id") + "]").click();
      });

      $(window).resize();
    }, 500);

    this.loadEvent();

  },
  methods: {
    loadEvent() {
      axios
          .get("/events/" + this.$route.params.slug)
          .then(res => {
            console.log("event loaded", res);

            this.event = res.data.event;

            const metaPayload = {
              meta: res.data.meta,
              title: res.data.event.title
            }
            this.$store.dispatch('meta/setMeta', metaPayload);
            this.$router.currentRoute.meta.title = this.event.title;
          })
          .catch(error => console.log(error));
    },
    sendInvite() {
      let emails = this.inviteEmails.split(",");
      if (emails.length > 0) {
        axios
            .post("/events/" + this.$route.params.slug + "/invite", {
              emails: emails
            })
            .then(res => {
              this.$swal({text: res.data.message});
              this.inviteEmails = [];
            })
            .catch(error => console.error("error", error.response));
      }
    },
    attend() {
      axios
          .post("/events/" + this.event.slug + "/attend")
          .then(res => {
            this.$swal('You are now attending this event');
            this.loadEvent();
          })
          .catch(error => console.error(error));
    },
    unattend() {
      axios
          .post("/events/" + this.event.slug + "/attend/cancel")
          .then(res => {
            this.$swal('You are now not attending this event');
            this.loadEvent();
          })
          .catch(error => console.error(error));
    },
    async quickRegistration() {
      const {value: formValues} = await this.$swal.fire({
        title: 'Quick Registration',
        html:
            '<input id="qr-name" class="swal2-input" placeholder="Your Name">' +
            '<input id="qr-email" class="swal2-input" placeholder="Email Address">' +
            '<input id="qr-password" class="swal2-input" placeholder="Password">',
        focusConfirm: false,
        confirmButtonText: "Submit",
        width: 480,
        preConfirm: () => {
          return {
            full_name: document.getElementById('qr-name').value,
            email: document.getElementById('qr-email').value,
            password: document.getElementById('qr-password').value,
            event: this.event.slug
          }
        }
      })

      console.log('Before send: ', formValues);

      if (formValues.full_name && formValues.email && formValues.password && formValues.event) {
      axios
          .post("auth/register/quick", formValues)
          .then(res => {
            console.log('register success', res);
            if (res?.data?.success) {
              this.$store
                  .dispatch("user/loginAsGuest", res);
              this.loadEvent();
            }
          })
          .catch(error => console.log(error));
      } else {
        this.quickRegistration();
      }
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
          router.push({name: "register"});
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === "cancel"
        ) {
          router.push({name: "login"});
        }
      });
    },
    ...mapActions("events", ["registerUserForEvent", "unregisterUserForEvent"]),
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({position: marker});
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  },
  // TODO: Remake it for global scope, refactor

};
</script>


<style lang="scss" scoped>
@import "@/scss/sections/_single-event";
@import "@/scss/sections/_single-event-content-section";
@import "@/scss/sections/_single-event-partners";
@import "@/scss/sections/_single-event-video";
@import "@/scss/sections/_single-event-audio";
@import "@/scss/sections/_single-event-chatroom";
@import "@/scss/sections/_single-event-invite-friends";
@import "@/scss/sections/_single-event-location";

// TODO - move styles to wile
.attendees-avatar.next.last {
  position: relative;
  z-index: 2;
}

.hidden-item {
  display: none !important;
}

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

.attendees-wrap--full {
  .attendees-avatar.next.last {
    display: none;
  }

  .attendees-avatar.next {
    margin: auto !important;
  }

  .hidden-item {
    display: inline-block !important;
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
  color: #fff;
  text-transform: uppercase;
  font-family: "Muli", sans-serif;
}

.video-card-holder {
  width: 100%;
  display: flex;

  @include mdMax {
    flex-direction: column;

    .video-card {
      width: calc(100% - 32px);
    }
  }

  @include md {
    &:nth-child(even) {
      flex-direction: row-reverse;
    }
  }

  .video-card__info {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
    box-sizing: border-box;

    @include mdMax {
      width: 100%;
    }
  }

  .video-card__title {
    font-family: "Montserrat SemiBold", sans-serif;
    font-size: 24px;
    width: 100%;
  }

  .video-card__description {
    width: 100%;
    margin-top: 12px;
  }
}

.event-postponed {
  background-color: rgb(208 73 73 / 88%);
  color: #fff;
  padding: 6px 14px;
  text-transform: uppercase;
  display: block;
  font-family: "Montserrat SemiBold";
  transition: background-color 0.4s;

  @include font-size(1.6rem);
}
</style>

<style>
.swal2-input {
  margin-bottom: 0px;
  font-size: 16px;
  height: 3rem;
}
</style>
