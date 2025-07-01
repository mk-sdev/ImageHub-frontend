import React from 'react'
import { useStorageState } from './useStorageState'

const AuthContext = React.createContext<{
  signIn: (access_token: string, refresh_token: string) => void
  signOut: () => void
  access_token?: string | null
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  access_token: null,
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
  const [[isLoading, session], setAccessSession] =
    useStorageState('access_token')
  const [[], setRefreshSession] = useStorageState('refresh_token')
  return (
    <AuthContext.Provider
      value={{
        signIn: (access_token, refresh_token) => {
          // Add your login logic here
          // For example purposes, we'll just set a fake session in storage
          //This likely would be a JWT token or other session data
          setAccessSession(access_token)
          setRefreshSession(refresh_token)
        },
        signOut: () => {
          setAccessSession(null)
          setRefreshSession(null)
        },
        access_token: session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
