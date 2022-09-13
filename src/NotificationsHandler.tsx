import { PermissionStatus } from 'expo-modules-core'
import * as Notifications from 'expo-notifications'
import { useEffect, useState } from 'react'

import { registerNotificationsHandler, unregisterNotificationsHandler } from './notifications-utils'

export default function NotificationsHandler() {
  const [notificationPermissions, setNotificationPermissions] = useState<PermissionStatus>(
    PermissionStatus.UNDETERMINED
  )

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync()
    setNotificationPermissions(status)
  }

  useEffect(() => {
    console.log('requesting notifications permissions')
    requestNotificationPermissions()
  }, [])

  useEffect(() => {
    if (notificationPermissions !== PermissionStatus.GRANTED) return

    console.log('registering notifications handler')
    registerNotificationsHandler()

    return () => {
      console.log('unregistering notifications handler')
      unregisterNotificationsHandler()
    }
  }, [notificationPermissions])
  return null
}
