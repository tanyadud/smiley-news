<template>
  <div>
    <section class="contact">
      <div class="contacts-subtitle"></div>

      <div class="contacts__form">
        <div class="content-w">
          <h1>Have you got a question?</h1>

          <h2>Fill in the form below and we will get back to you as soon as possible</h2>

          <form @submit.prevent="sendMessage">
            <div class="form-group">
              <div class="wrap-for-subject-select">
                <select name="subject" class="subject-filter" required v-model="contact.subject">
                  <option value selected disabled>Select a subject</option>
                  <option>My account</option>
                  <option>Events</option>
                  <option>Organisations or Projects</option>
                  <option>Smiley Awards</option>
                  <option>Website</option>
                  <option>Partnerships</option>
                </select>
                <div class="select-arrows">
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
                      d="M21.0002 8.00025C21.0002 8.25625 20.9023 8.51225 20.7073 8.70725L12.7072 16.7072C12.3162 17.0982 11.6842 17.0982 11.2933 16.7072L3.29325 8.70725C2.90225 8.31625 2.90225 7.68425 3.29325 7.29325C3.68425 6.90225 4.31625 6.90225 4.70725 7.29325L12.0002 14.5862L19.2932 7.29325C19.6842 6.90225 20.3162 6.90225 20.7073 7.29325C20.9023 7.48825 21.0002 7.74425 21.0002 8.00025Z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="form-group">
              <input
                name="email"
                type="text"
                class="form-control form-control--light"
                placeholder="Your email.."
                required
                v-model="contact.email"
              />
            </div>

            <div class="form-group">
              <textarea
                name="message"
                type="text"
                class="form-control form-control--light"
                placeholder="Write us a message.."
                rows="6"
                minlength="16"
                required
                v-model="contact.message"
              ></textarea>
            </div>

            <div class="form-group-button">
              <button type="submit" class="cta cta--solid-yellow">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import axios from "@/axios-auth";

import Footer from "@/components/Footer.vue";

export default {
  name: "Contact",
  components: {
    Footer
  },
  data() {
    return {
      contact: {
        subject: "",
        email: "",
        message: ""
      }
    };
  },
  methods: {
    sendMessage() {
      axios
        .post("/contact", this.contact)
        .then(res => {
          this.$swal({
            text: res.data.message,
            icon: "info"
          });

          this.contact.subject = "";
          this.contact.email = "";
          this.contact.message = "";
        })
        .catch(error => {
          this.$swal({
            text: error.response.data.message,
            icon: "error"
          });
        });
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/scss/sections/_page-contact";
</style>