<template>
  <div>
    <div class="form-kit">
      <div class="input-element">
        <label class="input-element__label">
          <div class="input-element__title">Sample input text</div>
          <div
            class="input-element__wrapper input-element__wrapper--icon input-element__wrapper--icon-prepend"
          >
            <i class="fa fa-search" aria-hidden="true"></i>
            <input type="text" class="input-element__input" placeholder="Some placeholder text" />
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-element {
  &__label {
  }

  .input-element__title {
    font-family: "Montserrat SemiBold", sans-serif;
    @include font-size(1rem);
  }

  &__wrapper {
    display: flex;
    position: relative;

    &--icon {
      i {
        position: absolute;
        top: 50%;
        line-height: 1;
        transform: translateY(-50%);
      }

      &-prepend {
        i {
          left: 10px;
        }
        .input-element__input {
          padding-left: 25px;
        }
      }
    }
  }

  &__input {
    width: 100%;
    padding: 10px 20px;
    font-family: "Montserrat SemiBold", sans-serif;
    color: #393939;
  }

  &__textarea {
  }
}
</style>