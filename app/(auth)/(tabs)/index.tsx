import { Text, View } from '@/components/Themed'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, StyleSheet } from 'react-native'
import { useSession } from '../../../ctx'

export default function TabOneScreen() {
  const {
    signOut,
    access_token,
    refresh_token,
    setAccessToken,
    setRefreshToken,
  } = useSession()

  const [userInfo, setUserInfo] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function refreshTokens() {
    try {
      const response = await axios.post('http://localhost:3000/refresh', {
        // access_token,
        refresh_token,
      })

      const { access_token: newAccessToken, refresh_token: newRefreshToken } =
        response.data

      if (!newAccessToken || !newRefreshToken) {
        throw new Error('Brak tokenów w odpowiedzi')
      }

      setAccessToken(newAccessToken)
      setRefreshToken(newRefreshToken)

      return true
    } catch (err) {
      console.error('Refresh token error:', err)
      signOut()
      return false
    }
  }

  async function fetchUserInfo() {
    setLoading(true) // ustawiamy loading na true na początku
    try {
      const response = await axios.get('http://localhost:3000/userinfo', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      })

      setUserInfo(response.data)
      setError(null)
    } catch (err: any) {
      if (err.response?.status === 401) {
        // access_token wygasł, próbujemy odświeżyć
        const refreshed = await refreshTokens()
        if (refreshed) {
          try {
            // ponawiamy zapytanie z nowym tokenem
            const retryResponse = await axios.get(
              'http://localhost:3000/userinfo',
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                  'Content-Type': 'application/json',
                },
              }
            )
            setUserInfo(retryResponse.data)
            setError(null)
          } catch (retryErr: any) {
            setError(retryErr.response?.data?.message || retryErr.message)
            setUserInfo(null)
          }
        } else {
          setError('Sesja wygasła, zaloguj się ponownie')
          setUserInfo(null)
        }
      } else {
        // inne błędy niż 401
        setError(err.response?.data?.message || err.message)
        setUserInfo(null)
      }
    } finally {
      setLoading(false) // wyłączamy loading dopiero po całej obsłudze błędu i odświeżeniu
    }
  }
  
  

  useEffect(() => {
    // setLoading(true)
    fetchUserInfo()
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
