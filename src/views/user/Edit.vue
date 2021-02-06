<template>
  <div>
    <div class="container">
      <form class="user-settings" @submit.prevent="onSubmit">
        <ul class="tabs-list">
          <li :class="{active: isActiveTab('main')}">
            <button type="button" @click="setActiveTab('main')">Main</button>
          </li>
          <li :class="{active: isActiveTab('goals')}">
            <button type="button" @click="setActiveTab('goals')">Goals</button>
          </li>
          <li :class="{active: isActiveTab('support')}">
            <button type="button" @click="setActiveTab('support')">Support</button>
          </li>
        </ul>
        <div class="tab-item" :class="{active: isActiveTab('main')}">
          <div class="section-title">
            <h3 class="section-title__heading">Profile picture:</h3>
          </div>
          <div class="upload-user-avatar-wrap" @click="uploadOrgLogo">
            <div class="user-avatar">
              <img
                :src="newAvatar"
                style="width: 100%; height: 100%; background-color: rgba(0,0,0,.5); display: block;"
              />
            </div>

            <div class="add-user-photo">
              <input
                type="file"
                class="file-input"
                ref="fileInput"
                id="userAvatarInput"
                @input="onSelectFile"
                accept=".png, .jpg, .jpeg"
              />
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 74.207 74.207"
                style="enable-background:new 0 0 74.207 74.207;"
                xml:space="preserve"
              >
                <g>
                  <path
                    d="M57.746,14.658h-2.757l-1.021-3.363c-0.965-3.178-3.844-5.313-7.164-5.313H28.801c-3.321,0-6.201,2.135-7.165,5.313
                      l-1.021,3.363h-4.153C7.385,14.658,0,22.043,0,31.121v20.642c0,9.077,7.385,16.462,16.462,16.462h41.283
                      c9.077,0,16.462-7.385,16.462-16.462V31.121C74.208,22.043,66.823,14.658,57.746,14.658z M68.208,51.762
                      c0,5.769-4.693,10.462-10.462,10.462H16.462C10.693,62.223,6,57.53,6,51.762V31.121c0-5.769,4.693-10.462,10.462-10.462h8.603
                      l2.313-7.621c0.192-0.631,0.764-1.055,1.423-1.055h18.003c0.659,0,1.23,0.424,1.423,1.057l2.314,7.619h7.204
                      c5.769,0,10.462,4.693,10.462,10.462L68.208,51.762L68.208,51.762z"
                    fill="#fff"
                  />
                  <path
                    d="M37.228,25.406c-8.844,0-16.04,7.195-16.04,16.04c0,8.844,7.195,16.039,16.04,16.039s16.041-7.195,16.041-16.039
                      C53.269,32.601,46.073,25.406,37.228,25.406z M37.228,51.486c-5.536,0-10.04-4.504-10.04-10.039c0-5.536,4.504-10.04,10.04-10.04
                      c5.537,0,10.041,4.504,10.041,10.04C47.269,46.982,42.765,51.486,37.228,51.486z"
                    fill="#fff"
                  />
                </g>
              </svg>
            </div>
          </div>
          <div class="section-title">
            <h3 class="section-title__heading">Main info:</h3>
          </div>
          <div class="input-row">
            <label for="user-full_name">
              Full name *
              <input
                type="text"
                name="user-full_name"
                id="user-full_name"
                required
                v-model="user.full_name"
              />
            </label>
            <label for="user-displayed_name">
              Displayed name *
              <input
                type="text"
                name="user-displayed_name"
                id="user-displayed_name"
                required
                v-model="user.display_name"
              />
            </label>
            <label for="user-date-of-birth">
              Date of Birth
              <input
                type="date"
                name="user-date-of-birth"
                id="user-date-of-birth"
                v-model="user.dob"
              />
            </label>
            <label for="job-title">
              Job Title
              <input
                type="text"
                name="job-title"
                id="job-title"
                v-model="user.job_title"
              />
            </label>
          </div>

          <div class="section-title">
            <h3 class="section-title__heading">Security:</h3>
          </div>
          <div class="input-row">
            <label for="user-password">
              Old password
              <input
                type="password"
                name="user-password"
                id="user-password"
                v-model="user.old_password"
              />
            </label>
            <label for="user-password-confirm">
              New password
              <input
                type="password"
                name="user-password-confirm"
                id="user-password-confirm"
                minlength="2"
                v-model="user.password"
              />
            </label>
          </div>

          <div class="section-title">
            <h3 class="section-title__heading">Location:</h3>
          </div>
          <div class="input-row">
            <label for="user-location">
              <span>Country</span>
              <select v-model="user.country">
                <option :value="item.code" v-for="item in countries" :key="item.code">{{item.name}}</option>
              </select>
            </label>
            <label v-if="user.country != ''">
              <span>City</span>
              <vue-google-autocomplete
                id="map"
                types="(cities)"
                class="form-control"
                :country="user.country"
                v-on:placechanged="getToData"
                placeholder="Start typing city name"
              ></vue-google-autocomplete>
            </label>
          </div>

          <div class="section-title">
            <h3 class="section-title__heading">Your social media:</h3>
          </div>
          <div class="input-row">
            <label for="user-social-facebook">
              Facebook
              <input
                type="url"
                name="user-social-facebook"
                id="user-social-facebook"
                v-model="user.facebook"
              />
            </label>
            <label for="user-social-linkedin">
              Linkedin
              <input
                type="url"
                name="user-social-linkedin"
                id="user-social-linkedin"
                v-model="user.linkedin"
              />
            </label>
            <label for="user-social-google-plust">
              Google+
              <input
                type="url"
                name="user-social-google-plust"
                id="user-social-google-plust"
                v-model="user.google"
              />
            </label>
            <label for="user-social-twitter">
              Twitter
              <input
                type="url"
                name="user-social-twitter"
                id="user-social-twitter"
                v-model="user.twitter"
              />
            </label>
            <label for="user-social-instagram">
              Instagram
              <input
                type="url"
                name="user-social-instagram"
                id="user-social-instagram"
                v-model="user.instagram"
              />
            </label>
          </div>

          <div class="section-title">
            <h3 class="section-title__heading">Survey:</h3>
          </div>
          <div class="input-row">
            <label>
              <span>How did you hear about us?</span>
              <select v-model="user.survey">
                <option value="1">Social Media</option>
                <option value="2">Google (Bing, etc) search</option>
                <option value="3">I attended a Smiley Movement event</option>
                <option value="4">From a friend</option>
                <option value="5">I received an email from Smiley Movement</option>
                <option value="6">I received a call from Smiley Movement</option>
                <option value="7">Other (Please specify)</option>
              </select>
            </label>
            <label v-if="user.survey == 7" for="survey_other">
              <span>
                <br />
              </span>
              <input
                type="text"
                name="survey_other"
                id="survey_other"
                v-model="user.survey_other"
                placeholder="Specify here"
              />
            </label>
          </div>

          <div class="section-title">
            <h3 class="section-title__heading">Tell us more about yourself:</h3>
          </div>
          <ckeditor :editor="editor" :config="editorConfig" v-model="user.bio"></ckeditor>
        </div>
        <div class="tab-item" :class="{active: isActiveTab('goals')}">
          <div class="section-title">
            <h3 class="section-title__heading">UN goals you are interested in:</h3>
          </div>
          <div class="input-row">
            <label v-for="goal in allGoals" :key="goal.id" class="checkbox-label">
              <input type="checkbox" :value="goal.id" v-model="user.goals" />
              <span>{{goal.name}}</span>
            </label>
          </div>
        </div>
        <div class="tab-item" :class="{active: isActiveTab('support')}">
          <div class="section-title">
            <h3 class="section-title__heading">
              Support I
              <u>Offer</u>
            </h3>
          </div>
          <template v-for="item in allSupports">
            <div :key="item.id + 'support-offer'">
              <h4>{{item.title}}</h4>
              <div class="input-row">
                <label
                  v-for="option in item.supports"
                  :key="option.id+'support-offer-option'"
                  class="checkbox-label"
                >
                  <input type="checkbox" :value="option.id" v-model="user.offer" />
                  <span>{{option.title}}</span>
                </label>
              </div>
            </div>
          </template>
          <div class="section-title">
            <h3 class="section-title__heading">
              Support I
              <u>Need</u>
            </h3>
          </div>
          <template v-for="item in allSupports">
            <div :key="item.id + 'support-need'">
              <h4>{{item.title}}</h4>
              <div class="input-row">
                <label
                  v-for="option in item.supports"
                  :key="option.id+'support-need-option'"
                  class="checkbox-label"
                >
                  <input type="checkbox" :value="option.id" v-model="user.need" />
                  <span>{{option.title}}</span>
                </label>
              </div>
            </div>
          </template>
        </div>
        <div class="finish-btn-wrap">
          <button
            class="finish-btn"
            type="submit"
            name="submit"
            value="finish-creating"
          >Save profile</button>
          <button type="button" class="discard" @click.prevent="goToProfile">Discard changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "@/axios-auth";
import router from "@/router";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  data() {
    return {
      tempDate: null,
      activeTab: "main",
      // User fields
      user: {
        full_name: "",
        display_name: "",

        bio: "",
        job_title: "",

        avatar_image: null,

        old_password: null,
        password: null,
        location: "",
        charity_number: null,
        dob: null,

        // Social links
        facebook: "",
        linkedin: "",
        google: "",
        twitter: "",
        instagram: "",
        goals: [],
        offer: [],
        need: [],
        survey: null,
        survey_other: null,

        country: "",
        city: ""
      },
      // -
      avatarHolder: null,
      // All goals
      allGoals: [],
      allSupports: [],
      userSupports: [],
      userNeeds: [],
      // Editor
      editor: ClassicEditor,
      editorConfig: {
        removePlugins: [
          "EasyImage",
          "Image",
          "ImageCaption",
          "ImageStyle",
          "ImageToolbar",
          "ImageUpload"
        ]
      },
      countries: [
        { name: "Afghanistan", code: "AF" },
        { name: "Åland Islands", code: "AX" },
        { name: "Albania", code: "AL" },
        { name: "Algeria", code: "DZ" },
        { name: "American Samoa", code: "AS" },
        { name: "AndorrA", code: "AD" },
        { name: "Angola", code: "AO" },
        { name: "Anguilla", code: "AI" },
        { name: "Antarctica", code: "AQ" },
        { name: "Antigua and Barbuda", code: "AG" },
        { name: "Argentina", code: "AR" },
        { name: "Armenia", code: "AM" },
        { name: "Aruba", code: "AW" },
        { name: "Australia", code: "AU" },
        { name: "Austria", code: "AT" },
        { name: "Azerbaijan", code: "AZ" },
        { name: "Bahamas", code: "BS" },
        { name: "Bahrain", code: "BH" },
        { name: "Bangladesh", code: "BD" },
        { name: "Barbados", code: "BB" },
        { name: "Belarus", code: "BY" },
        { name: "Belgium", code: "BE" },
        { name: "Belize", code: "BZ" },
        { name: "Benin", code: "BJ" },
        { name: "Bermuda", code: "BM" },
        { name: "Bhutan", code: "BT" },
        { name: "Bolivia", code: "BO" },
        { name: "Bosnia and Herzegovina", code: "BA" },
        { name: "Botswana", code: "BW" },
        { name: "Bouvet Island", code: "BV" },
        { name: "Brazil", code: "BR" },
        { name: "British Indian Ocean Territory", code: "IO" },
        { name: "Brunei Darussalam", code: "BN" },
        { name: "Bulgaria", code: "BG" },
        { name: "Burkina Faso", code: "BF" },
        { name: "Burundi", code: "BI" },
        { name: "Cambodia", code: "KH" },
        { name: "Cameroon", code: "CM" },
        { name: "Canada", code: "CA" },
        { name: "Cape Verde", code: "CV" },
        { name: "Cayman Islands", code: "KY" },
        { name: "Central African Republic", code: "CF" },
        { name: "Chad", code: "TD" },
        { name: "Chile", code: "CL" },
        { name: "China", code: "CN" },
        { name: "Christmas Island", code: "CX" },
        { name: "Cocos (Keeling) Islands", code: "CC" },
        { name: "Colombia", code: "CO" },
        { name: "Comoros", code: "KM" },
        { name: "Congo", code: "CG" },
        { name: "Congo, The Democratic Republic of the", code: "CD" },
        { name: "Cook Islands", code: "CK" },
        { name: "Costa Rica", code: "CR" },
        { name: "Cote D'Ivoire", code: "CI" },
        { name: "Croatia", code: "HR" },
        { name: "Cuba", code: "CU" },
        { name: "Cyprus", code: "CY" },
        { name: "Czech Republic", code: "CZ" },
        { name: "Denmark", code: "DK" },
        { name: "Djibouti", code: "DJ" },
        { name: "Dominica", code: "DM" },
        { name: "Dominican Republic", code: "DO" },
        { name: "Ecuador", code: "EC" },
        { name: "Egypt", code: "EG" },
        { name: "El Salvador", code: "SV" },
        { name: "Equatorial Guinea", code: "GQ" },
        { name: "Eritrea", code: "ER" },
        { name: "Estonia", code: "EE" },
        { name: "Ethiopia", code: "ET" },
        { name: "Falkland Islands (Malvinas)", code: "FK" },
        { name: "Faroe Islands", code: "FO" },
        { name: "Fiji", code: "FJ" },
        { name: "Finland", code: "FI" },
        { name: "France", code: "FR" },
        { name: "French Guiana", code: "GF" },
        { name: "French Polynesia", code: "PF" },
        { name: "French Southern Territories", code: "TF" },
        { name: "Gabon", code: "GA" },
        { name: "Gambia", code: "GM" },
        { name: "Georgia", code: "GE" },
        { name: "Germany", code: "DE" },
        { name: "Ghana", code: "GH" },
        { name: "Gibraltar", code: "GI" },
        { name: "Greece", code: "GR" },
        { name: "Greenland", code: "GL" },
        { name: "Grenada", code: "GD" },
        { name: "Guadeloupe", code: "GP" },
        { name: "Guam", code: "GU" },
        { name: "Guatemala", code: "GT" },
        { name: "Guernsey", code: "GG" },
        { name: "Guinea", code: "GN" },
        { name: "Guinea-Bissau", code: "GW" },
        { name: "Guyana", code: "GY" },
        { name: "Haiti", code: "HT" },
        { name: "Heard Island and Mcdonald Islands", code: "HM" },
        { name: "Holy See (Vatican City State)", code: "VA" },
        { name: "Honduras", code: "HN" },
        { name: "Hong Kong", code: "HK" },
        { name: "Hungary", code: "HU" },
        { name: "Iceland", code: "IS" },
        { name: "India", code: "IN" },
        { name: "Indonesia", code: "ID" },
        { name: "Iran, Islamic Republic Of", code: "IR" },
        { name: "Iraq", code: "IQ" },
        { name: "Ireland", code: "IE" },
        { name: "Isle of Man", code: "IM" },
        { name: "Israel", code: "IL" },
        { name: "Italy", code: "IT" },
        { name: "Jamaica", code: "JM" },
        { name: "Japan", code: "JP" },
        { name: "Jersey", code: "JE" },
        { name: "Jordan", code: "JO" },
        { name: "Kazakhstan", code: "KZ" },
        { name: "Kenya", code: "KE" },
        { name: "Kiribati", code: "KI" },
        { name: "Korea, Democratic People'S Republic of", code: "KP" },
        { name: "Korea, Republic of", code: "KR" },
        { name: "Kuwait", code: "KW" },
        { name: "Kyrgyzstan", code: "KG" },
        { name: "Lao People'S Democratic Republic", code: "LA" },
        { name: "Latvia", code: "LV" },
        { name: "Lebanon", code: "LB" },
        { name: "Lesotho", code: "LS" },
        { name: "Liberia", code: "LR" },
        { name: "Libyan Arab Jamahiriya", code: "LY" },
        { name: "Liechtenstein", code: "LI" },
        { name: "Lithuania", code: "LT" },
        { name: "Luxembourg", code: "LU" },
        { name: "Macao", code: "MO" },
        { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
        { name: "Madagascar", code: "MG" },
        { name: "Malawi", code: "MW" },
        { name: "Malaysia", code: "MY" },
        { name: "Maldives", code: "MV" },
        { name: "Mali", code: "ML" },
        { name: "Malta", code: "MT" },
        { name: "Marshall Islands", code: "MH" },
        { name: "Martinique", code: "MQ" },
        { name: "Mauritania", code: "MR" },
        { name: "Mauritius", code: "MU" },
        { name: "Mayotte", code: "YT" },
        { name: "Mexico", code: "MX" },
        { name: "Micronesia, Federated States of", code: "FM" },
        { name: "Moldova, Republic of", code: "MD" },
        { name: "Monaco", code: "MC" },
        { name: "Mongolia", code: "MN" },
        { name: "Montserrat", code: "MS" },
        { name: "Morocco", code: "MA" },
        { name: "Mozambique", code: "MZ" },
        { name: "Myanmar", code: "MM" },
        { name: "Namibia", code: "NA" },
        { name: "Nauru", code: "NR" },
        { name: "Nepal", code: "NP" },
        { name: "Netherlands", code: "NL" },
        { name: "Netherlands Antilles", code: "AN" },
        { name: "New Caledonia", code: "NC" },
        { name: "New Zealand", code: "NZ" },
        { name: "Nicaragua", code: "NI" },
        { name: "Niger", code: "NE" },
        { name: "Nigeria", code: "NG" },
        { name: "Niue", code: "NU" },
        { name: "Norfolk Island", code: "NF" },
        { name: "Northern Mariana Islands", code: "MP" },
        { name: "Norway", code: "NO" },
        { name: "Oman", code: "OM" },
        { name: "Pakistan", code: "PK" },
        { name: "Palau", code: "PW" },
        { name: "Palestinian Territory, Occupied", code: "PS" },
        { name: "Panama", code: "PA" },
        { name: "Papua New Guinea", code: "PG" },
        { name: "Paraguay", code: "PY" },
        { name: "Peru", code: "PE" },
        { name: "Philippines", code: "PH" },
        { name: "Pitcairn", code: "PN" },
        { name: "Poland", code: "PL" },
        { name: "Portugal", code: "PT" },
        { name: "Puerto Rico", code: "PR" },
        { name: "Qatar", code: "QA" },
        { name: "Reunion", code: "RE" },
        { name: "Romania", code: "RO" },
        { name: "Russian Federation", code: "RU" },
        { name: "RWANDA", code: "RW" },
        { name: "Saint Helena", code: "SH" },
        { name: "Saint Kitts and Nevis", code: "KN" },
        { name: "Saint Lucia", code: "LC" },
        { name: "Saint Pierre and Miquelon", code: "PM" },
        { name: "Saint Vincent and the Grenadines", code: "VC" },
        { name: "Samoa", code: "WS" },
        { name: "San Marino", code: "SM" },
        { name: "Sao Tome and Principe", code: "ST" },
        { name: "Saudi Arabia", code: "SA" },
        { name: "Senegal", code: "SN" },
        { name: "Serbia and Montenegro", code: "CS" },
        { name: "Seychelles", code: "SC" },
        { name: "Sierra Leone", code: "SL" },
        { name: "Singapore", code: "SG" },
        { name: "Slovakia", code: "SK" },
        { name: "Slovenia", code: "SI" },
        { name: "Solomon Islands", code: "SB" },
        { name: "Somalia", code: "SO" },
        { name: "South Africa", code: "ZA" },
        { name: "South Georgia and the South Sandwich Islands", code: "GS" },
        { name: "Spain", code: "ES" },
        { name: "Sri Lanka", code: "LK" },
        { name: "Sudan", code: "SD" },
        { name: "Suriname", code: "SR" },
        { name: "Svalbard and Jan Mayen", code: "SJ" },
        { name: "Swaziland", code: "SZ" },
        { name: "Sweden", code: "SE" },
        { name: "Switzerland", code: "CH" },
        { name: "Syrian Arab Republic", code: "SY" },
        { name: "Taiwan, Province of China", code: "TW" },
        { name: "Tajikistan", code: "TJ" },
        { name: "Tanzania, United Republic of", code: "TZ" },
        { name: "Thailand", code: "TH" },
        { name: "Timor-Leste", code: "TL" },
        { name: "Togo", code: "TG" },
        { name: "Tokelau", code: "TK" },
        { name: "Tonga", code: "TO" },
        { name: "Trinidad and Tobago", code: "TT" },
        { name: "Tunisia", code: "TN" },
        { name: "Turkey", code: "TR" },
        { name: "Turkmenistan", code: "TM" },
        { name: "Turks and Caicos Islands", code: "TC" },
        { name: "Tuvalu", code: "TV" },
        { name: "Uganda", code: "UG" },
        { name: "Ukraine", code: "UA" },
        { name: "United Arab Emirates", code: "AE" },
        { name: "United Kingdom", code: "GB" },
        { name: "United States", code: "US" },
        { name: "United States Minor Outlying Islands", code: "UM" },
        { name: "Uruguay", code: "UY" },
        { name: "Uzbekistan", code: "UZ" },
        { name: "Vanuatu", code: "VU" },
        { name: "Venezuela", code: "VE" },
        { name: "Viet Nam", code: "VN" },
        { name: "Virgin Islands, British", code: "VG" },
        { name: "Virgin Islands, U.S.", code: "VI" },
        { name: "Wallis and Futuna", code: "WF" },
        { name: "Western Sahara", code: "EH" },
        { name: "Yemen", code: "YE" },
        { name: "Zambia", code: "ZM" },
        { name: "Zimbabwe", code: "ZW" }
      ]
    };
  },
  components: { VueGoogleAutocomplete },
  computed: {
    newAvatar() {
      return this.user.avatar_image || this.avatarHolder;
    }
  },
  methods: {
    isActiveTab(menuItem) {
      return this.activeTab === menuItem;
    },
    setActiveTab(menuItem) {
      this.activeTab = menuItem;
    },
    getToData(test, placeResult) {
      console.log('GA', placeResult.address_components[0].long_name);
      this.user.city = placeResult.address_components[0].long_name;
    },
    getLocation() {
      let location;

      let modal = this.$swal;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            axios
              .get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=`
              )
              .then(res => {
                console.log("google", res);
              })
              .catch(error => console.error("error", error));
          },
          function(error) {
            if (error.code == error.PERMISSION_DENIED) {
              modal({ text: "Please enable geolocation", icon: "info" });
            }
          }
        );
      } else {
        this.$swal({ text: "Geolocation is not supported by this browser." });
      }

      function getData(position) {
        console.log(position);
      }
    },
    onSubmit() {
      axios
        .post("/users/settings", this.user)
        .then(response => {
          this.$swal({ text: "Profile Updated", icon: "success" }).then(() => {
            router.push({
              name: "profile"
            });
          });
          this.$store.commit("user/SET_USERDATA", response.data);
        })
        .catch(error => {
          let content = JSON.parse(error.request.response);
          let finalMessage = content.errors.join("<br>");
          this.$swal({ text: finalMessage, icon: "error" });
        });
    },
    formatDateOfBirth() {
      let date = new Date(this.tempDate);
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      this.user.dob = month + "/" + day + "/" + year;
    },
    chooseImage() {
      this.$refs.fileInput.click();
    },
    uploadOrgLogo() {
      document.getElementById("userAvatarInput").click();
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          this.user.avatar_image = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
    goToProfile() {
      router.push({
        name: "profile"
      });
    },
    isSupportChecked(id, type = "offer") {
      if (type == "offer") {
        // console.log("offer check, current id: ", id);
        let isInSupport = this.userSupports.filter(item => item.id === id);
        console.log("array length", isInSupport.length);
        return isInSupport.length > 0 ? true : false;
      } else {
        console.log("needs check");
        let isInNeeded = this.userNeeds.filter(item => item.id == id);
        return isInNeeded.length > 0 ? true : false;
      }
    }
  },
  mounted() {
    axios
      .get("/users/settings")
      .then(response => {
        console.log(response);
        this.user.full_name = response.data.user.full_name;
        this.user.display_name = response.data.user.display_name;
        this.user.job_title = response.data.user.job_title;
        this.user.country = response.data.user.country;
        this.user.city = response.data.user.city;
        this.user.dob = response.data.user.dob;
        this.user.bio = response.data.user.bio;
        // this.user.location = response.data.user.location;
        this.user.facebook = response.data.user.facebook;
        this.user.linkedin = response.data.user.linkedin;
        this.user.google = response.data.user.google;
        this.user.instagram = response.data.user.instagram;
        this.user.twitter = response.data.user.twitter;



        this.avatarHolder =
          "https://new-smiley.s3.eu-west-2.amazonaws.com/users/s_" +
          response.data.user.avatar;

        console.log(this.avatarHolder);

        this.user.goals = response.data.goals;

        this.allSupports = response.data.all_supports;

        this.user.need = response.data.need_support.map(item => item.id);
        this.user.offer = response.data.offer_support.map(item => item.id);

        this.allGoals = response.data.all_goals;

        setTimeout(function(){
        document.getElementById('map').value = response.data.user.city;
        }, 1500);
      })
      .catch(error => console.error(error.request));

    // Load google places API
    let googlePlaces = document.createElement("script");
    googlePlaces.setAttribute(
      "src",
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCxye6NLxY1fS_CCwwgYLcnwNIOzozGD9I&libraries=places"
    );
    document.head.appendChild(googlePlaces);
  }
};
</script>

<style lang="scss">
.user-settings {
  max-width: 960px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 48px auto;
}

.section-title {
  display: flex;
  flex-direction: row;
  align-items: center;

  .section-title__heading {
    font: 700 22px/28px "Muli", sans-serif;
    color: $default-text;
  }
}

.upload-user-avatar-wrap {
  width: 174px;
  height: 174px;
  position: relative;
  margin: 0 auto;

  .user-avatar {
    border-radius: 50%;
    overflow: hidden;
    height: 100%;
    cursor: pointer;

    img {
      height: 100%;
    }
  }

  .add-user-photo {
    width: 53px;
    height: 53px;
    border: 3px solid #fff;
    border-radius: 50%;
    background-color: #656565;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    box-sizing: border-box;
    top: 0;
    right: 0;

    input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      border-radius: 50%;
      cursor: pointer;
    }

    svg {
      width: 20px;
      height: 20px;
      z-index: 0;
    }
  }
}

.input-row {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-left: -15px;
  margin-right: -15px;

  label {
    width: calc(50% - 30px);
    margin-left: 15px;
    margin-right: 15px;

    @include smMax() {
      width: 100%;
    }
  }
}

label {
  color: $default-text;
  font: 700 16px/24px "Muli", sans-serif;

  input,
  select {
    display: block;
    margin: 7px auto 25px;
    width: 100%;
    box-sizing: border-box;
    height: 48px;
    border: 1px solid #c7c7c7;
    border-radius: 4px;
    font: 400 16px/24px "Muli", sans-serif;
    color: #656565;
    padding: 0 48px 0 16px;
    background-color: #fff;
  }
}

.ck-editor__editable_inline {
  height: 300px;
}

.finish-btn-wrap {
  display: flex;
  margin-top: 48px;
  justify-content: space-between;
  flex-wrap: wrap;

  button {
    border-radius: 4px;
    background-color: $default-yellow-btns;
    height: 48px;
    width: 45%;
    border: none;
    font: 700 16px/24px "Montserrat Bold", sans-serif;
    color: #000;
    text-transform: uppercase;
    cursor: pointer;
    margin-bottom: 24px;

    @include smMax {
      width: 100%;
    }

    &:hover {
      background-color: #f6f162;
      box-shadow: 0 2px 28px -13px rgba(0, 0, 0, 0.4);
      color: #000;
      transition: all 0.2s ease;
    }

    &.discard {
      background-color: #656565;
      color: #fff;
    }
  }
}

.checkbox-label {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 24px;

  input {
    margin: 0px 12px 0px 0px !important;
    width: 24px;
    height: 24px;
  }

  span {
    flex: 1;
  }
}

.tabs-list {
  display: flex;
  text-transform: uppercase;

  border-bottom: 5px solid #656565;
  // padding-bottom: 24px;

  li {
    &:not(:last-child) {
      margin-right: 24px;
    }
    padding-bottom: 24px;
    margin-bottom: -5px;

    button {
      background-color: transparent;
      border: none;
      font: 700 24px/34px "Muli", sans-serif;
    }

    &.active {
      border-bottom: 5px solid yellow;
      background-color: #656565;

      button {
        color: #ffec00;
      }
    }
  }
}

.tab-item {
  display: none;

  &.active {
    display: block;
  }
}
</style>