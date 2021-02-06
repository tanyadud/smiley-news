<template>
  <div class="dropdown">
    <i class="dropdown__icon"></i>
    <select
      class="dropdown__select"
      :id="id"
      @change="$emit('input', $event.target.value)"
    >
      <option
        v-for="(option, key) in options"
        :key="'dropdown-option-' + key"
        :value="option.value"
        >{{ option.text }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  name: "VDropdown",
  props: {
    id: {
      type: String,
      required: false,
    },
    options: {
      validator(s) {
        return s.every(
          (item) => item.hasOwnProperty("text") && item.hasOwnProperty("value")
        );
      },
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  width: 100%;
  height: 60px;
  border: 1px solid #aca9a9;
  border-radius: 5px;
  transition: 125ms ease;
  font: {
    family: "Gotham Light";
    size: 18px;
  }

  &:hover {
    border-color: #0e0d0d;
  }

  &__icon {
    position: absolute;
    right: 16px;
    top: 18px;
    width: 14px;
    height: 14px;
    border: {
      right: 2px solid #707070;
      bottom: 2px solid #707070;
    }
    transform: rotate(45deg);
  }

  &__select {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    padding: 16px;
    webkit-appearance: none;
    appearance: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &::-ms-expand {
      display: none;
    }
  }
}
</style>
