<template>
  <div>
    <div class="deprecation-banner" v-if="bannerHtml" v-html="bannerHtml" />
    <!-- Render the normal page content -->
    <Content />
  </div>
</template>

<script>
export default {
  computed: {
    bannerHtml() {
      // first look for a frontmatter override…
     const override = this.$page.frontmatter.bannerMessage
     if (override) return override

     // otherwise pick from themeConfig.deprecationMessages by type…
     const type = this.$page.frontmatter.deprecationType
           const msgs = this.$site.themeConfig.deprecationMessages || {}
      return (type && msgs[type]) || ''
    },
  },
}
</script>

<style>
.deprecation-banner {
  background: #fff4e5;
  border-bottom: 1px solid #ffe58f;
  color: #ad4e00;
  text-align: center;
  padding: 0.75em;
  font-weight: 600;
  font-size: 0.95em;
}
</style>
