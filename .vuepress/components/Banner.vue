<template>

  <div v-if="message" class="banner">
    <div class="banner-content">
      <span class="banner-text" v-html="message" />
    </div>
  </div>

</template>
<style scoped>
.banner {
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
}

.banner-content {
  display: flex;
  align-items: center;
}

.banner-icon {
  font-size: 20px;
  margin-right: 8px;
}

.banner-text {
  font-size: 16px;
  color: #856404;
}
</style>
<script>
export default {
  name: "Banner",
  computed: {
    // grab “sdks” or “connectors” or whatever you put in the page frontmatter
    key() {
      return this.$page.frontmatter.deprecationMessages;
    },
    // look up the actual text from your site config
    message() {
      if (!this.key) return null;
      const msgs = this.$site.themeConfig.deprecationMessages || {};
      return msgs[this.key] || null;
    },
  },
};
</script>