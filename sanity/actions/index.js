import {useState} from 'react'
import {useToast} from '@sanity/ui'
import {SyncIcon} from '@sanity/icons'

export function MoveToWorkspace(context) {
  const client = context.getClient({
    dataset: context.dataset === 'development' ? 'production' : 'development',
    apiVersion: '2022-11-29',
  })
  return (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [syncing, setSyncing] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const toast = useToast()
    return {
      icon: SyncIcon,
      label:
        `${syncing ? 'Syncing' : 'Sync'} with ` +
        (context.dataset === 'development' ? 'production' : 'development'),
      onHandle: () => {
        client.createOrReplace(props.published || props.draft).then((res) => {
          setSyncing(true)
          toast.push({
            status: 'success',
            title: 'Document synced successfully.',
          })
          props.onComplete()
          setSyncing(false)
        })
      },
    }
  }
}
