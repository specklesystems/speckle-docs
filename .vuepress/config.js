const { description } = require('../package');

module.exports = {
  markdown: {
    lineNumbers: true,
    extendMarkdown: (md) => {
      // use more markdown-it plugins!
      md.use(require('markdown-it-html5-embed'), {
        html5embed: {
          useImageSyntax: true, // Enables video/audio embed with ![]() syntax (default)
          useLinkSyntax: true, // Enables video/audio embed with []() syntax
        },
      });
    },
  },
  base: '/',
  title: 'Speckle Docs (Legacy)',

  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#0480FB' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'script',
      {
        // src: '/scripts/scroll-to-hash.js',
      },
    ],
    [
      'script',
      {
        src: 'https://identity.netlify.com/v1/netlify-identity-widget.js',
      },
    ],
    [
      'script',
      {
        src: 'https://unpkg.com/@stackblitz/sdk@1/bundles/sdk.umd.js',
      },
    ],
  ],
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'specklesystems/speckle-docs/',
    docsBranch: 'main',
    editLinks: false,
    editLinkText: 'Edit this page',
    docsDir: '',
    sidebarDepth: 2,
    activeHeaderLinks: false,
    lastUpdated: true,
    logo: '/assets/logo-docs.png',
    deprecationMessages: {
      connectors:
        '🔗 Heads up! Connector docs have moved to <a href="https://docs.speckle.systems">docs.speckle.systems</a>. This old page will be retired soon—thanks for migrating with us!',
      sdks: '📦 You’re looking at docs for our older SDKs. New and improved guides are on their way at <a href="https://docs.speckle.systems">docs.speckle.systems</a>—stay tuned!',
      viewer:
        '👀 These Viewer API docs are still valid and will soon be part of our new Developer Docs site. Hang tight!',
      automate:
        '🛠️ Automate is in beta: things may shift as we refine flows and SDKs. Please bear with us and check back often!',
      developer:
        '⚠️ Developer docs are being updated and will follow our v3 Connectors launch. In the meantime, terminology may be outdated—see the latest at <a href="https://docs.speckle.systems">docs.speckle.systems</a>.',
      server:
        '🖥️ These Server docs are still valid but take care to keep up-to-date for full compatibility with v3 connectors. This will soon be part of our new Developer Docs site. Hang tight!',
    },
    algolia: {
      appId: 'XOL51LKXOA',
      apiKey: '595b9c5533a46cfa0f999033d4e4ba28',
      indexName: 'speckle',
    },
    nav: [
      {
        text: '🆕 User Guides',
        link: 'https://docs.speckle.systems',
      },
      {
        text: '✅ Viewer API',
        link: '/viewer/',
      },
      {
        text: '⚠️ Automate',
        link: '/automate/',
      },
      {
        text: '⚠️ Developers',
        link: '/',
      },
      {
        text: '✅ Server',
        link: '/server/',
      },
      {
        text: 'Speckle Website',
        link: 'https://speckle.systems',
      },
      //this button has custom style in index.styl under `.nav-item:last-child a`
      {
        text: 'Get Started',
        link: 'https://app.speckle.systems/',
      },
    ],
    sidebar: {
      '/dev/': [
        {
          title: 'Developer Docs 👩‍💻',
          collapsable: false,
          children: ['', 'architecture'],
        },
        {
          title: 'Core Concepts',
          collapsable: false,
          children: [
            'base',
            'decomposition',
            'kits',
            'transports',
            'apps-auth',
          ],
        },
        {
          title: 'Advanced Concepts',
          collapsable: false,
          children: [],
        },
        { title: 'GraphQL API', collapsable: false, children: ['graphql-api'] },
        {
          title: '.NET SDK',
          collapsable: false,
          children: [
            'dotnet',
            'FilteringData',
            'traversal',
            'objects',
            'connectors-dev',
            'kits-dev',
            'transports-dev',
          ],
        },
        {
          title: 'Python SDK',
          collapsable: false,
          children: ['python', 'py-examples', 'py-sample'],
        },
      ],
      '/server/': [
        {
          title: 'Server API & Apps',
          collapsable: false,
          children: [
            'server-api',
            'server-graphql-api',
            'server-rest-api',
            'server-stream-previews',
            'server-webhooks',
            'server-setup-k8s',
            'server-manualsetup',
            'server-local-dev',
            'server-database-migration',
            'tokens',
            'apps',
            'server-setup',
          ],
        },
      ],
      '/automate/': [
        {
          title: 'Automate Docs 👩‍💻',
          collapsable: false,
          children: [
            '',
            'getting-started',
            'important-caveats',
            {
              title: 'Core Functionalities',
              collapsable: true,
              children: ['for-automate-users', 'for-function-authors'],
            },
          ],
        },
        {
          title: 'Automations',
          collapsable: false,
          children: [
            'create-automation',
            'update-automation',
            'viewing-results',
            'troubleshooting',
          ],
        },
        {
          title: 'Functions',
          collapsable: false,
          children: [
            'public-functions',
            'create-function',
            {
              title: 'Making Your Function',
              collapsable: true,
              children: [
                'function-inputs',
                'function-context',
                'function-data',
                'function-success',
                'function-results',
                'function-artefacts',
              ],
            },
            'function-testing',
            'documenting',
            'release-function-version',
          ],
        },
        {
          title: 'Resources',
          collapsable: false,
          children: [
            'demos',
            'frequently-asked-questions',
            'feedback',
            'known-issues',
          ],
        },
      ],
      '/viewer/': [
        {
          title: 'Viewer Docs 👩‍💻',
          collapsable: false,
          children: [''],
        },
        {
          title: 'Quickstart 🚀',
          collapsable: false,
          children: ['installation', 'basic-setup', 'advanced-setup'],
        },
        {
          title: 'Viewer Concepts',
          collapsable: false,
          children: ['overview', 'viewer-data', 'viewer-rendering', 'loaders'],
        },
        {
          title: 'API Reference',
          collapsable: false,
          children: [
            'migration-guide',
            {
              title: 'Viewer Core',
              collapsable: true,
              children: [
                'acceleration-structure-api',
                'batch-api',
                'batch-object-api',
                'geometry-converter-api',
                'input-api',
                'intersections-api',
                'loader-api',
                'queries-api',
                'render-view-api',
                'render-tree-api',
                {
                  title: 'Rendering Pipeline',
                  collapsable: true,
                  children: [
                    'rendering-pipeline-api/pipeline-api',
                    'rendering-pipeline-api/progressive-pipeline-api',
                    'rendering-pipeline-api/g-pass-api',
                    'rendering-pipeline-api/base-g-pass-api',
                    'rendering-pipeline-api/progressive-g-pass-api',
                  ],
                },
                'speckle-material-api',
                'speckle-renderer-api',
                'top-level-acceleration-structure-api',
                'viewer-api',
                'world-tree-api',
              ],
            },
            {
              title: 'Extensions',
              collapsable: true,
              children: [
                'extension-api',
                'camera-controller-api',
                'diff-extension-api',
                'filtering-extension-api',
                'measurements-tool-api',
                'selection-extension-api',
                'section-tool-api',
                'section-tool-outlines-api',
                'speckle-controls-api',
                'smooth-orbit-controls-api',
              ],
            },
          ],
        },
        {
          title: 'Examples',
          collapsable: false,

          children: [
            'basic-example',
            'more-extensions-example',
            'filtering-example',
            'loading-example',
            'object-manipulation-example',
            'box-selection-example',
            'categorize-example',
          ],
        },
      ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@adamdehaven/vuepress-plugin-custom-tooltip',
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    '@vuepress/html-redirect',
    [
      'vuepress-plugin-matomo',
      {
        siteId: 5,
        trackerUrl: 'https://speckle.matomo.cloud/',
      },
    ],
  ],
};
