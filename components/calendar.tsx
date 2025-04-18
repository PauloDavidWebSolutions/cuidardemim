'use client'

import { useCallback, useEffect } from 'react'

import { useUser } from '@clerk/nextjs'
import Cal, { getCalApi } from '@calcom/embed-react'
import { useTheme } from 'next-themes'

export default function Calendar({
  namespace,
  calLink
}: {
  namespace: string
  calLink: string
}) {
  const { user } = useUser()
  const email = user?.emailAddresses[0].emailAddress
  const name = user?.fullName

  const { resolvedTheme } = useTheme()

  const init = useCallback(
    async function (namespace: string) {
      const cal = await getCalApi({
        namespace: namespace
      })

      cal('ui', {
        theme: resolvedTheme === 'dark' ? 'dark' : 'light',
        styles: { branding: { brandColor: '#000000' } },
        hideEventTypeDetails: false,
        layout: 'month_view'
      })
    },
    [resolvedTheme]
  )

  useEffect(() => {
    init(namespace)
  }, [init, namespace])

  return (
    <Cal
      calLink={calLink}
      namespace={namespace}
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      config={{
        theme: resolvedTheme === 'dark' ? 'dark' : 'light',
        layout: 'month_view',
        ...(name ? { name: name } : {}),
        ...(email ? { email: email } : {})
      }}
    />
  )
}
