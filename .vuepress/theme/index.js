// docs/.vuepress/theme/index.js
const path = require('path');

module.exports = {
  extends: '@vuepress/theme-default',
  layouts: {
    // key must match the “layout” name you’ll use in frontmatter:
    BannerPage: path.resolve(__dirname, 'layouts/BannerPage.vue'),
  },
};
