<template>
  <div>
    <section class="customize-organisation container">
      <form class="add-organisation-info" @submit.prevent="onSubmit">
        <div class="customize-organisation-content">
          <h2 class="customize-organisation-title">Add organisation</h2>
          <!--  -->
          <div class="upload-organisation-image-wrap">
            <div class="organisation-image" @click="uploadOrgLogo">
              <img
                :src="reg.organisation_logo"
                style="width: 100%; height: 100%; background-color: rgba(0,0,0,.5); display: block;"
              />
            </div>

            <div class="add-org-photo">
              <input
                type="file"
                class="file-input"
                ref="fileInput"
                id="organisationLogo"
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

          <p
            style="margin-left: auto; margin-right: auto; text-align: center;"
          >Upload an organisation logo</p>
          <div class="section-title">
            <h3 class="section-title__heading">Main information:</h3>
          </div>
          <div class="input-row">
            <label for="organisation-name">
              Organisation Name *
              <input
                type="text"
                name="organisation-name"
                id="organisation-name"
                required
                v-model="reg.organisation_name"
              />
            </label>

            <label for="organisation-location">
              Organisation Location *
              <input
                type="text"
                name="organisation-location"
                id="organisation-location"
                required
                v-model="reg.organisation_location"
              />
            </label>
          </div>
          <div class="input-row">
            <label for="organisation-sector">
              Organisation Sector *
              <select
                name="organisation-sector"
                id="organisation-sector"
                v-model="reg.organisation_sector"
                required
              >
                <option
                  v-for="(sector, index) in sectors"
                  :key="'sector-'+index"
                  :value="sector.id"
                >{{sector.name}}</option>
              </select>
            </label>
            <label for="organisation-website">
              Organisation Website
              <input
                type="url"
                name="organisation-website"
                id="organisation-website"
                placeholder="https://www.yoursite.co.uk"
                v-model="reg.organisation_website"
              />
            </label>
          </div>
          <div class="input-row">
            <label for="organisation-sector">
              Main Goal *
              <select class="news-category__dropdown" v-model="reg.goal" required>
                <option disabled selected :value="null">Select goal</option>
                <option
                  v-for="item in goals"
                  :key="item.slug + item.id"
                  :value="item.slug"
                >{{item.name}}</option>
              </select>
            </label>
          </div>
          <div class="input-row">
            <label class="full-width">Goals *</label>
            <div class="goal-grid">
              <label
                class="form-checkbox-label"
                v-for="goal in goals"
                :key="'goal-additional-'+goal.id"
              >
                <img :src="$settings.images_path.goals + 's_' + goal.image" alt="icon" />
                <input type="checkbox" :value="goal.id" name="goals_checkbox[]" v-model="reg.goals" />
                <div class="checkbox"></div>
              </label>
            </div>
          </div>
          <div class="section-title">
            <h3 class="section-title__heading">Social media:</h3>
          </div>
          <div class="input-row">
            <label for="organisation-facebook">
              Facebook
              <input
                type="url"
                name="organisation-facebook"
                id="organisation-facebook"
                v-model="reg.facebook"
                placeholder="https://"
              />
            </label>
            <label for="organisation-linkedin">
              LinkedIn
              <input
                type="url"
                name="organisation-linkedin"
                id="organisation-linkedin"
                v-model="reg.linkedin"
                placeholder="https://"
              />
            </label>
            <label for="organisation-twitter">
              Twitter
              <input
                type="url"
                name="organisation-twitter"
                id="organisation-twitter"
                v-model="reg.twitter"
                placeholder="https://"
              />
            </label>
            <label for="organisation-instagram">
              Instagram
              <input
                type="url"
                name="organisation-instagram"
                id="organisation-instagram"
                v-model="reg.instagram"
                placeholder="https://"
              />
            </label>
          </div>

          <div class="section-title">
            <h3 class="section-title__heading">Complete your organisation profile:</h3>
          </div>
          <div class="add-organisation-info">
            <label for="organisation-description">Add a short description *</label>
            <textarea
              id="organisation-description"
              name="organisation-description"
              rows="3"
              placeholder
              required
              v-model="reg.description"
            ></textarea>
          </div>

          <label>Full description (minimum 32 characters) *:</label>
          <ckeditor :editor="editor" v-model="reg.description_full" :config="editorConfig"></ckeditor>
          <br />
          <!-- <label>Your project info:</label> -->
          <!-- <ckeditor :editor="editor" v-model="reg.our_project" :config="editorConfig"></ckeditor> -->

          <div class="section-title">
            <h3 class="section-title__heading">Organisation intro video:</h3>
          </div>
          <div class="add-organisation-video">
            <label for="organisation-video">
              Do you have video presentation of you organisation?
              <select v-model="video_display">
                <option v-bind:value="true">Yes</option>
                <option v-bind:value="false" checked>No</option>
              </select>
            </label>
            <div class="input-row" v-if="video_display">
              <label for="organisation-facebook">
                Video source
                <select v-model="reg.video_type">
                  <option value="youtube">YouTube</option>
                  <option value="vimeo">Vimeo</option>
                </select>
              </label>
              <label for="organisation-facebook">
                Video link
                <input type="url" v-model="reg.video_link" />
              </label>
            </div>
            <div class="input-row" v-if="!video_display">
              <label class="register-checkbox" style="width: 100%;">
                Offer you a free video production to showcase your charity, if you would like us to reach out and organise this with you please click here
                <input
                  type="checkbox"
                  class="fixed-checkbox"
                  v-model="reg.need_video"
                />
                <span class="register-checkmark">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.91006 10.4959L3.7071 8.29291C3.31658 7.90239 2.68342 7.90239 2.29289 8.29291C1.90237 8.68343 1.90237 9.3166 2.29289 9.70712L5.29288 12.7071C5.7168 13.131 6.4159 13.0892 6.7863 12.6178L13.7863 4.61786C14.1275 4.18359 14.0521 3.55494 13.6178 3.21372C13.1835 2.87251 12.5549 2.94795 12.2136 3.38222L5.91006 10.4959Z"
                      fill="#000"
                    />
                  </svg>
                </span>
              </label>
            </div>
          </div>

          <div class="checkbox-wrap">
            <label class="register-checkbox">
              I accept the following
              <a href="#">Terms and Conditions</a>
              <input type="checkbox" class="fixed-checkbox" required />
              <span class="register-checkmark">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.91006 10.4959L3.7071 8.29291C3.31658 7.90239 2.68342 7.90239 2.29289 8.29291C1.90237 8.68343 1.90237 9.3166 2.29289 9.70712L5.29288 12.7071C5.7168 13.131 6.4159 13.0892 6.7863 12.6178L13.7863 4.61786C14.1275 4.18359 14.0521 3.55494 13.6178 3.21372C13.1835 2.87251 12.5549 2.94795 12.2136 3.38222L5.91006 10.4959Z"
                    fill="#000"
                  />
                </svg>
              </span>
            </label>
          </div>

          <div class="finish-btn-wrap">
            <button
              class="finish-btn"
              type="submit"
              name="submit"
              value="finish-creating"
            >FINISH CREATING YOUR ORGANISATION</button>
          </div>
        </div>
      </form>
    </section>

    <Footer />
  </div>
</template>

<script>
import axios from "@/axios-auth";
import router from "@/router";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "Customize-organisation",
  data() {
    return {
      reg: {
        organisation_name: "",
        organisation_location: "",
        organisation_website: "",
        organisation_logo: null,
        organisation_sector: 1,
        facebook: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        description: "",
        description_full: "",
        need_video: false,
        video_type: null,
        video_link: null,
        goal: null,
        goals: []
        // our_project: ""
      },
      goals: [],
      video_display: false,
      organisationSectors: null,
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
      }
    };
  },
  computed: {
    sectors() {
      return this.organisationSectors;
    }
  },
  methods: {
    onSubmit() {
      if (this.reg.organisation_logo == null) {
        this.$swal({
          text: "Please add Organisation logo",
          icon: "info"
        }).then(() => {
          document.getElementById("organisationLogo").click();
        });
      } else if (this.reg.description_full.length < 32) {
        this.$swal({
          text:
            "Your organisation description should be longer that 32 characters",
          icon: "info"
        });
      } else {
        axios.post("/organisations", this.reg).then(
          res => {
            console.log("Organisation send success?", res);
            // TODO: Fix after getting array of errors
            this.$swal({
              text: res.data.message,
              icon: res.data.success ? "success" : "error"
            });
            if (res.data.success) {
              this.$store.commit(
                "user/SET_ORGANISATION_DATA",
                res.data.organisation
              );
              setTimeout(() => {
                router.push({
                  name: "organisation",
                  params: { slug: res.data.organisation.slug }
                });
              }, 5000);
            }
          },
          error => {
            console.error("Error", error.response);
            this.$swal({
              text: error.response.data.message,
              icon: "error"
            });
          }
        );
      }
    },
    chooseImage() {
      this.$refs.fileInput.click();
    },
    uploadOrgLogo() {
      document.getElementById("organisationLogo").click();
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          this.reg.organisation_logo = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    }
  },
  mounted() {
    // for debug features
    console.log(ClassicEditor.builtinPlugins.map(plugin => plugin.pluginName));
    axios
      .get("organisations/categories/all")
      .then(res => {
        this.organisationSectors = res.data.organisation_categories;
      })
      .catch(error => console.error(error));

    axios.get("/goals").then(res => {
      this.goals = res.data.goal_categories[0].goals;
    });
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/sections/_organisation-customize";

.fixed-checkbox {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 24px !important;
  height: 24px !important;
}

.file-input {
  z-index: 5;
}

.add-organisation-info .finish-btn {
  margin-top: 30px;
}

.goal-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 25px;

  label {
    width: 100% !important;
    height: 100% !important;
    margin: 0px !important;
  }

  .form-checkbox-label {
    position: relative;
    cursor: pointer;
    margin-bottom: 0px;

    .checkbox {
      width: 24px;
      height: 24px;
      background-color: #fff;
      border: 1px solid #393939;
      cursor: pointer;
      position: absolute;
      bottom: 0px;
      right: 0px;

      &::before {
        content: "\f00c";
        display: inline-block;
        font-family: FontAwesome;
        font-size: inherit;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 0px;
        transition: font-size 0.4s, background-color 0.4s;
      }
    }

    input[type="checkbox"] {
      position: absolute;
      bottom: 0px;
      right: 0px;
      opacity: 0;

      &:checked + .checkbox {
        background-color: #f4ed3b;
        &::before {
          @include font-size(1rem);
        }
      }
    }
  }

  img {
    width: 100%;
    height: auto;
    line-height: 1;
  }
}
</style>

<style>
.add-organisation-info .ck-editor__editable_inline {
  height: 300px;
}
</style>