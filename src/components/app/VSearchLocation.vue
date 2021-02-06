<template>
  <div class="search-location">
    <img
      class="search-location__icon"
      src="/images/main/icon-search.svg"
      alt="search"
    />
    <gmap-autocomplete
      class="search-location__input"
      :id="id"
      placeholder="London, GB"
      v-on="$listeners"
    ></gmap-autocomplete>
  </div>
</template>

<script>
export default {
  name: "VSearchLocation",
  props: {
    id: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.search-location {
  display: flex;
  width: 100%;
  height: 60px;
  border: 1px solid #aca9a9;
  border-radius: 5px;
  transition: 125ms ease;
  cursor: text;
  padding: 0 16px;
  font: {
    family: "Gotham Light";
    size: 18px;
  }

  &:hover {
    border-color: #0e0d0d;
  }

  &__icon {
    opacity: 0.3;
    max-width: 26px;
  }

  &__input {
    border: none;
    height: 100%;
    width: 100%;
    margin-left: 8px;
  }
}
</style>
