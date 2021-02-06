<template>
  <div class="user-item">
    <div class="user-item__avatar">
      <router-link :to="{name: 'member', params: {slug: user.slug}}">
        <img
          :src="$settings.images_path.users + 's_' + user.avatar"
          alt
          title
          class="user-item__image"
          v-if="user.avatar !== null"
        />
        <span v-else>{{ user.initials }}</span>
      </router-link>
    </div>
    <h2 class="user-item__title">
      <router-link :to="{name: 'member', params: {slug: user.slug}}">{{ user.name }}</router-link>
    </h2>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  data() {
    return {};
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.user-item {
  border: 1px solid #d8d8d8;
  padding: 20px 5px;
  background-color: #fff;
  transition: transform 0.15s, box-shadow 0.15s;
  height: 100%;

  @include md {
    &:hover {
      transform: scale(1.01);
      box-shadow: 0 15px 29px -23px rgba(0, 0, 0, 0.3);
    }
  }

  .user-item__avatar {
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

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }

  .user-item__title {
    @include font-size(1.1rem);
    font-family: "Montserrat SemiBold", sans-serif;
    text-align: center;

    a {
      text-decoration: none;
      color: #393939;
    }
  }
}
</style>