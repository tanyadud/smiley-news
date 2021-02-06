<template>
  <div class="people-section">
    <img :src="profilePicture" height="75" width="75"/>
    <div class="people-section__info">
      <div class="people-section__info__name">{{ userName }}</div>
      <div class="people-section__info__partnership">{{ partnership }}</div>
      <div class="people-section__info__role">{{ role }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PeopleSection",
  props: {
    profilePicture: {
      type: String,
      default: "#"
    },
    userName: {
      type: String,
      default: '',
    },
    partnership: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: '',
    }
  }
}
</script>

<style lang="scss" scoped>
.people-section {
  display: flex;
  &__info {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    margin-bottom: 30px;
    &__name {
      font-size: 17px;
      font-weight: bold;
      color: black;
    }
    &__role {
      color: gray;
      font-size: 14px;
    }
  }
}
</style>
