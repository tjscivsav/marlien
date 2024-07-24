import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'q1h5np7y',
    dataset: 'production',
  },
  graphql: [
    {
      workspace: 'default',
    },
    {
      workspace: 'dev',
    },
  ],
})
