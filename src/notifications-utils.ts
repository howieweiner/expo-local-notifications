import * as Notifications from 'expo-notifications'
import { AndroidImportance } from 'expo-notifications'

function buildNotificationHandler(withSound = false) {
  return {
    shouldShowAlert: true,
    shouldPlaySound: withSound,
    shouldSetBadge: true,
  }
}

async function registerNotificationsHandler() {
  console.log('registering Notifications Handler')
  await Notifications.setNotificationChannelAsync('messages', {
    name: 'Messages',
    importance: AndroidImportance.MAX,
  })
}

function unregisterNotificationsHandler() {
  Notifications.setNotificationHandler(null)
}

const scheduleInstantLocalNotification = async (withSound = false) => {
  console.log('scheduling notification withSound: ' + withSound)

  const handler = { handleNotification: async () => buildNotificationHandler(withSound) }
  Notifications.setNotificationHandler(handler)

  const schedulingOptions = {
    content: {
      title: 'You have mail!',
    },
    trigger: null,
  }

  await Notifications.scheduleNotificationAsync(schedulingOptions)
}

export { registerNotificationsHandler, scheduleInstantLocalNotification, unregisterNotificationsHandler }
