// /app/login
// import { Text as ThemedText } from '@/components/ThemedText'
// import { ThemedView } from '@/components/ThemedView'
import { View } from '@/components/Themed'
import { API_URL } from '@/constants/url'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  TextInput,
  Text as ThemedText,
  View as ThemedView
} from 'react-native'
import { useSession } from '../ctx'

export default function Login() {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const { signIn } = useSession()

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })

      const data = await response.json()
      const authHeader = response.headers.get('Authorization') // 'Bearer <token>'
      const access_token = authHeader?.split(' ')[1]
      const refresh_token = data.refresh_token

      if (!response.ok) {
        Alert.alert('Login failed', data.message || 'Unknown error')
        return
      }

      // Zapisz token i ustaw sesję w kontekście
      await signIn(access_token!, refresh_token!)

      Alert.alert('Success', 'Logged in!')
      router.replace('/')
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        <ThemedText style={styles.title}>Sign In</ThemedText>
        <TextInput
          placeholder="Enter email"
          autoComplete="email"
          style={styles.input}
          placeholderTextColor="#aaa"
          onChangeText={setLoginEmail}
          value={loginEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Enter password"
          style={styles.input}
          placeholderTextColor="#aaa"
          onChangeText={setLoginPassword}
          value={loginPassword}
        />
        <ThemedView style={styles.button}>
          <Button title="Sign In" onPress={handleLogin} color="#4A90E2" />
        </ThemedView>
      </View>

      <ThemedView style={styles.orContainer}>
        <ThemedText style={styles.orText}>OR</ThemedText>
      </ThemedView>

      <View style={styles.box}>
        <ThemedText style={styles.title}>Register</ThemedText>
        <TextInput
          placeholder="Enter email"
          autoComplete="email"
          style={styles.input}
          placeholderTextColor="#aaa"
          onChangeText={setRegisterEmail}
          value={registerEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Enter password"
          style={styles.input}
          placeholderTextColor="#aaa"
          onChangeText={setRegisterPassword}
          value={registerPassword}
        />
        <ThemedView style={styles.button}>
          <Button title="Register" onPress={handleRegister} color="#4A90E2" />
        </ThemedView>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#fefefe', // jasne tło
  },
  box: {
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#222', // ciemny tekst
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    color: '#222',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    borderRadius: 6,
    overflow: 'hidden',
  },
  orContainer: {
    marginBottom: 30,
    opacity: 0.5,
  },
  orText: {
    textAlign: 'center',
    color: '#444',
    fontWeight: '600',
    fontSize: 18,
  },
})
