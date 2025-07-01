// import { useState, useCallback } from 'react'
// import axios from 'axios'

// // Załóżmy, że masz setAccessToken i setRefreshToken z kontekstu lub storage
// export function useRefreshToken(
//   setAccessToken: (token: string | null) => void,
//   setRefreshToken: (token: string | null) => void
// ) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const refresh = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)

//     try {
//       // Jeśli używasz cookies z HttpOnly, to refresh token wysyła się automatycznie
//       // W mobilnym kliencie może być potrzebne dołożenie refresh tokena do nagłówka
//       const response = await axios.post(
//         '/auth/refresh-token',
//         {}, // pusty body
//         {
//           // z credentials jeśli cookies są na serwerze (web)
//           withCredentials: true,
//           // jeśli potrzebujesz wysłać refresh token w nagłówku (np. w mobilce)
//           // headers: { 'x-refresh-token': currentRefreshToken },
//         }
//       )

//       const { access_token } = response.data

//       if (access_token) {
//         setAccessToken(access_token)
//         // Jeśli refresh token jest też zwracany w body, możesz ustawić go tutaj:
//         // setRefreshToken(response.data.refresh_token);
//       } else {
//         throw new Error('Brak access tokena w odpowiedzi')
//       }
//     } catch (err: any) {
//       setError(err.message || 'Błąd odświeżania tokena')
//       setAccessToken(null)
//       setRefreshToken(null)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [setAccessToken, setRefreshToken])

//   return { refresh, isLoading, error }
// }
