import { Image } from 'expo-image'
import { Platform, StyleSheet, TextInput } from 'react-native'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useState } from 'react'
import { Alert, Button } from 'react-native'

export default function HomeScreen() {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  const API_URL =
    Platform.OS === 'web' ? 'http://localhost:3000' : 'http://192.168.1.30:3000'

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        Alert.alert('Login failed', data.message || 'Unknown error')
        return
      }

      Alert.alert('Success', 'Logged in!')
      console.log('Access token:', data.access_token)
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'Something went wrong.')
    }
  }

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: registerEmail,
          password: registerPassword,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        console.log('first')
        Alert.alert('Registration failed', data.message || 'Unknown error')
        return
      }

      Alert.alert('Success', 'Registered successfully!')
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'Something went wrong.')
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedText>Login</ThemedText>
      <TextInput
        placeholder="enter email"
        autoComplete="email"
        style={styles.input}
        placeholderTextColor="gray"
        onChangeText={setLoginEmail}
        value={loginEmail}
      ></TextInput>
      <TextInput
        secureTextEntry={true}
        placeholder="enter password"
        style={styles.input}
        placeholderTextColor="gray"
        onChangeText={setLoginPassword}
        value={loginPassword}
      ></TextInput>
      <Button title="Login" onPress={handleLogin} />

      <ThemedView
        style={{
          // borderBottomColor: 'dimgray',
          // borderBottomWidth: 1,
          // paddingBottom: 5,
          // width: '100%',
          // height: 10,
          marginTop: 30,
          opacity: 0.5,
        }}
      >
        <ThemedText style={{ textAlign: 'center' }}>OR</ThemedText>
      </ThemedView>

      <ThemedText>Register</ThemedText>
      <TextInput
        placeholder="enter email"
        autoComplete="email"
        style={styles.input}
        placeholderTextColor="gray"
        onChangeText={setRegisterEmail}
        value={registerEmail}
      ></TextInput>
      <TextInput
        secureTextEntry={true}
        placeholder="enter password"
        style={styles.input}
        placeholderTextColor="gray"
        onChangeText={setRegisterPassword}
        value={registerPassword}
      ></TextInput>
      <Button title="Register" onPress={handleRegister} />
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  input: {
    color: 'ivory',
    borderWidth: 1,
    borderColor: 'dimgray',
    paddingLeft: 10,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
