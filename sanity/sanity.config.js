import {netlifyTool} from '@akcybex/sanity-netlify-tool'
import '@akcybex/sanity-netlify-tool/dist/style.css'
import {colorInput} from '@sanity/color-input'
import {dashboardTool, projectInfoWidget} from '@sanity/dashboard'
import {visionTool} from '@sanity/vision'
import {defineConfig, definePlugin} from 'sanity'
import {netlifyWidget} from 'sanity-plugin-dashboard-widget-netlify'
import {media} from 'sanity-plugin-media'
import {structureTool} from 'sanity/structure'
import {MoveToWorkspace} from './actions'
import {structure} from './deskStructure'
import {schemaTypes} from './schemas'

const sharedConfig = definePlugin({
  name: 'default',
  document: {
    actions: (prev, context) => {
      return [...prev, MoveToWorkspace(context)]
    },
  },
  plugins: [structureTool({structure}), visionTool(), colorInput(), media()],
})

export default defineConfig([
  {
    name: 'default',
    title: 'Marlien Linkinbio',
    basePath: '/prod',
    projectId: 'q1h5np7y',
    dataset: 'production',

    plugins: [
      sharedConfig(),
      dashboardTool({
        widgets: [
          netlifyWidget({
            title: 'My Netlify deploys',
            sites: [
              {
                title: 'Marlien',
                apiId: 'fb5cb1f6-2de5-44fe-9fcf-af6f4158e5c6',
                buildHookId: '66994fcd52b08922dec88253',
                name: 'marlien',
                url: 'https://marlien.netlify.app/',
                branch: 'main',
              },
            ],
          }),
          projectInfoWidget(),
        ],
      }),
    ],
    tools: [
      netlifyTool({
        accessToken: (import.meta.env || process.env).SANITY_STUDIO_NETLIFY_ACCESS_TOKEN,
        siteId: (import.meta.env || process.env).SANITY_STUDIO_NETLIFY_SITE_ID,
      }),
    ],
    schema: {
      types: schemaTypes,
    },
  },
  {
    name: 'dev',
    title: 'Marlien Linkinbio Dev',
    basePath: '/dev',
    projectId: 'q1h5np7y',
    dataset: 'development',

    plugins: [
      sharedConfig(),
      dashboardTool({
        widgets: [
          netlifyWidget({
            title: 'My Netlify deploys',
            sites: [
              {
                title: 'Marlien Dev',
                apiId: 'fb5cb1f6-2de5-44fe-9fcf-af6f4158e5c6',
                buildHookId: '66a10aa7e83d7c376d1b6ad6',
                name: 'marlien-dev',
                url: 'https://experiment--marlien.netlify.app',
                branch: 'experiment',
              },
            ],
          }),
          projectInfoWidget(),
        ],
      }),
    ],

    schema: {
      types: schemaTypes,
    },
  },
])
