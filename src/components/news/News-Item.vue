<template>
  <div>
    <div class="smiley-img-wrap">
      <div class="smiley-img">
        <img
          :src="$settings.images_path.news + 'm_' + article.cover_image"
          :alt="article.title"
          :title="article.title"
        />
      </div>
    </div>
    <div class="article-descr">
      <div class="article-date-location">
        <div class="article-date">
          {{
            article.published_at
              | formatDate("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
              })
              | replaceDashes
          }}
        </div>
        <div class="article-location"></div>
      </div>
      <div class="article-title">{{ article.title }}</div>
      <div class="article-subtitle">{{ article.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    article: Object,
  },
};
</script>
