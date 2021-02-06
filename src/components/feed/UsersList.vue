<template>
  <div class="users-list">
    <div v-if="title" class="users-list__list-title">
      {{ title }}
    </div>
    <div>
      <div
          class="users-list__item"
          v-for="(user, index) in users"
          :key="'user-'+index"
      >
        <div class="users-list__item-image-holder">
          <img
              :src="$settings.images_path.users + 's_' + user.avatar"
              alt
              title
              class="user-list__user-avatar"
              v-if="user.avatar !== null"
          />
          <span v-else>{{ user.initials }}</span>
        </div>
        <div class="user-list__user-info">
          <div class="user-list__user-title">{{ user.name }}</div>
          <div
              class="user-list__user-description"
              v-if="user.location != null"
          >{{ user.location }}
          </div>
          <div
              class="user-list__user-description"
              v-if="user.job_title != null"
          >{{ user.job_title }}
          </div>
          <button class="user-list__user-connect__actions" @click="acceptInvite(user.slug)" v-if="showAcceptButton">
            <i class="fa fa-check"></i> Accept
          </button>
          <button class="user-list__user-connect__actions" @click="rejectInvite(user.slug)" v-if="showAcceptButton">
            <i class="fa fa-times"></i> Decline
          </button>
          <button class="user-list__user-connect__actions" @click="cancelInvite(user.slug)" v-if="showCancelButton">
            <i class="fa fa-times"></i> Cancel
          </button>
          <template v-if="is_friends_list">
            <router-link :to="{name: 'member', params: {slug: user.slug}}" tag="button"
                         class="user-list__user-connect__actions">
              <i class="fa fa-user"></i> View
            </router-link>
            <button class="user-list__user-connect__actions" style="display: none;">
              <i class="fa fa-envelope"></i> Message
            </button>
            <button class="user-list__user-connect__actions" @click="removeFriend(user.slug, user.name)">
              <i class="fa fa-times"></i> Delete
            </button>
          </template>
          <template v-else>
            <button class="user-list__user-connect__connect" @click="connectFriend(user.slug)" v-if="showConnectButton">
              <i class="fa fa-user-plus"></i> Connect
            </button>
            <div class="user-list__user-score" v-if="showMatchScore">
              <span>Match {{ user.match_score | scoreFilter }}%</span>
              <i class="fa fa-globe" v-if="user.location_reason" v-popover:tooltip="'Same location'"></i>
              <i class="fa fa-lightbulb-o" v-if="user.goal_reason" v-popover:tooltip="'Similar goals'"></i>
              <i class="fa fa-handshake-o" v-if="user.support_reason" v-popover:tooltip="'Similar support'"></i>
              <i class="fa fa-hands" v-if="user.need_reason" v-popover:tooltip="'Similar needs'"></i>
            </div>
          </template>
        </div>
      </div>
      <div class="users-list__item users-list__item--show-more" v-if="multiple_pages">
        <div>
          <a href="#">Show more</a>
        </div>
      </div>
    </div>
    <div v-if="users.length === 0">
      <div class="users-list__item users-list__item--no_users">
        <div>
          <slot name="no_users">
            Oh, you don't have any friend connections yet :( try to add some friends or fill your profile more.
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios-auth";

export default {
  name: "UsersList",
  data() {
    return {
      text: null
    };
  },
  props: {
    multiple_pages: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
    },
    is_friends_list: {
      type: Boolean,
      default: false
    },
    users: {
      type: Array,
      default: () => []
    },
    showMatchScore: {
      type: Boolean,
      default: false
    },
    showConnectButton: {
      type: Boolean,
      default: false
    },
    showAcceptButton: {
      type: Boolean,
      default: false
    },
    showCancelButton: {
      type: Boolean,
      default: false
    },
  },
  filters: {
    scoreFilter(value) {
      const currentValue = parseFloat(value);
      let score = 100;

      if (currentValue < 10) {
        score = (100 * currentValue) / 10;
        score = parseInt(score);
      }
      return score;
    }
  },
  methods: {
    connectFriend(friend_slug) {
      axios
          .post("/users/friends/request", {slug: friend_slug})
          .then(res => {
            if (res.data?.success == true) {
              this.$emit('reload_lists');
              this.$swal({text: 'Request Sent'});
            } else {
              this.$swal({text: res.data.messages});
              this.$emit('reload_lists');
            }


          })
          .catch(error => console.error(error));
    },
    cancelInvite(friend_slug) {
      axios
          .post("users/friends/request/cancel", {slug: friend_slug})
          .then(res => {
            if (res.data?.success == true) {
              this.$emit('reload_lists');
            } else {
              this.$swal({text: res.data.messages});
            }
          })
          .catch(error => console.error(error));
    },
    acceptInvite(friend_slug) {
      axios
          .post("users/friends/request/accept", {slug: friend_slug})
          .then(res => {
            if (process.env.NODE_ENV === 'development') {
              console.log('users/friends/request/accept', res);
            }
            if (res.data?.success == true) {
              this.$emit('reload_lists');
            } else {
              this.$swal({text: res.data.messages});
            }
          })
          .catch(error => console.error(error));
    },
    rejectInvite(friend_slug) {
      axios
          .post("users/friends/request/reject", {slug: friend_slug})
          .then(res => {
            if (res.data?.success == true) {
              this.$emit('reload_lists');
            } else {
              this.$swal({text: res.data.messages});
            }
          })
          .catch(error => console.error(error));
    },
    removeFriend(friend_slug, name) {
      let swal = {
        text:
            `You want to delete ${name} from friend list?`,
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel"
      };

      this.$swal(swal).then(result => {
        if (result.value) {
          axios
              .post("users/friends/delete", {slug: friend_slug})
              .then(res => {
                this.$swal({text: res.data.messages});
                this.$emit('reload_lists');
              })
              .catch(error => console.error(error));
        }
      });


    },
  }
}
</script>

<style lang="scss" scoped>
.users-list {
  //height: 400px;
  //overflow-y: scroll;
  //overflow-x: hidden;

  .users-list__list-title {
    color: #fff;
  }

  .users-list__item {
    display: grid;
    grid-template-columns: 50px auto;
    grid-gap: 20px;

    &-image-holder {
      border-radius: 50%;
      width: 50px;
      height: 50px;
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
      @include font-size(1.2rem);
      letter-spacing: 2px;
    }

    &:not(:last-child) {
      margin-bottom: 20px;
    }

    padding-bottom: 20px;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    }

    &--show-more {
      text-align: center;
      grid-template-columns: 1fr;

      a {
        color: #fff;
        text-decoration: none;
        border-bottom: 1px solid #fff;
        display: inline-block;
        transition: border-color 0.2s;
        @include font-size(0.8rem);

        &:hover {
          border-color: transparent;
        }
      }
    }

    &--no_users {
      color: #fff;
      text-align: center;
      grid-template-columns: 1fr;
    }
  }

  .user-list__user-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .user-list__user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .user-list__user-title {
    @include font-size(1rem);
    font-family: "Montserrat Bold", sans-serif;
    color: #fff;
  }

  .user-list__user-description {
    @include font-size(0.75rem);
    color: #fff;
    margin-bottom: .5rem;
  }

  .user-list__user-connect__connect {
    max-width: 200px;
    width: 100%;
    margin-top: 6px;
    color: #fff;
    border: 1px solid #fff;
    text-decoration: none;
    font-size: 0.8rem;
    font-family: "Montserrat SemiBold", sans-serif;
    padding: 2px 15px;
    text-transform: uppercase;
    transition: background-color 0.2s, color 0.2s;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    i {
      margin-right: 12px;
    }

    &:hover {
      background-color: #ffec00;
      color: #393939;
    }
  }

  .user-list__user-score {
    color: #fff;
    display: flex;
    align-items: center;
    margin-top: 1rem;
    font-family: "Montserrat SemiBold", sans-serif;

    span {
      font-size: .8rem;
      margin-right: 1rem;
    }

    span, i {
      margin: 0 .5rem;
    }
  }

  .user-list__user-connect__actions-holder {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }

  .user-list__user-connect__actions {
    max-width: 200px;
    text-align: center;
    margin-top: 6px;
    color: #fff;
    border: 1px solid #fff;
    text-decoration: none;
    font-size: 0.8rem;
    font-family: "Montserrat SemiBold", sans-serif;
    padding: 2px 15px;
    text-transform: uppercase;
    height: auto;
    transition: background-color 0.2s, color 0.2s;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    i {
      margin-right: 12px;
    }

    &:hover {
      background-color: #ffec00;
      color: #393939;
    }
  }
}
</style>