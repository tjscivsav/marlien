import {colorInput} from '@sanity/color-input'
import {dashboardTool, projectInfoWidget} from '@sanity/dashboard'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {netlifyWidget} from 'sanity-plugin-dashboard-widget-netlify'
import {media} from 'sanity-plugin-media'
import {structureTool} from 'sanity/structure'
import {structure} from './deskStructure'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Marlien Linkinbio',

  projectId: 'q1h5np7y',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    colorInput(),
    media(),
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
})
