import { Text, View } from '@/components/Themed'
import { useFetchWithRefresh } from '@/hooks/useFetchWithRefresh'
import { useEffect, useState } from 'react'
import { Button, StyleSheet } from 'react-native'
import { useSession } from '../../../ctx'

export default function TabOneScreen() {
  const { fetchData, loading, error } = useFetchWithRefresh()
  const [userInfo, setUserInfo] = useState(null)
  const {
    signOut,
    access_token,
  } = useSession()

  useEffect(() => {
    fetchData('/userinfo').then(data => {
      if (data) setUserInfo(data)
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      {loading && <Text>Loading user info...</Text>}
      {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}
      {userInfo ? (
        <>
          <Text>
            Welcome, {userInfo.name || userInfo.email || access_token}
          </Text>
          <Text>Email: {userInfo.email}</Text>
          <Text numberOfLines={5}>JWT: {userInfo.tokenReceived}</Text>
        </>
      ) : (
        !loading && <Text>Welcome, {access_token}</Text>
      )}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
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
