import React from 'react'
import { useStorageState } from './hooks/useStorageState'
import axios from 'axios'
import { API_URL } from './constants/url'

const AuthContext = React.createContext<{
  signIn: (access_token: string, refresh_token: string) => void
  signOut: () => void
  setAccessToken: (access_token: string | null) => void
  setRefreshToken: (refresh_token: string | null) => void
  access_token?: string | null
  refresh_token?: string | null
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  setAccessToken: () => null,
  setRefreshToken: () => null,
  access_token: null,
  refresh_token: null,
  isLoading: false,
})

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />')
    }
  }

  return value
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, access_token], setAccessToken] =
    useStorageState('access_token')
  const [[, refresh_token], setRefreshToken] = useStorageState('refresh_token')

  return (
    <AuthContext.Provider
      value={{
        signIn: (newAccessToken, newRefreshToken) => {
          setAccessToken(newAccessToken)
          setRefreshToken(newRefreshToken)
        },
        signOut: async () => {
          try {
            if (refresh_token) {
              await axios.patch(`${API_URL}/logout`, {
                refresh_token,
              })
            }
          } catch (err) {
            console.warn('Błąd przy wylogowywaniu:', err)
          } finally {
            setAccessToken(null)
            setRefreshToken(null)
          }
        },
        setAccessToken,
        setRefreshToken,
        access_token,
        refresh_token,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
