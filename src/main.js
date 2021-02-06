// Core
import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router";
import store from "./store";
import VueMeta from "vue-meta";

import "regenerator-runtime";

// Plugins
import VueSweetalert2 from "vue-sweetalert2";
import PerfectScrollbar from "vue2-perfect-scrollbar";
import * as VueGoogleMaps from "vue2-google-maps";
import Paginate from "vuejs-paginate";
import VueAwesomeSwiper from "vue-awesome-swiper";
import vueVimeoPlayer from "vue-vimeo-player";
import CKEditor from "@ckeditor/ckeditor5-vue";
import Dayjs from "vue-dayjs";
import Popover from "vue-js-popover";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import { Plugin } from "vue-fragment";

// Styles
import "sweetalert2/dist/sweetalert2.min.css";
import "swiper/css/swiper.css";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

Vue.use(Plugin);
Vue.use(VueAwesomeSwiper);
Vue.use(VueMeta);
Vue.use(Dayjs);
Vue.use(CKEditor);
Vue.use(vueVimeoPlayer);
Vue.use(VueSweetalert2);
Vue.use(PerfectScrollbar);
Vue.use(Popover, {
  tooltip: true,
});

Vue.component("paginate", Paginate);
Vue.component("date-picker", DatePicker);

Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
  load: {
    // TODO: Pass key to variale
    key: "AIzaSyCxye6NLxY1fS_CCwwgYLcnwNIOzozGD9I",
    libraries: "places", // This is required if you use the Autocomplete plugin
  },
});

axios.defaults.headers.get["Accepts"] = "application/json";

// TODO: Make more readable and compact
Vue.prototype.$settings = {
  images_path: {
    events: `https://new-smiley.s3.eu-west-2.amazonaws.com/events/`,
    speakers: `https://new-smiley.s3.eu-west-2.amazonaws.com/speakers/`,
    partners: `https://new-smiley.s3.eu-west-2.amazonaws.com/partners/`,
    news: `https://new-smiley.s3.eu-west-2.amazonaws.com/news/`,
    goals: `https://new-smiley.s3.eu-west-2.amazonaws.com/goals/`,
    pages: `https://new-smiley.s3.eu-west-2.amazonaws.com/pages/`,
    users: `https://new-smiley.s3.eu-west-2.amazonaws.com/users/`,
    organisations: `https://new-smiley.s3.eu-west-2.amazonaws.com/organisations/`,
    projects: `https://new-smiley.s3.eu-west-2.amazonaws.com/projects/`,
  },
  social: {
    facebook: "https://facebook.com/SmileyMovement/",
    twitter: "https://twitter.com/Smiley_Movement",
    instagram: "https://www.instagram.com/smileymovement",
    linkedin: "https://linkedin.com/company/smiley-movement",
  },
  domain: "https://smileymovement.org/",
};

// TODO: Filters in separate file
Vue.filter("formatTime", function(time) {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    time = time.slice(1);
    time[5] = +time[0] < 12 ? "AM" : "PM";
    time[0] = +time[0] % 12 || 12;
    time[3] = "";
  }
  return time.join("");
});
Vue.filter("stripComas", function(time) {
  return time.replace(",", "");
});
Vue.filter("replaceDashes", function(time) {
  return time.replace(/\//g, "-");
});
Vue.filter("filterAvatar", function(username) {
  if (username == null) return "";

  let result = username.split(" ").map((item) => {
    return item.charAt(0);
  });

  result = result.join("");
  return result;
});
// TODO: Remove this filter and replace it with lib
// Safari doesn't recognize time in 0000-00-00 00:00:00 format toLocalString
Vue.filter("formatDate", function(date, locale, format) {
  if (date === undefined) {
    return;
  }
  date = date.toString().match(/\d{4}-\d{2}-\d{2}/) || [date];

  let result = new Date(date[0]).toLocaleString(locale, format);
  return result;
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
