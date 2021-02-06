<template>
  <div class="organisation-item">
    <div class="organisation-item__logo">
      <router-link :to="linkedComponent">
        <img
            v-if="organisation.logo != null"
            :src="$settings.images_path.organisations + 's_' + organisation.logo"
            alt
            title
            class="organisation-item__image"
        />
        <div v-else>{{ organisation.initials }}</div>
      </router-link>
    </div>
    <h2 class="organisation-item__title">
      <router-link :to="linkedComponent">{{ organisation.name }}</router-link>
    </h2>
    <!-- <div class="organisation-item__categories">Arts, Culture, Leisure</div> -->
    <div class="organisation-item__spanner"></div>

    <router-link :to="linkedComponent" class="organisation-item__follow-btn">Visit</router-link>

    <a
        v-if="organisation.website"
        class="organisation-item__visit"
        :href="organisation.website"
        target="_blank"
    >Visit website</a>
    <br v-else>
  </div>
</template>

<script>
    import axios from "@/axios-auth";

    export default {
        name: "OrganisationCardGoal",
        data() {
            return {};
        },
        props: {
            organisation: {
                type: Object,
                required: true
            }
        },
        computed: {
            loggedIn() {
                return this.$store.getters["user/isAuthenticated"];
            },
            linkedComponent: function () {
                return {
                    name: this.organisation.admin_created ? 'organisation-by-smiley' : 'organisation',
                    params: {
                        slug: this.organisation.slug
                    }
                }
            }
        },
        methods: {
            follow() {
                axios
                    .post("/organisations/" + this.organisation.slug + "/follow")
                    .then(result => {
                        console.log("following", result);
                        this.$swal({
                            text: result.data.message,
                            icon: "info"
                        });
                        this.organisation.is_following = true;
                    })
                    .catch(err => {
                        // TODO: add error
                    });
            },
            unfollow() {
                axios
                    .post("/organisations/" + this.organisation.slug + "/un-follow")
                    .then(result => {
                        console.log("cancel following", result);
                        this.$swal({
                            text: result.data.message,
                            icon: "info"
                        });
                        this.organisation.is_following = false;
                    })
                    .catch(err => {
                        // TODO: add error
                    });
            }
        }
    };
</script>

<style lang="scss" scoped>
  .organisation-item {
    border: 1px solid #d8d8d8;
    padding: 20px 15px;
    background-color: #fff;
    transition: transform 0.15s, box-shadow 0.15s;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    @include md {
      &:hover {
        transform: scale(1.01);
        box-shadow: 0 15px 29px -23px rgba(0, 0, 0, 0.3);
      }
    }

    .organisation-item__logo {
      a {
        border-radius: 50%;
        width: 110px;
        height: 110px;
        overflow: hidden;
        line-height: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px auto 14px auto;
        background-color: #e5e9f0;
        text-decoration: none;
        color: #393939;
        font-family: "Montserrat Bold", sans-serif;
        @include font-size(1.6rem);
        letter-spacing: 2px;
        position: relative;
        border: 1px solid #e5e5e5;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        div {
          background-color: #e5e5e5;
          width: 100%;
          height: 100%;
          border: 2px solid #e5e5e5;
          padding: 15px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;

          &::before {
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0px;
            top: 0px;
            border-radius: 50%;
            border: 5px solid #fff;
          }
        }
      }
    }

    .organisation-item__title {
      @include font-size(1.1rem);
      font-family: "Montserrat SemiBold", sans-serif;
      text-align: center;

      a {
        text-decoration: none;
        color: #393939;
      }
    }

    .organisation-item__categories {
      @include font-size(0.8rem);
    }

    .organisation-item__spanner {
      flex: 1;
      min-height: 24px;
    }

    .organisation-item__status {
      @include font-size(0.8rem);
    }

    .organisation-item__follow-btn {
      display: flex;
      background-color: #f4ed3b;
      border: 2px solid #f4ed3b;
      width: 100%;
      padding: 5px 12px;
      letter-spacing: 2px;
      align-items: center;
      justify-content: center;
      font-family: "Montserrat SemiBold", sans-serif;
      @include font-size(1rem);
      margin-top: 12px;
      margin-bottom: 12px;
      transition: background-color 0.2s, box-shadow 0.2s;
      cursor: pointer;
      text-decoration: none;
      color: #393939;

      &:hover {
        box-shadow: 0 2px 4px 0px rgba(0, 0, 0, 0.3);
      }

      i {
        margin-right: 12px;
        font-size: 14px;
      }
    }

    .organisation-item__visit {
      text-decoration: none;
      color: #393939;
      border-bottom: 1px solid #393939;
      transition: border-color 0.2s;
      @include font-size(0.8rem);

      &:hover {
        border-color: transparent;
      }
    }
  }
</style>