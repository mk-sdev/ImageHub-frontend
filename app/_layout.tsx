// app/_layout
import { useColorScheme } from '@/hooks/useColorScheme'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { Stack } from 'expo-router'
import { SessionProvider, useSession } from '@/ctx'
import { SplashScreenController } from '../splash'

export default function Root() {
  const colorScheme = useColorScheme()

  // Set up the auth context and render our layout inside of it.
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SessionProvider>
        <SplashScreenController />
        <RootNavigator />
      </SessionProvider>
    </ThemeProvider>
  )
}

// Separate this into a new component so it can access the SessionProvider context later
/* Keep the code the same above, just edit the RootNavigator */

function RootNavigator() {
  const { session } = useSession()

  return (
    <Stack>
      <Stack.Protected guard={session}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="sign-in" />
      </Stack.Protected>
    </Stack>
  )
}
