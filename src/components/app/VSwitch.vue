<template>
  <div class="toggle">
    <label class="toggle__label">
      <span class="toggle__label-name">{{ left }}</span>
      <input
        class="toggle__radio"
        type="radio"
        :name="name"
        :value="left"
        @change="$emit('input', left)"
        checked
      />
      <div class="toggle__backdrop"></div>
    </label>
    <label class="toggle__label">
      <span class="toggle__label-name">{{ right }}</span>
      <input
        class="toggle__radio"
        type="radio"
        :name="name"
        :value="right"
        @change="$emit('input', right)"
      />
      <div class="toggle__backdrop"></div>
    </label>
  </div>
</template>

<script>
export default {
  name: "VSwitch",
  props: {
    name: {
      type: String,
      required: false,
    },
    left: {
      type: String,
      required: true,
    },
    right: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.toggle {
  display: flex;
  width: 100%;
  height: 60px;
  font: {
    family: "Gotham Medium";
    size: 18px;
  }

  .toggle__label {
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 100%;
    cursor: pointer;

    .toggle__label-name {
      text-align: center;
      line-height: 60px;
      vertical-align: middle;
    }

    &:hover > .toggle__backdrop {
      background: rgba(#d1d2d4, 0.3);
    }
  }

  .toggle__radio {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .toggle__backdrop {
      background: #d1d2d4;
      border: none;
    }
  }

  .toggle__backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    border: 1px solid #aca9a9;
    transition: 175ms ease;
  }
}
</style>
