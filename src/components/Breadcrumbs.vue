<template>
  <section class="container breadcrumbs">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <template v-if="breadcrumbs.length > 0">
        <li v-if="breadcrumb.meta.title" v-for="(breadcrumb, index) in breadcrumbs" :key="'breadcrumb-'+index">
          <template v-if="itemsCount !== index">
            <router-link :to="breadcrumb.path">{{ breadcrumb.meta.title }}</router-link>
          </template>
          <template v-else>
            <span>{{ breadcrumb.meta.title }}</span>
          </template>
        </li>
      </template>
    </ul>
  </section>
</template>

<script>
    export default {
        data() {
            return {
                breadcrumbs: []
            };
        },
        computed: {
            itemsCount() {
                return this.breadcrumbs.length - 1;
            },
        },
        mounted() {
            if (!this.custom) {
                this.breadcrumbs = this.$router.currentRoute.matched;
            } else {
                console.log('custom items', this.items);
                this.breadcrumbs = this.items;
            }
        },
        props: {
            custom: {
                default: false,
                type: Boolean
            },
            items: {
                default: () => ([]),
                type: Array
            }
        }
    };
</script>

<style lang="scss" scoped>
  .breadcrumbs {
    margin-top: 24px;
    margin-bottom: 24px;

    li {
      display: inline-block;

      &::after {
        content: '/';
        padding-left: 10px;
        padding-right: 10px;
        font-size: 12px;
      }

      &:last-child {
        &::after {
          content: '';
        }
      }
    }

    a, span {
      color: #1a1a1a;
      font: 400 16px/21px "Muli", sans-serif;
    }
  }
</style>