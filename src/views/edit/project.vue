<template>
  <form @submit.prevent="projectSave">
    <div class="project-header">
      <img
        :src="project.cover_image"
        v-if="project.cover_image != null && isBase64(project.cover_image)"
        class="project-header__banner"
      />
      <img
        :src="$settings.images_path.projects +'m_'+project.cover_image"
        v-else-if="project.cover_image != null"
        class="project-header__banner"
      />
      <input
        type="file"
        id="cover-image-file"
        ref="cover-image-file"
        accept=".jpg, .jpeg, .png"
        @input="uploadBackground('cover_image','cover-image-file')"
        style="display: none;"
      />
      <div class="project-header__wrapper">
        <div class="project-column">
          <input type="text" class="project-header__title" v-model="project.name" required />
          <textarea
            class="project-header__description"
            v-model="project.description"
            maxlength="400"
            required
          ></textarea>
          <div class="project-header__location">
            <i class="fa fa-map-marker"></i>
            <gmap-autocomplete
              :placeholder="project.city +', '+project.country"
              @place_changed="getAddressData"
            ></gmap-autocomplete>
          </div>
        </div>
        <div class="project-column">
          <ul class="project-header__affected">
            <li
              v-for="(affected, index) in project.affected"
              :key="'affected-'+index"
              class="affected-item"
            >
              <input v-model="affected.text" class="affected-item__input" required />
              <button
                type="button"
                @click.prevent="removeAffected(index)"
                v-if="index >= 1"
                class="affected-item__remove"
              >
                <i class="fa fa-remove"></i>
              </button>
              <button
                type="button"
                v-if="index + 1 == project.affected.length"
                class="affected-item__add"
                @click.prevent="addAffected"
              >
                <i class="fa fa-plus-circle"></i>
              </button>
            </li>
          </ul>
        </div>
        <div class="project-column project-column--full-width">
          <div class="project-header-buttons">
            <button class="save" :disabled="loading">{{ loading ? 'Saving data' : 'Save'}}</button>
            <button
              @click.prevent="projectUnPublish"
              type="button"
              class="publish"
              v-if="project.published"
            >UnPublish</button>
            <button @click.prevent="projectPublish" type="button" class="publish" v-else>Publish</button>

            <button
              @click.prevent="triggerInputFile('cover-image-file')"
              type="button"
              class="image"
            >
              <i class="fa fa-camera"></i>
            </button>
            <button @click.prevent="projectCancel" type="button" class="cancel">Cancel</button>
            <button @click.prevent="projectDelete" type="button" class="delete">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <div class="page container">
      <div class="page__item">
        <div class="page-section page-section--stage">
          <div class="page-section__title">Project stage</div>
          <div class="page-section__content">
            <div class="stage__label-holder">
              <label v-for="stage in stages" :key="'stages-'+stage.id">
                <input type="radio" name="project-stage" :value="stage.id" v-model="project.stage" />
                {{stage.title}}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="page__item">
        <div class="page-section page-section--donation">
          <div class="page-section__title">Donation area</div>
          <div class="page-section__content">
            <h4>Allow donations?</h4>
            <div class="information__label-holder">
              <label>
                <input type="radio" name="donations" value="1" v-model="project.allow_donations" /> Allow
              </label>
              <label>
                <input type="radio" name="donations" value="0" v-model="project.allow_donations" /> Disallow
              </label>
            </div>
            <h4>Donation text</h4>
            <textarea
              :required="project.allow_donations == 1 ? true : false"
              v-model="project.donation_text"
            ></textarea>
            <h4>Donation link</h4>
            <input
              :required="project.allow_donations == 1 ? true : false"
              type="url"
              v-model="project.donation_link"
            />
          </div>
        </div>
      </div>
      <div class="page__item">
        <div class="page-section page-section--information">
          <div class="page-section__title">Information blocks</div>
          <div class="page-section__content">
            <div class="grid-item">
              <img
                :src="project.mission_image"
                v-if="project.mission_image != null && isBase64(project.mission_image)"
              />
              <img
                :src="$settings.images_path.projects +'m_'+project.mission_image"
                v-else-if="project.mission_image != null"
              />
              <textarea v-model="project.mission" placeholder="Mission"></textarea>
              <button
                type="button"
                @click.prevent="triggerInputFile('mission-file')"
                class="information_replace_image button--with-icon"
              >
                <i class="fa fa-image"></i>Replace image
              </button>
              <input
                type="file"
                id="mission-file"
                ref="mission-file"
                accept=".jpg, .jpeg, .png"
                @input="uploadBackground('mission_image','mission-file')"
                style="display: none;"
              />
            </div>
            <div class="grid-item">
              <img
                :src="project.vision_image"
                v-if="project.vision_image != null && isBase64(project.vision_image)"
              />
              <img
                :src="$settings.images_path.projects +'m_'+project.vision_image"
                v-else-if="project.vision_image != null"
              />
              <textarea v-model="project.vision" placeholder="Vision"></textarea>
              <button
                type="button"
                @click.prevent="triggerInputFile('vision-file')"
                class="information_replace_image button--with-icon"
              >
                <i class="fa fa-image"></i>Replace image
              </button>
              <input
                type="file"
                id="vision-file"
                ref="vision-file"
                accept=".jpg, .jpeg, .png"
                @input="uploadBackground('vision_image','vision-file')"
                style="display: none;"
              />
            </div>
            <div class="grid-item">
              <img
                :src="project.audience_image"
                v-if="project.audience_image != null && isBase64(project.audience_image)"
              />
              <img
                :src="$settings.images_path.projects +'m_'+project.audience_image"
                v-else-if="project.audience_image != null"
              />
              <textarea v-model="project.audience" placeholder="Audience"></textarea>
              <button
                type="button"
                @click.prevent="triggerInputFile('audience-file')"
                class="information_replace_image button--with-icon"
              >
                <i class="fa fa-image"></i>Replace image
              </button>
              <input
                type="file"
                id="audience-file"
                ref="audience-file"
                accept=".jpg, .jpeg, .png"
                @input="uploadBackground('audience_image','audience-file')"
                style="display: none;"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="page__item">
        <div class="page-section page-section--interests">
          <div class="page-section__title">Choose interests</div>
          <div class="page-section__content">
            <label class="interest" v-for="goal in goals" :key="'goal-'+goal.id">
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
      </div>
      <div class="page__item">
        <div class="page-section page-section--seeking">
          <div class="page-section__title">We're seeking</div>
          <div class="page-section__content">
            <div
              v-for="(item, index) in project.support_categories"
              :key="'grid-'+item.category_id+'-'+index"
              class="grid-item support"
            >
              <select v-model="item.category_id">
                <option
                  v-for="category in supports"
                  :key="'main-cat-'+category.title"
                  :value="category.id"
                >{{category.title}}</option>
              </select>
              <select v-model="item.sub_category_id" required>
                <option
                  v-for="category in filterInnerItems(item.category_id)"
                  :key="'main-sub_cat-'+category.title"
                  :value="category.id"
                >{{category.title}}</option>
              </select>
              <textarea v-model="item.description" placeholder="Add description"></textarea>
              <button @click.prevent="removeSupportItem(index)" class="support__remove">Remove</button>
            </div>
            <div class="grid-item element__add">
              <button @click.prevent="addSupportItem" class="button--with-icon">
                <i class="fa fa-plus"></i>Add support
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="page__item">
        <div class="page-section page-section--steps">
          <div class="page-section__title">How we're creating POSITIVE change</div>
          <div
            class="page-section__subtitle"
          >{{project.steps ? project.steps.length : ''}} {{project.steps && project.steps.length > 1 ? 'Steps' : 'Step'}} for change</div>
          <div class="page-section__content">
            <div
              class="project-step"
              v-for="(step, index) in project.steps"
              :key="'step-positive-'+index"
            >
              <div class="project-step__top">
                <div class="project-step__counter">
                  <div class="project-step__counter-number">
                    <span>{{index + 1}}</span>
                  </div>
                  <button class="project-step__remove" @click.prevent="removeStepItem(index)">
                    <i class="fa fa-trash-o"></i>
                  </button>
                </div>
                <div class="project-step__content">
                  <div class="project-step__number">step {{index + 1}}</div>
                  <div class="project-step__title">
                    <input v-model="step.description" required />
                  </div>
                </div>
              </div>
              <div class="project-step__bottom">
                <img :src="step.image" v-if="step.image != null && isBase64(step.image)" />
                <img
                  :src="$settings.images_path.projects +'m_'+step.image"
                  v-else-if="step.image != null"
                />
                <button type="button" @click.prevent="triggerInputFile('step-file'+index)">
                  <i class="fa fa-camera"></i>
                </button>
                <input
                  type="file"
                  :id="'step-file'+index"
                  :ref="'step-file'+index"
                  accept=".jpg, .jpeg, .png"
                  @input="uploadImage(index, 'step-file'+index)"
                  style="display: none;"
                />
              </div>
            </div>
            <div class="project-step element__add">
              <button @click.prevent="addStepItem" class="button--with-icon">
                <i class="fa fa-plus"></i>Add Step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </form>
</template>

<script>
import axios from "@/axios-auth";
import router from "@/router";

import { gmapApi } from "vue2-google-maps";

import AppIcon from "@/components/AppIcon";
import Footer from "@/components/Footer.vue";
export default {
  name: "Project",
  components: {
    AppIcon,
    Footer
  },
  data() {
    return {
      loading: false,
      project: {},
      supports: [],
      goals: [],
      stages: []
    };
  },
  computed: {
    google: gmapApi
  },
  methods: {
    // Project Actions
    projectSave() {
      this.loading = true;
      axios
        .put("/projects/" + this.$route.params.slug, this.project)
        .then(res => {
          this.$swal({ text: "Changes saved", icon: "success" });
          console.log("Project edited", res);
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    },
    projectPublish() {
      axios
        .patch("/projects/" + this.$route.params.slug + "/publish", {
          published: true
        })
        .then(res => {
          console.log("published", res);
          this.project.published = res.data.published;
          this.$swal({ text: "Project Published", icon: "success" });
        })
        .catch(error => {
          console.log("ERROR!!!!: ", error);
        });
    },
    projectUnPublish() {
      axios
        .patch("/projects/" + this.$route.params.slug + "/publish", {
          published: false
        })
        .then(res => {
          console.log("published", res);
          this.project.published = res.data.published;
          this.$swal({ text: "Project Unpublished", icon: "success" });
        })
        .catch(error => {
          console.log("ERROR!!!!: ", error);
        });
    },
    projectCancel() {
      router.push({
        name: "project",
        params: { slug: this.$route.params.slug }
      });
    },
    projectDelete() {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios
            .delete("/projects/" + this.$route.params.slug)
            .then(res => {
              this.$swal({ text: "Project deleted" });
              router.push({ name: "projects" });
            })
            .catch(error => {
              console.log("ERROR!!!!: ", error);
            });
        }
      });
    },
    // Validate image size
    triggerInputFile(id) {
      document.getElementById(id).click();
    },
    uploadBackground(type, ref) {
      console.log("REF", this.$refs[ref]);

      let photo = null;
      const input = this.$refs[ref];
      const files = input.files;

      const fileSize = files[0].size;
      if (files && files[0] && fileSize < 2000000) {
        const reader = new FileReader();
        reader.onload = e => {
          this.project[type] = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      } else {
        this.$swal({ text: "File is too big to upload", icon: "error" });
        input.value = "";
      }
    },
    uploadImage(index, ref) {
      console.log("REF", this.$refs[ref]);

      let photo = null;
      const input = this.$refs[ref][0];
      const files = input.files;

      const fileSize = files[0].size;
      if (files && files[0] && fileSize < 2000000) {
        const reader = new FileReader();
        reader.onload = e => {
          this.project.steps[index].image = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      } else {
        this.$swal({ text: "File is too big to upload", icon: "error" });
        input.value = "";
      }
    },
    // Support items
    addSupportItem() {
      this.project.support_categories.push({
        category_id: 1,
        sub_category_id: 12,
        description: null
      });
    },
    removeSupportItem(index) {
      this.project.support_categories.splice(index, 1);
    },
    // Steps
    addStepItem() {
      this.project.steps.push({
        description: null,
        image: null
      });
    },
    removeStepItem(index) {
      this.project.steps.splice(index, 1);
    },
    // Affecter
    addAffected() {
      this.project.affected.push({
        text: null
      });
    },
    removeAffected(index) {
      this.project.affected.splice(index, 1);
    },
    filterInnerItems(id) {
      const element = this.supports.find(cat => cat.id == id);

      return element?.supports ? element.supports : null;
    },
    projectGoals() {
      let goals = this.project.goals.map(item => item.name);
      return goals.join(", ");
    },
    isBase64(str) {
      if (str.includes("data:image/")) {
        return true;
      } else {
        return false;
      }
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
    }
  },
  mounted() {
    axios.get("projects/" + this.$route.params.slug + "/edit").then(res => {
      console.log("Project edit", res);

      this.project = res.data.project;
      this.supports = res.data.all_support_categories;
      this.goals = res.data.all_goals;
      this.stages = res.data.all_stages;
    });
  }
};
</script>

<style lang="scss" scoped>
.project-header {
  position: relative;
  padding-top: 48px;
  padding-bottom: 48px;

  &::before {
    background-color: #000;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    display: block;
    position: absolute;
    content: "";
    z-index: 2;
  }

  .project-header__banner {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 1;
  }
  .project-header__wrapper {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 30px;
    position: relative;
    z-index: 3;
    margin: 0px auto;
    max-width: 1560px;
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
  }

  .project-column {
    display: flex;
    flex-direction: column;
  }

  input {
    padding: 5px 15px;
    color: #fff;
    background-color: transparent;
    border-color: #fff;
    &::placeholder {
      color: #fff;
    }
  }
  textarea {
    padding: 5px 15px;
    color: #fff;
    background-color: transparent;
    border-color: #fff;
    height: 130px;
    margin-bottom: 24px;
    &::placeholder {
      color: #fff;
    }
  }

  .project-header__title {
    @include font-size(1.5rem);
    margin-bottom: 24px;
  }

  .project-header__location {
    position: relative;

    input {
      padding-left: 35px;
      max-width: 250px;
      width: 100%;
    }

    i {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      color: #fff;
    }
  }
}
.project-header-buttons {
  button {
    transition: background-color 0.4s, color 0.4s, border-color;
    cursor: pointer;
    margin-bottom: 12px;
    padding: 5px 15px;
    text-transform: uppercase;
    background-color: transparent;
    border-color: #fff;
    color: #fff;

    &:not(:last-child) {
      margin-right: 12px;
    }
  }

  button:active {
    border-color: #fff;
  }

  button:hover {
    background-color: #f4ed3b;
    border-color: #f4ed3b;
    color: #393939;
  }

  .save {
    background-color: #f4ed3b;
    color: #393939;
  }
  .publish {
  }
  .image {
    min-width: 80px;
  }
  .cancel {
  }
  .delete {
    background-color: #7d8494;
    border-color: #7d8494;

    &:hover {
      background-color: #5d626d;
      border-color: #5d626d;
      color: #fff;
    }
  }
}
.affected-item {
  display: flex;
  margin-bottom: 12px;

  .affected-item__input {
  }
  .affected-item__remove {
    background-color: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
  }
  .affected-item__add {
    background-color: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
  }
}
//
.page {
  padding-top: 48px;
}
.page-grid {
  display: grid;
}
.page-section {
  margin-bottom: 36px;
  .page-section__title {
    font-family: "Montserrat Bold";
    @include font-size(2rem);
    display: flex;
    align-items: center;
    margin-top: 0px;
    margin-bottom: 0.5rem;
  }
  .page-section__subtitle {
    font-family: "Montserrat SemiBold";
    @include font-size(1.3rem);
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .page-section__content {
    font-family: "Montserrat Regular";
    @include font-size(1rem);
  }

  &.page-section--stage {
    .stage__label-holder {
      label {
        input {
          margin-right: 12px;
        }
        &:not(:last-child) {
          margin-right: 24px;
        }
      }
    }
  }

  &.page-section--donation {
    .page-section__content {
      display: flex;
      flex-direction: column;

      .information__label-holder {
        label {
          input {
            margin-right: 12px;
          }
          &:not(:last-child) {
            margin-right: 24px;
          }
        }
      }

      h4 {
        font-family: "Montserrat SemiBold", sans-serif;
        &:not(:first-child) {
          margin-top: 24px;
        }
      }

      textarea {
        max-width: 500px;
        width: 100%;
        padding: 5px 15px;
        height: 200px;
      }

      input[type="url"] {
        max-width: 500px;
        width: 100%;
        padding: 5px 15px;
      }
    }
  }

  &.page-section--interests {
    .page-section__content {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      grid-gap: 15px;
    }
  }

  &.page-section--information {
    .page-section__content {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  // Support items
  &.page-section--seeking {
    .page-section__content {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 1px;

      .grid-item {
        border: 1px solid #e0e2e7;
        margin: -1px;
        padding: 60px 40px;
      }
    }
  }

  &.page-section--steps {
    .page-section__content {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 15px;
    }
  }
}

// Information blocks
.page-section--information {
  .grid-item {
    padding: 60px 40px;
    position: relative;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0px;
      top: 0px;
      object-fit: cover;
      object-position: contain;
    }

    textarea,
    input,
    button {
      position: relative;
      z-index: 1;
    }

    &:nth-child(1) {
      background-color: #ececec;
    }
    &:nth-child(2) {
      background-color: #dcdcdc;
    }
    &:nth-child(3) {
      background-color: #cfcece;
    }
  }

  textarea {
    width: 100%;
    height: 200px;
    padding: 15px;
  }

  .information_replace_image {
    background-color: #7d8494;
    color: #fff;
    // max-width: 200px;
    width: 100%;
    border: none;
    text-transform: uppercase;
    padding: 15px 20px;
    line-height: 1;
    font-family: "Montserrat SemiBold", sans-serif;
    cursor: pointer;
    transition: box-shadow 0.4s;

    &:hover {
      box-shadow: 0 2px 28px -13px rgba(0, 0, 0, 0.4);
    }
  }
}

// Inerest
.interest {
  position: relative;
  cursor: pointer;

  img {
    max-width: 100%;
    height: auto;
    line-height: 1;
  }
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
      background-color: #f4ed3b;
      &::before {
        @include font-size(1rem);
      }
    }
  }
  .checkbox {
    width: 24px;
    height: 24px;
    background-color: #fff;
    border: 1px solid #393939;
    cursor: pointer;
    position: absolute;
    right: 0px;
    bottom: 0px;

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
}

// Support step
.support {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  select {
    width: 100%;
    margin-bottom: 24px;
    display: block;
    height: 46px;
    background-color: #fff;
  }

  textarea {
    width: 100%;
    min-height: 100px;
    margin-bottom: 24px;
    padding: 15px;
  }

  .support__remove {
    background-color: #7d8494;
    color: #fff;
    max-width: 200px;
    width: 100%;
    border: none;
    text-transform: uppercase;
    padding: 15px 20px;
    line-height: 1;
    font-family: "Montserrat SemiBold", sans-serif;
    cursor: pointer;
    transition: box-shadow 0.4s;

    &:hover {
      box-shadow: 0 2px 28px -13px rgba(0, 0, 0, 0.4);
    }
  }
}

// Elements
.project-step {
  display: flex;
  flex-direction: column;
  .project-step__top {
    @include margin-bottom(1.5rem);
    display: flex;
  }
  .project-step__counter {
    width: 70px;
    margin-right: 32px;
    display: flex;
    justify-content: center;
    padding-left: 5px;
    box-sizing: border-box;
    flex-direction: column;

    .project-step__counter-number {
      border-radius: 50%;
      background-color: #7d8494;
      width: 50px;
      height: 50px;
      position: relative;
      padding: 8px;
      box-sizing: border-box;

      &::before {
        content: "";
        display: block;
        width: calc(100% + 8px);
        height: calc(100% + 8px);
        border-radius: 50%;
        position: absolute;
        border: 1px dotted #7d8494;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      span {
        font-family: "Montserrat Bold";
        @include font-size(1.5rem);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
      }
    }
  }

  .project-step__number {
    font-family: "Montserrat Regular";
    line-height: 1;
    color: #121212;
    text-transform: uppercase;
    @include font-size(1rem);
    @include margin-bottom(1rem);
  }
  .project-step__title {
    font-family: "Montserrat SemiBold";
    @include font-size(1.1rem);
    display: flex;
    align-items: center;

    input {
      width: 100%;
      padding: 5px 10px;
    }
  }

  .project-step__content {
    flex: 1;
  }
  .project-step__bottom {
    height: 0px;
    padding-bottom: 56.25%;
    position: relative;
    overflow: hidden;
    margin-top: auto;

    &::before {
      background-color: #000;
      opacity: 0.2;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      content: "";
      display: block;
      z-index: 2;
      position: absolute;
    }

    img {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: contain;
      z-index: 1;
    }

    button {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      line-height: 1;
      border-radius: 50%;
      color: #fff;
      border-color: #fff;
      border-width: 2px !important;
      padding: 10px;
      font-size: 1.5rem;
      background-color: transparent;
      cursor: pointer;
      z-index: 3;
    }
  }

  .project-step__remove {
    border-radius: 50%;
    border-color: #000;
    border-width: 1px !important;
    position: relative;
    width: 36px;
    height: 36px;
    font-size: 1rem;
    background-color: transparent;
    margin: 24px auto 0 0;
    cursor: pointer;
    z-index: 3;
    transition: border-color 0.4s, color 0.4s;

    i {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &:hover {
      border-color: red;
      color: red;
    }
  }
}

// Last column
.element__add {
  background-color: rgba(140, 148, 166, 0.1);
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 60px 40px;

  button {
    background-color: #f4ed3b;
    max-width: 200px;
    width: 100%;
    border: none;
    text-transform: uppercase;
    padding: 15px 20px;
    line-height: 1;
    font-family: "Montserrat SemiBold", sans-serif;
    cursor: pointer;
    transition: box-shadow 0.4s;

    &:hover {
      box-shadow: 0 2px 28px -13px rgba(0, 0, 0, 0.4);
    }
  }
}

// All buttons?
button {
  text-align: center;

  &.button--with-icon {
    i {
      margin-right: 12px;
    }
  }
}

input:required:valid,
textarea:required:valid {
  border-color: #f4ed3b;
}
</style>