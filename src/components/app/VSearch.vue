<template>
  <form class="v-search">
    <div class="v-search-box">
      <input
        class="v-search__input"
        type="text"
        minlength="3"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
      />
      <button class="v-search__button" type="submit">
        <img src="/images/main/icon-search.svg" alt="search" />
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "v-search",
  props: {
    placeholder: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.v-search-box {
  display: flex;
  height: 45px;
  max-width: 230px;
  border-radius: 40px;
  border: 1px solid black;
  padding: 0 16px;
}

.v-search__input {
  background: none;
  border: none;
  width: 100%;
  font-family: "Gotham Book", sans-serif;
  font-size: 23px;
  line-height: 40px;
  color: black;

  &::placeholder {
    color: black;
  }
}

.v-search__button {
  cursor: pointer;
  background: none;
  border: none;
  transform: scale(0.7);

  &:focus {
    outline: none;
  }
}
</style>
