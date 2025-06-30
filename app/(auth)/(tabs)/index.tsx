import { Button, StyleSheet } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import { useSession } from '../../ctx'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function TabOneScreen() {
  const { signOut, session } = useSession()
  const [userInfo, setUserInfo] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!session) return

    setLoading(true)
    axios
      .get('http://localhost:3000/userinfo', {
        headers: {
          Authorization: `Bearer ${session}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        setUserInfo(response.data)
        setError(null)
      })
      .catch(err => {
        setError(err.response?.data?.message || err.message)
        setUserInfo(null)
      })
      .finally(() => setLoading(false))
  }, [session])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      {loading && <Text>Loading user info...</Text>}
      {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}
      {userInfo ? (
        <>
          <Text>Welcome, {userInfo.name || userInfo.email || session}</Text>
          <Text>Email: {userInfo.email}</Text>
          <Text numberOfLines={5}>JWT: {userInfo.tokenReceived}</Text>
        </>
      ) : (
        !loading && <Text>Welcome, {session}</Text>
      )}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(auth)/(tabs)/index.tsx" />
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
