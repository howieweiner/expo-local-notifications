import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { scheduleInstantLocalNotification } from './src/notifications-utils'
import NotificationsHandler from './src/NotificationsHandler'
import useAppState from './src/useAppState'

export default function App() {
  const { isActive } = useAppState()

  const sendNotification = (withSound = false) => {
    if (!isActive) {
      console.log('App is not in foreground. Not sending notification')
      return
    }

    scheduleInstantLocalNotification(withSound)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NotificationsHandler />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => sendNotification()} style={styles.button}>
          <Text style={styles.text}>Notification without sound</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sendNotification(true)} style={styles.button}>
          <Text style={styles.text}>Notification with sound</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    display: 'flex',
  },
  button: {
    backgroundColor: 'darkslategray',
    padding: 8,
    margin: 8,
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
})
