import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { scheduleInstantLocalNotification } from './src/notifications-utils'
import NotificationsHandler from './src/NotificationsHandler'
import useAppState from './src/useAppState'

export default function App() {
  const { isActive } = useAppState()

  const sendNotification = () => {
    if (!isActive) {
      console.log('App is not in foreground. Not sending notification')
      return
    }

    scheduleInstantLocalNotification().then(() => {
      console.log('scheduled instant local notification')
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NotificationsHandler />
      <TouchableOpacity onPress={sendNotification} style={styles.button}>
        <Text style={styles.text}>Create a notification</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 4,
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
})
