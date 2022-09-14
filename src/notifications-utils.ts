import * as Notifications from 'expo-notifications'
import { AndroidImportance } from 'expo-notifications'

async function registerNotificationsHandler() {
  console.log('registering Notifications Handler')
  await Notifications.setNotificationChannelAsync('messages', {
    name: 'Messages',
    importance: AndroidImportance.MAX,
  })

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  })
}

function unregisterNotificationsHandler() {
  Notifications.setNotificationHandler(null)
}

const scheduleInstantLocalNotification = async () => {
  console.log('scheduling notification')
  // if no seconds provided, we pass a null trigger for an instant notification
  const schedulingOptions = {
    content: {
      title: 'You have mail!',
    },
    trigger: {
      seconds: 2,
      channelId: 'messages',
    },
  }

  await Notifications.scheduleNotificationAsync(schedulingOptions)
}

export { registerNotificationsHandler, scheduleInstantLocalNotification, unregisterNotificationsHandler }
