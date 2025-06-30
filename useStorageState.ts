// import { useEffect, useCallback, useReducer } from 'react'
// import * as SecureStore from 'expo-secure-store'
// import { Platform } from 'react-native'

// type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void]

// function useAsyncState<T>(
//   initialValue: [boolean, T | null] = [true, null]
// ): UseStateHook<T> {
//   return useReducer(
//     (
//       state: [boolean, T | null],
//       action: T | null = null
//     ): [boolean, T | null] => [false, action],
//     initialValue
//   ) as UseStateHook<T>
// }

// // Funkcja do parsowania payload JWT i pobrania exp
// function getJwtExpiry(token: string): number | null {
//   try {
//     const base64Payload = token.split('.')[1]
//     const payloadJson = atob(base64Payload)
//     const payload = JSON.parse(payloadJson)
//     return payload.exp ?? null
//   } catch {
//     return null
//   }
// }

// export async function setStorageItemAsync(key: string, value: string | null) {
//   if (Platform.OS === 'web') {
//     try {
//       if (value === null) {
//         // Usuń cookie
//         document.cookie = `${key}=; Max-Age=0; path=/;`
//       } else {
//         // Oblicz maxAge na podstawie JWT exp
//         let maxAge = 60 * 15 // domyślnie 15 minut
//         const exp = getJwtExpiry(value)
//         if (exp) {
//           const now = Math.floor(Date.now() / 1000)
//           const calculatedMaxAge = exp - now
//           if (calculatedMaxAge > 0) {
//             maxAge = calculatedMaxAge
//           }
//         }
//         document.cookie = `${key}=${value}; Max-Age=${maxAge}; path=/;`
//       }
//     } catch (e) {
//       console.error('Local storage is unavailable:', e)
//     }
//   } else {
//     if (value == null) {
//       await SecureStore.deleteItemAsync(key)
//     } else {
//       await SecureStore.setItemAsync(key, value)
//     }
//   }
// }

// export function useStorageState(key: string): UseStateHook<string> {
//   const [state, setState] = useAsyncState<string>()

//   useEffect(() => {
//     if (Platform.OS === 'web') {
//       try {
//         const cookieValue = document.cookie
//           .split('; ')
//           .find(row => row.startsWith(`${key}=`))
//           ?.split('=')[1]
//         setState(cookieValue || null)
//       } catch (e) {
//         console.error('Local storage is unavailable:', e)
//       }
//     } else {
//       SecureStore.getItemAsync(key).then(value => {
//         setState(value)
//       })
//     }
//   }, [key])

//   const setValue = useCallback(
//     (value: string | null) => {
//       setState(value)
//       setStorageItemAsync(key, value)
//     },
//     [key]
//   )

//   return [state, setValue]
// }
