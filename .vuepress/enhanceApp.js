/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  //performs a hard redirect for legacy /user/ and /workspaces/ paths
  router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/user/') || to.path.startsWith('/workspaces/')) {
      if (typeof window !== 'undefined') {
        window.location.replace('https://docs.speckle.systems/');
      }
    } else {
      next();
    }
  });
};
