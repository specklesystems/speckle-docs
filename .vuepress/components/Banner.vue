<template>
  <div v-if="message" class="banner" :class="key">
    <div class="banner-content">
      <span class="banner-text" v-html="message" />
    </div>
  </div>
</template>

<style>
.banner .banner-text a {
  color: #ffffff !important;
  text-decoration: underline !important;
}
</style>
<style scoped>
.banner {
  background-color: rgb(104, 70, 14);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 3px;
}

.banner-text {
  font-size: 16px;
  color: #ffffff;
}

.banner.developer,
.banner.automate {
  background-color: #eded48;
  color: #000
}

.banner.viewer,
.banner.viewer {
  background-color: #a2e489;
  color: #000
}

.banner.developer .banner-text,
.banner.viewer .banner-text,
.banner.automate .banner-text {
  color: #000 !important;
}

.banner.developer_obsolete {
  background-color: #df4848;
}


.banner-content {
  display: flex;
  align-items: center;
  font-weight: 500;
  padding-left: 2.1rem;

}

.banner-text {
  text-indent: -1.7rem !important;
}


.banner-icon {
  font-size: 20px;
  margin-right: 8px;
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