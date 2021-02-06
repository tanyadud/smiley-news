<template>
  <div class="sidebar-checkbox-holder">
    <label class="sidebar-checkbox">
      {{ item.name }}
      <input type="checkbox" :value="item.id" v-model="checked" @change="onChange" />
      <span class="sidebar-checkmark">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.91006 10.4959L3.7071 8.29291C3.31658 7.90239 2.68342 7.90239 2.29289 8.29291C1.90237 8.68343 1.90237 9.3166 2.29289 9.70712L5.29288 12.7071C5.7168 13.131 6.4159 13.0892 6.7863 12.6178L13.7863 4.61786C14.1275 4.18359 14.0521 3.55494 13.6178 3.21372C13.1835 2.87251 12.5549 2.94795 12.2136 3.38222L5.91006 10.4959Z"
            fill="#fff"
          />
        </svg>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkedProxy: false
    };
  },
  computed: {
    checked: {
      get() {
        return this.value;
      },
      set(val) {
        this.checkedProxy = val;
      }
    }
  },
  methods: {
    onChange: function(e) {
      this.$emit("input", this.checkedProxy);
    }
  },
  props: ["item", "value"]
};
</script>

<style lang="scss" scoped>
.sidebar-checkbox {
  position: relative;
  padding-left: 40px;
  margin-bottom: 21px;
  cursor: pointer;
  color: $default-text;
  font: 400 16px/24px "Muli", sans-serif;
  user-select: none;
  display: block;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .sidebar-checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 24px;
    width: 24px;
    border: 1px solid #c7c7c7;
    border-radius: 4px;
    box-sizing: border-box;
    transition: all 0.2s ease;
    svg {
      opacity: 0;
      position: absolute;
      top: 4px;
      left: 4px;
    }
  }
}
.sidebar-checkbox input:checked ~ .sidebar-checkmark {
  background-color: #de1c22;
  border: none;
  transition: all 0.2s ease;
  svg {
    opacity: 1;
  }
}
</style>