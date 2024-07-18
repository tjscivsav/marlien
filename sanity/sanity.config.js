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
              title: 'Meleana',
              apiId: 'e6012937-3e1e-4752-a43e-461815821a87',
              buildHookId: '668fb92779a085213d82a3b2',
              name: 'meleana',
              url: 'https://meleana.netlify.app/',
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
