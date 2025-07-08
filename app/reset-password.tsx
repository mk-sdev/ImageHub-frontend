import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function ResetPassword() {
  const { token } = useLocalSearchParams<{ token: string }>()

  return (
    <View
      style={{
        backgroundColor: 'ivory',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Reset password screen</Text>
      <Text>Token: {token}</Text>
    </View>
  )
}
