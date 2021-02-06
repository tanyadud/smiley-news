<template>
  <div class="bg">
    <section class="registration-step-2 container">
      <div class="registration-progress">
        <div class="registration-progress__item done">Get Started</div>
        <div class="registration-progress__item active">About You</div>
        <div class="registration-progress__item">Looking for</div>
        <div class="registration-progress__item">Join the Smiley Community</div>
      </div>
      <h2 class="registration-title">Tell us a bit about you</h2>
      <p
        class="registration-subtitle"
      >First, we want to get to know you just a little better so you can see latest projects locally and attend events near you.</p>

      <form class="registration-2" @submit.prevent="submitUserData">
        <label for="display-name">
          Display Name*
          <span class="explanation-text">(This will be publicly shown on your profile)</span>
          <input
            type="text"
            name="display-name"
            id="display-name"
            v-model="user.display_name"
            minlength="6"
            placeholder
            required
          />
        </label>

        <div class="input-row">
          <label for="user-location">
            <span>Country</span>
            <select v-model="user.country" required>
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
              required
            ></vue-google-autocomplete>
          </label>
        </div>
        <div class="section-title">
          <h3 class="section-title__heading">Occupation type:</h3>
        </div>
        <div class="input-row">
          <label class="checkbox-label">
            <input
              type="radio"
              name="occupation_type"
              @click="user.occupation_sector = null"
              value="Private"
              v-model="user.occupation_type"
              required
            />
            <span>Private</span>
          </label>
          <label class="checkbox-label">
            <input
              type="radio"
              name="occupation_type"
              @click="user.occupation_sector = null"
              value="Public"
              v-model="user.occupation_type"
            />
            <span>Public</span>
          </label>
          <label class="checkbox-label">
            <input
              type="radio"
              name="occupation_type"
              @click="user.occupation_sector = null"
              value="Charity"
              v-model="user.occupation_type"
            />
            <span>Charity</span>
          </label>
          <label class="checkbox-label">
            <input
              type="radio"
              name="occupation_type"
              @click="user.occupation_sector = null"
              value="Student"
              v-model="user.occupation_type"
            />
            <span>Student</span>
          </label>
          <label class="checkbox-label">
            <input
              type="radio"
              name="occupation_type"
              @click="user.occupation_sector = null"
              value="Not currently working"
              v-model="user.occupation_type"
            />
            <span>Not currently working</span>
          </label>
          <label class="checkbox-label">
            <input
              type="radio"
              name="occupation_type"
              @click="user.occupation_sector = null"
              value="Retired"
              v-model="user.occupation_type"
            />
            <span>Retired</span>
          </label>
        </div>
        <label v-if="['Private', 'Public', 'Charity'].includes(user.occupation_type)">
          <span>Sector</span>
          <select v-model="user.occupation_sector" required>
            <option selected disabled :value="null">Select value</option>
            <option
              :value="item.value"
              v-for="item in occupations[user.occupation_type]"
              :key="item.value"
            >{{item.name}}</option>
          </select>
        </label>
        <label for="job-title">
          Job title
          <span class="explanation-text">(if applicable)</span>
          <input type="text" name="job-title" id="job-title" v-model="user.job_title" placeholder />
          <p class="explanation-text">(This will be publicly shown on your profile)</p>
        </label>
        <!-- <label for="organization-name">
        Organization
        <input
          type="text"
          name="organization-name"
          id="organization-name"
          placeholder="Search or add your organization"
        />
        </label>-->

        <div class="register-btn-wrap">
          <div></div>
          <button class="next-btn" type="submit" name="submit" value="register">Next</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import axios from "@/axios-auth";
import router from "@/router";

import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  components: { VueGoogleAutocomplete },
  data() {
    return {
      user: {
        display_name: "",
        job_title: "",
        country: "",
        city: "",
        occupation_type: null,
        occupation_sector: null
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
      ],
      occupations: {
        Private: [
          { value: 1, name: "Manufactoring" },
          { value: 2, name: "Services Sector" },
          { value: 3, name: "Construction" },
          { value: 4, name: "Retail" },
          { value: 5, name: "Housing & Hospitality" },
          { value: 6, name: "Food Services" },
          { value: 7, name: "Financial Services" },
          { value: 8, name: "Financial Services + Social Impact investor" },
          { value: 9, name: "Social Impact investor" },
          { value: 10, name: "Professional Services" },
          { value: 11, name: "Admin and support" },
          { value: 12, name: "Arts, Culture, Leisure" }
        ],
        Public: [
          { value: 1, name: "Public Services" },
          { value: 2, name: "Defence" },
          { value: 3, name: "Public Order and Safety" },
          { value: 4, name: "Economic Affairs" },
          { value: 5, name: "Health" },
          { value: 6, name: "Recreation, culture and religion" },
          { value: 7, name: "Education" },
          { value: 8, name: "Social Protection" },
          { value: 9, name: "Environmental Protection" },
          { value: 10, name: "Housing and Community" }
        ],
        Charity: [
          { value: 1, name: "Social Enterprise" },
          { value: 2, name: "Charity" },
          { value: 3, name: "Foundation/ endowment fund" },
          { value: 4, name: "Cooperative" }
        ]
      }
    };
  },
  methods: {
    submitUserData() {
      axios
        .post("/users/settings", this.user)
        .then(response => {
          router.push({
            name: "register-3"
          });
          this.$store.commit("user/SET_USERDATA", response.data);
        })
        .catch(error => {
          let content = JSON.parse(error.request.response);
          let finalMessage = content.errors.join("<br>");
          this.$swal({ text: finalMessage, icon: "error" });
        });
    },
    getToData(test, placeResult) {
      this.user.city = placeResult.address_components[0].long_name;
    }
  },
  mounted() {
    let googlePlaces = document.createElement("script");
    googlePlaces.setAttribute(
      "src",
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCxye6NLxY1fS_CCwwgYLcnwNIOzozGD9I&libraries=places"
    );
    document.head.appendChild(googlePlaces);
  }
};
</script>

<style lang="scss" scoped>
.bg {
  background-image: url("/img/register-bg.jpg");
  background-size: cover;
  padding-top: 48px;
  padding-bottom: 96px;
  color: #fff;
}

.registration-step-2 {
  text-align: center;
  margin-top: 76px;
  margin-bottom: 160px;
  .registration-title {
    color: #fff;
    font: 700 56px/74px "Montserrat Bold", sans-serif;
    margin-bottom: 10px;
  }
  .registration-subtitle {
    color: #fff;
    font: 400 22px/36px "Muli", sans-serif;
    max-width: 778px;
    margin: 0 auto 42px;
  }
  .registration-2 {
    width: 100%;
    max-width: 762px;
    text-align: left;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .explanation-text {
      font: 400 16px/36px "Muli", sans-serif;
      margin-left: 5px;
    }
    & > label {
      color: #fff;
      font: 700 16px/24px "Muli", sans-serif;

      input {
        margin: 2px auto 15px;
        width: 100%;
        max-width: 762px;
        height: 48px;
        border: 1px solid #c7c7c7;
        border-radius: 4px;
        box-sizing: border-box;
        font: 400 16px/24px "Muli", sans-serif;
        color: #656565;
        padding: 0 48px 0 16px;
      }
    }
    label[for="reg-location"] {
      position: relative;
      margin-bottom: 15px;
      input {
        margin-bottom: 0;
      }
      svg {
        position: absolute;
        right: 14px;
        bottom: 14px;
      }
    }
    //.wrap-for-sector-select{
    //  border-radius: 4px;
    //  box-sizing: border-box;
    //  height: 48px;
    //  position: relative;
    //  width: 100%;
    //  margin-top: 8px;
    //  select{
    //    padding: 0 48px 0 16px;
    //    width: 100%;
    //    border: 1px solid #C7C7C7;
    //    border-radius: 4px;
    //    height: 100%;
    //    color: #656565;
    //    cursor: pointer;
    //    appearance: none;
    //    -webkit-appearance: none;
    //    -moz-appearance: none;
    //    &::-ms-expand{
    //      display: none;             /* remove arrow IE     */
    //    }
    //    &:focus{
    //      outline: none;
    //    }
    //    option{
    //      color: #fff;
    //      &[disabled]{
    //        color: #656565;
    //      }
    //    }
    //
    //  }
    //  .select-arrows{
    //    display: flex;
    //    position: absolute;
    //    right: 18px;
    //    top: 14px;
    //  }
    //}
    .occupation-btns-group-title {
      font: 700 16px/24px "Muli", sans-serif;
      color: #fff;
      margin-top: 15px;
      margin-bottom: 4px;
    }
    .occupation-type-radio-btns {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 10px;
      .radio-btns-group {
        width: 100%;
        max-width: 205px;
      }
      label {
        font: 400 16px/36px "Muli", sans-serif;
        color: #fff;
        display: flex;
        align-items: center;
        margin: 10px 0;
        span {
          order: 2;
          padding-left: 15px;
          cursor: pointer;
        }
        input {
          display: none;
          & + div {
            width: 24px;
            height: 24px;
            border: 1px solid #c7c7c7;
            border-radius: 50%;
            position: relative;
            display: inline-block;
            order: 1;
            cursor: pointer;
          }
          &:checked + div {
            &:after {
              content: "";
              width: 13px;
              height: 13px;
              border-radius: 50%;
              background-color: #000;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
      }
    }
    label[for="job-title"] {
      // margin-top: 34px;
      input {
        margin-bottom: 9px;
      }
      p {
        margin: 0;
      }
    }
    label[for="organization-name"] {
      margin-top: 16px;
      input {
        margin-top: 8px;
        margin-bottom: 0;
      }
    }
    .register-btn-wrap {
      margin-top: 41px;
      display: flex;
      flex-direction: column;
      align-items: center;
      @include md {
        flex-direction: row;
        justify-content: space-between;
      }
      button {
        border-radius: 4px;
        height: 48px;
        width: 100%;
        max-width: 360px;
        font: 700 16px/24px "Montserrat Bold", sans-serif;
        color: #000;
        text-transform: uppercase;
        cursor: pointer;
        margin-bottom: 20px;
      }
    }
    .back-btn {
      background: transparent;
      border: 1px solid #c7c7c7;
      &:hover {
        background-color: #fff;
        color: gray;
        transition: 0.2s ease-in;
      }
    }
    .next-btn {
      background-color: $default-yellow-btns;
      border: none;
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
    color: #fff !important;

    span {
      color: #fff;
    }

    &.checkbox-label {
      width: calc(100% / 3 - 30px);

      @include mdMax {
        width: calc(50% - 30px);
      }

      @include smMax {
        width: 100%;
      }
    }

    @include smMax() {
      width: 100%;
    }
  }
}

label {
  color: #fff !important;
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

label {
  color: #fff;
}

.section-title {
  display: flex;
  flex-direction: row;
  align-items: center;

  .section-title__heading {
    font: 700 22px/28px "Muli", sans-serif;
    color: #fff;
  }
}

.registration-progress {
  position: relative;
  display: flex;
  justify-content: space-between;
  font-family: Muli, Arial, Helvetica, sans-serif;
  font-size: 18px;
  line-height: 1.5;

  &__item {
    width: 25%;
    text-align: center;
    position: relative;

    &:first-child {
      &.done {
        &::after {
          display: none;
        }
      }
    }

    &.done {
      &::after {
        background-color: #fdec01;
      }
      &::before {
        background-color: #fdec01;
        width: 43px;
        height: 43px;
        margin-top: 2px;
        background-image: url("/img/small-tick-black.png");
        background-position: center;
        background-repeat: no-repeat;
        margin-bottom: 15px;
      }
      font-weight: normal;
    }

    &.active {
      &::after {
        display: block;
        background-color: #fdec01;
      }
      &::before {
        background-color: #fdec01;
        width: 43px;
        height: 43px;
        margin-top: 2px;
        margin-bottom: 15px;
      }

      font-weight: bold;
    }

    &::before {
      width: 28px;
      height: 28px;
      content: "";
      display: block;
      text-align: center;
      margin: 9px auto 25px;
      border-radius: 50%;
      background-color: #fff;
      z-index: 3;
      position: relative;
    }

    &::after {
      width: 100%;
      height: 3px;
      content: "";
      position: absolute;
      background-color: #fff;
      top: 22px;
      left: -50%;
      z-index: 1;
    }
  }
}
</style>