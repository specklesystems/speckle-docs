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
  title: 'Speckle Docs',

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
        src: '/scripts/scroll-to-hash.js',
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
    editLinks: true,
    editLinkText: 'Edit this page',
    docsDir: '',
    sidebarDepth: 2,
    activeHeaderLinks: false,
    lastUpdated: true,
    logo: '/assets/logo-docs.png',
    algolia: {
      appId: 'XOL51LKXOA',
      apiKey: '595b9c5533a46cfa0f999033d4e4ba28',
      indexName: 'speckle',
    },
    nav: [
      {
        text: 'User Guide',
        link: '/',
      },
      {
        text: 'Developer Docs',
        link: '/dev/',
      },
      {
        text: 'Automate',
        link: '/automate/',
      },
      {
        text: '3D Viewer',
        link: '/viewer/',
      },
      {
        text: 'Workspaces',
        link: '/workspaces/',
      },
      {
        text: 'Speckle Website',
        link: 'https://speckle.systems',
      },
      //this button has custom style in index.styl under `.nav-item:last-child a`
      {
        text: 'Get Started',
        link: 'https://speckle.systems/getstarted/',
      },
    ],
    sidebar: {
      '/user/': [
        {
          title: 'User Guide 🤷',
          collapsable: false,
          children: ['', 'concepts', 'concepts-advanced', 'installing', 'FAQs'],
        },
        {
          title: 'Connectors 🔌',
          collapsable: false,
          children: [
            'connectors',
            'manager',
            'ui2',
            {
              title: 'Revit',
              collapsable: true,
              children: [
                './revit/intro',
                './revit/installing-updating-the-connector',
                './revit/sending-models',
                './revit/receiving-models',
                './revit/advanced-settings',
                './revit/features',
                './revit/support-table',
                './revit/faq',
              ],
            },
            'rhino',
            'autocadcivil',
            'grasshopper',
            'dynamo',
            'unity',
            'unreal',
            'blender',
            'excel',
            'csi',
            {
              title: 'SketchUp',
              collapsable: true,
              children: [
                './sketchup/introduction',
                './sketchup/installation',
                './sketchup/basic-usage',
                './sketchup/advanced-settings',
                './sketchup/manual-installation',
              ],
            },
            'qgis',
            'arcgis',
            {
              title: 'Power BI',
              collapsable: true,
              children: [
                './powerbi/introduction',
                './powerbi/installation',
                './powerbi/configuration',
                './powerbi/accessing-private-streams',
                './powerbi/uninstallation',
                './powerbi/using-powerbi-connector',
                './powerbi/working-with-records',
              ],
            },
            {
              title: 'Power BI 3D Viewer',
              collapsable: true,
              children: [
                './powerbi-visual/introduction',
                './powerbi-visual/installation',
                './powerbi-visual/basic-usage',
                './powerbi-visual/coloring',
                './powerbi-visual/object-tooltip',
                './powerbi-visual/visual-settings',
                './powerbi-visual/general-settings',
              ],
            },
            'bentley',
            'teklastructures',
            'archicad',
            'navisworks',
            'ifc',
            'mapping-tool',
            'support-tables',
          ],
        },
        {
          title: 'Tutorials ⚡',
          collapsable: false,
          children: ['tutorials'],
        },
      ],
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
        {
          title: 'Javascript SDK',
          collapsable: false,
          children: ['js', 'viewer', 'js-app-script'],
        },
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
              children: [
                'for-automate-composers',
                'viewing-results',
                'for-function-authors',
              ],
            },
          ],
        },
        {
          title: 'Working with Automations',
          collapsable: false,
          children: ['create-automation', 'update-automation'],
        },
        {
          title: 'Developing Functions',
          collapsable: false,
          children: [
            'create-function',
            'making-your-function',
            'function-testing',
            'documenting',
            'release-function-version',
            // 'register-existing-function-repository',
          ],
        },
        {
          title: 'Resources',
          collapsable: false,
          children: [
            'demos',
            'frequently-asked-questions',
            'feedback',
            'roadmap',
            'troubleshooting',
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
                    'rendering-pipeline-api/progressive-pipeline-api'
                  ]
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
      '/workspaces/': [
        {
          sidebarDepth: 0,
          title: 'Workspace Docs 👩‍🏭',
          collapsable: false,
          children: ['', 'welcome-to-workspaces', 'getting-started'],
        },
        {
          title: 'Refererences',
          sidebarDepth: 1,
          collapsable: false,
          children: [
            'projects',
            'members',
            'roles',
            'workspaces-for-companies',
            'billing',
            'sso',
            'data-sovereignty',
          ],
        },

        {
          title: 'Resources',
          collapsable: false,
          children: ['faqs'],
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
