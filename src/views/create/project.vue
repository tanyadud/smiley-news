<template>
  <div>
    <div class="hero"></div>
    <div class="container post-title">
      <div class="post-title__title">Start a project</div>
      <p>Turn ideas into action and start a project form.</p>
    </div>
    <form class="grid container" @submit.prevent="createProject">
      <div class="grid-column">
        <div class="form-group">
          <label for="projectName">Name your Project *</label>
          <input
            type="text"
            class="form-control"
            id="projectName"
            placeholder="What's the problem you're trying to solve?"
            required
            v-model="project.title"
          />
        </div>
        <div class="form-group">
          <label for="projectDescription">Tell us about your project in a few words *</label>
          <div class="description-chars-count">
            <textarea
              class="form-control"
              id="projectDescription"
              placeholder="What is your end goal? (e.g improved wheelchair access in local community)"
              v-model="project.description"
              required
              maxlength="400"
            ></textarea>
            <div class="description-chars-count__count">{{descriptionChars}}</div>
          </div>
        </div>
        <div class="form-group">
          <label for="projectLocation">Project Location *</label>
          <gmap-autocomplete
            required
            class="form-control"
            @place_changed="getAddressData"
            placeholder="Start typing"
          ></gmap-autocomplete>
        </div>
        <div class="form-group">
          <label>Choose interests *</label>
          <div class="goal-grid">
            <label class="form-checkbox-label" v-for="goal in goals" :key="'goal-'+goal.id">
              <img :src="$settings.images_path.goals + 's_' + goal.image" alt="icon" />
              <input
                type="checkbox"
                :value="goal.id"
                name="goals_checkbox[]"
                v-model="project.goals"
              />
              <div class="checkbox"></div>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label class="form-control--inline" for="projectDonation">
            <input
              type="checkbox"
              name="projectDonation"
              id="projectDonation"
              v-model="project.donation.active"
            />
            <div class="checkbox"></div>
            <span>Add a Donation area to your project</span>
          </label>
        </div>
        <div class="form-group" v-if="project.donation.active">
          <label for="donationLink">Add a donation link *</label>
          <input
            type="url"
            class="form-control"
            id="donationLink"
            placeholder="Paste your link here (start with https://)"
            pattern="https://.*"
            required
            v-model="project.donation.link"
          />
        </div>
        <div class="form-group" v-if="project.donation.active">
          <label for="donationDescription">
            Explain why do you need financial support?*
            <small>Max. 400 characters</small>
          </label>
          <textarea
            class="form-control"
            id="donationDescription"
            placeholder="Why do you need funding?"
            v-model="project.donation.description"
            maxlength="500"
            required
          ></textarea>
        </div>
      </div>
      <div class="grid-column">
        <div class="form-group">
          <label for="projectAffected">Who is most affected? *</label>
          <div
            class="input-controls"
            v-for="(item, index) in project.affected"
            :key="'affected-'+index"
          >
            <input
              type="text"
              class="form-control"
              id="projectAffected"
              placeholder="Who is most affected?"
              v-model="project.affected[index]"
              required
            />
            <div class="input-controls__controls">
              <button @click.prevent="removeAffectedItem(index)" v-if="index >= 1">
                <i class="fa fa-remove"></i>
              </button>
              <button @click.prevent="addAffectedItem" v-if="index + 1 == project.affected.length">
                <i class="fa fa-plus-circle"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Project Stage *</label>
          <div class="form-group--grid">
            <label class="form-control--inline" v-for="stage in stages" :key="'stage-'+stage.id">
              <input
                type="radio"
                name="projectStage"
                :value="stage.id"
                v-model="project.stage"
                required
              />
              <div class="radio"></div>
              <span>{{stage.title}}</span>
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="projectStepsCount">Steps needed for change? *</label>
          <select class="form-control" id="projectStepsCount" v-model="project.steps.count">
            <option v-for="index in 9" :key="'step-count-'+index" :value="index">{{index}}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Define these steps</label>
          <div class="steps" v-for="index in project.steps.count" :key="'step-'+index">
            <div class="steps__step">{{index}}</div>
            <input
              type="text"
              class="form-control steps__input"
              v-model="project.steps.items[index - 1]"
              required
              :placeholder="helpers[0]"
            />
          </div>
        </div>
        <div class="form-group">
          <label>
            Upload a Project photo
            <small>(File size max 2mb, JPEG or PNG only)</small>
          </label>
          <input
            type="file"
            ref="fileInput"
            class="form-control"
            @input="onSelectFile"
            id="projectPhoto"
            accept=".jpg, .jpeg, .png"
            required
          />
        </div>
        <div class="form-group">
          <label>
            What support / resources do you need ? *
            <small>Select from the list belowe (minimum of 3)</small>
          </label>
          <div
            class="select-support"
            v-for="(item, index) in project.support"
            :key="'support-skill-' + item.id + '-' + index"
          >
            <select class="form-control" v-model="project.support[index].category">
              <option
                v-for="parentCategory in supports"
                :key="parentCategory.id"
                :value="parentCategory.id"
              >{{parentCategory.title}}</option>
            </select>
            <select class="form-control" required v-model="project.support[index].value">
              <option
                v-for="childCategory in categoryItems(project.support[index].category)"
                :key="childCategory.id"
                :value="childCategory.id"
              >{{childCategory.title}}</option>
            </select>
            <div class="select-support__controls">
              <button @click.prevent="removeSupportItem(index)" v-if="index >= 3">
                <i class="fa fa-remove"></i>
              </button>
              <button v-if="index + 1 == project.support.length" @click.prevent="addSupportItem">
                <i class="fa fa-plus-circle"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-column grid-column--full-width">
        <hr />
        <br />
        <br />
        <button type="submit">Create project</button>
        <br />
        <br />
        <br />
      </div>
    </form>
    <Footer />
  </div>
</template>

<script>
import axios from "@/axios-auth";
import router from "@/router";

import VueGoogleAutocomplete from "vue-google-autocomplete";
import { gmapApi } from "vue2-google-maps";

import Footer from "@/components/Footer";

export default {
  name: "CreateProject",
  components: {
    VueGoogleAutocomplete,
    Footer
  },
  data() {
    return {
      project: {
        title: null,
        description: "",
        city: null,
        country: null,
        latitude: null,
        longitude: null,
        goals: [],
        support: [
          {
            category: 1,
            value: 12
          },
          {
            category: 1,
            value: 12
          },
          {
            category: 1,
            value: 12
          }
        ],
        donation: {
          active: false,
          link: null,
          description: null
        },
        affected: [null],
        stage: null,
        steps: {
          count: 1,
          items: []
        },
        photo: null
      },
      helpers: [
        "i.e. Market the problem on the Network",
        "i.e. Start fundraising, petition etc",
        "i.e. Reach fundraising target"
      ],
      stages: [],
      goals: [],
      supports: []
    };
  },
  computed: {
    google: gmapApi,
    descriptionChars: function() {
      const charsLeft = 400 - this.project.description.length;
      return charsLeft;
    }
  },
  methods: {
    onSelectFile() {
      let photo = null;
      const input = this.$refs.fileInput;
      const files = input.files;
      const fileSize = files[0].size;
      if (files && files[0] && fileSize < 2000000) {
        const reader = new FileReader();
        reader.onload = e => {
          photo = e.target.result;
          this.project.photo = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      } else {
        this.$swal({ text: "File is too big to upload", icon: "error" });
        input.value = "";
      }
    },
    addAffectedItem() {
      this.project.affected.push(null);
    },
    addSupportItem() {
      this.project.support.push({
        skill: 1,
        value: 12
      });
    },
    removeSupportItem(index) {
      this.project.support.splice(index, 1);
    },
    removeAffectedItem(index) {
      this.project.affected.splice(index, 1);
    },
    categoryItems(id) {
      const element = this.supports.find(cat => cat.id == id);

      return element?.supports ? element.supports : null;
    },
    getAddressData: function(data) {
      data.address_components.forEach(prop => {
        if (prop.types.includes("locality")) {
          this.project.city = prop.long_name;
        }
        if (prop.types.includes("country")) {
          this.project.country = prop.long_name;
        }
      });
      this.project.latitude = data.geometry.location.lat();
      this.project.longitude = data.geometry.location.lng();
    },
    createProject() {
      if (0 != this.project.goals.length) {
        axios
          .post("/projects", this.project)
          .then(res => {
            console.log("Project saved", res);
            router.push({
              name: "project",
              params: { slug: res.data.project_slug }
            });
          })
          .catch(err => console.error(err));
      } else if (null == this.project.city || null == this.project.country) {
        this.$swal({
          icon: "info",
          text: "Please enter your project location properly"
        });
      } else {
        this.$swal({
          icon: "info",
          text: "Please check at least one interest"
        });
      }
    }
  },
  watch: {
    "project.donation.active": function() {
      this.project.donation.link = null;
      this.project.donation.description = null;
    },
    "project.steps.count": function() {
      this.project.steps.items.length = this.project.steps.count;
    }
  },
  mounted() {
    axios.get("/projects/create").then(res => {
      console.log("Project creation settings", res);
      this.supports = res.data.support_categories;
      this.goals = res.data.goals;
      this.stages = res.data.stages;
    });
  }
};
</script>

<style lang="scss" scoped>
.hero {
  width: 100%;
  height: 255px;
  background-image: url("/img/project-creation-hero.jpg");
  background-size: cover;
  background-position: center;
  @include margin-bottom(2rem);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;

  .grid-column {
    &--full-width {
      grid-column: 1 / span 2;
    }
  }
}

.select-support {
  display: grid;
  grid-template-columns: 2fr 3fr 1fr;
  grid-gap: 17px;
  margin-bottom: 16px;

  .select-support__controls {
    display: flex;
    line-height: 1;
    align-items: center;
    @include font-size(1.5rem);

    button {
      background: none;
      border: none;
      margin: 0px 5px;
    }
  }
}

.input-controls {
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-gap: 17px;
  margin-bottom: 16px;

  .input-controls__controls {
    display: flex;
    line-height: 1;
    align-items: center;
    @include font-size(1.5rem);

    button {
      background: none;
      border: none;
      margin: 0px 5px;
    }
  }
}

.steps {
  display: flex;
  align-items: center;
  @include margin-bottom(1rem);

  .steps__step {
    margin-right: 24px;
    @include font-size(1.2rem);
    font-family: "Montserrat SemiBold", sans-serif;
    min-width: 24px;
    text-align: center;
  }
  .steps__input {
  }
}

.form-group {
  @include margin-top(0.5rem);
  @include margin-bottom(2rem);

  &--grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 12px;
  }

  label {
    @include font-size(1rem);
    @include margin-bottom(1.2rem);
    color: #121212;
    line-height: 1.5;
    font-family: "Montserrat SemiBold", sans-serif;
    display: flex;
    align-items: center;

    small {
      margin-left: 12px;
      opalng: 0.5;
    }
  }

  select.form-control {
    @include rfs(2.625rem, height);
  }

  .form-control {
    box-sizing: border-box;
    display: block;
    width: 100%;
    @include padding(0.5rem 1rem);
    @include font-size(1rem);
    line-height: 1.5;
    color: #121212;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;

    &--inline {
      display: flex;
      align-items: center;
      line-height: 1;
      position: relative;

      input {
        position: absolute;
        left: 0px;
        top: 0px;
        opacity: 0;
        width: 24px;
        height: 24px;

        &:checked + .radio {
          &::before {
            width: 65%;
            height: 65%;
          }
        }
        &:checked + .checkbox {
          &::before {
            @include font-size(1rem);
          }
        }
      }

      .radio {
        width: 24px;
        height: 24px;
        background-color: #fff;
        border-radius: 50%;
        border: 1px solid #393939;
        cursor: pointer;
        position: relative;

        &::before {
          content: "";
          display: block;
          width: 0%;
          height: 0%;
          position: absolute;
          background-color: #383838;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transition: width 0.4s, height 0.4s;
          transform: translate(-50%, -50%);
        }

        &:hover {
          &::before {
            width: 50%;
            height: 50%;
          }
        }
      }
      .checkbox {
        width: 24px;
        height: 24px;
        background-color: #fff;
        border: 1px solid #393939;
        cursor: pointer;
        position: relative;

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

      span {
        font-family: "Montserrat Regular", sans-serif;
        margin-left: 24px;
        cursor: pointer;
      }
    }
  }

  textarea.form-control {
    min-height: 150px;
  }
}

.description-chars-count {
  position: relative;

  .description-chars-count__count {
    position: absolute;
    bottom: 1px;
    right: 5px;
    padding: 5px;
    font-size: 12px;
    background-color: #fff;
    pointer-events: none;
  }
}

.goal-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);

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
    max-width: 100%;
    height: auto;
    line-height: 1;
  }
}

button {
  &[type="submit"] {
    // TODO - refactor button
    background-color: #f4ed3b;
    width: 100%;
    min-width: 100px;
    color: #393939;
    display: block;
    padding: 0 12px;
    text-decoration: none;
    font-size: 14px;
    cursor: pointer;
    border: none;
    outline: none;
    height: 46px;
    line-height: 46px;
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease;
    letter-spacing: 2px;
    text-align: center;
    text-transform: uppercase;
    max-width: 220px;
    display: block;
    margin: auto;
    font-family: "Montserrat SemiBold", sans-serif;
  }
}

.post-title {
  font-family: "Montserrat Regular";
  text-align: center;
  line-height: 1.35;
  @include font-size(1.1rem);
  padding-top: 5px;
  margin-top: 5px;
  @include margin-bottom(2rem);

  .post-title__title {
    @include font-size(2rem);
    font-family: "Montserrat SemiBold", sans-serif;
    margin-bottom: 0px;
  }

  p {
    line-height: 1.45;
  }
}
</style>