import { Image } from 'expo-image'
import { Platform, StyleSheet, TextInput } from 'react-native'

import { HelloWave } from '@/components/HelloWave'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

export default function HomeScreen() {
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
      ></TextInput>
      <TextInput
        secureTextEntry={true}
        placeholder="enter password"
        style={styles.input}
        placeholderTextColor="gray"
      ></TextInput>

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
      ></TextInput>
      <TextInput
        secureTextEntry={true}
        placeholder="enter password"
        style={styles.input}
        placeholderTextColor="gray"
      ></TextInput>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  input: {
    color: 'ivory',
    borderWidth: 1,
    borderColor: 'dimgray',
    paddingLeft: 10
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
