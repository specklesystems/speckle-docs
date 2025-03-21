<!-- .vuepress/components/Redirect.vue -->
<template>
  <div>
    <h1>Redirecting...</h1>
    <p>If you are not redirected automatically, click <a :href="redirectUrl">here</a>.</p>
  </div>
</template>

<script>
export default {
  name: 'Redirect',
  props: {
    url: {
      type: String,
      required: true
    }
  },
  computed: {
    redirectUrl() {
      return this.url;
    }
  },
  mounted() {
    window.location.href = this.redirectUrl;
  }
}
</script>