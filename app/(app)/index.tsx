import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useSession } from '../../ctx'
import { router } from 'expo-router'

export default function ProfileScreen() {
  const { signOut, session } = useSession()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profil użytkownika</Text>

      {session && <Text style={styles.token}>JWT token: {session}</Text>}

      <Button
        title="Wyloguj się"
        onPress={() => {
          signOut()
          router.replace('/sign-in') // Możesz też użyć router.push w razie potrzeby
        }}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    textAlign: 'center',
  },
  token: {
    fontSize: 14,
    marginBottom: 20,
    color: '#555',
    textAlign: 'center',
  },
})
