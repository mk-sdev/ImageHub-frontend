import { Text, View } from '@/components/Themed'
import { useFetchWithRefresh } from '@/hooks/useFetchWithRefresh'
import { useEffect, useState } from 'react'
import { Button, ScrollView, StyleSheet, TextInput } from 'react-native'
import { useSession } from '../../../ctx'

export default function TabOneScreen() {
  const { fetchData, loading, error } = useFetchWithRefresh()
  const [userInfo, setUserInfo] = useState(null)
  const { signOut, access_token } = useSession()

  const [newEmail, setNewEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [newPassword, setNewPassword] = useState<string>()

  function changeEmail() {
    fetchData('/change-email', {
      method: 'PATCH',
      data: { newEmail, password },
    })
  }

  function changePassword() {
    fetchData('/change-password', {
      method: 'PATCH',
      data: { password, newPassword },
    })
  }

  function deleteAccount() {
    fetchData('/delete-account', {
      method: 'DELETE',
      data: { password },
    })
  }

  useEffect(() => {
    fetchData('/userinfo').then(data => {
      if (data) setUserInfo(data)
    })
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <View style={{ gap: 15, width: '30%', backgroundColor: 'transparent' }}>
        <Text style={styles.title}>Change Email</Text>

        <TextInput
          placeholder="Enter new email"
          autoComplete="email"
          style={styles.input}
          placeholderTextColor="#aaa"
          onChangeText={setNewEmail}
          value={newEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Enter current password"
          style={styles.input}
          placeholderTextColor="#aaa"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Button title="Change Email" onPress={() => changeEmail()} />
        <Text style={styles.title}>Change Password</Text>

        <TextInput
          placeholder="Enter current password"
          style={styles.input}
          placeholderTextColor="#aaa"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Enter new password"
          style={styles.input}
          placeholderTextColor="#aaa"
          onChangeText={setNewPassword}
          value={newPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Button title="Change Password" onPress={() => changePassword()} />
        <Text style={styles.title}>Delete Account</Text>

        <TextInput
          placeholder="Enter current password"
          style={styles.input}
          placeholderTextColor="#aaa"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Button title="Delete account" onPress={() => deleteAccount()} />
        <Button title="Sign Out" onPress={() => signOut()} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    color: '#222',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
})
