import { useState, useCallback } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { useSession } from '../ctx'
import { API_URL } from '@/constants/url'

export function useFetchWithRefresh() {
  const {
    access_token,
    refresh_token,
    setAccessToken,
    setRefreshToken,
    signOut,
  } = useSession()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function refreshTokens() {
    try {
      const response = await axios.patch(API_URL + '/refresh', {
        refresh_token,
      })

      const { access_token: newAccessToken, refresh_token: newRefreshToken } =
        response.data

      if (!newAccessToken || !newRefreshToken) {
        throw new Error('Brak tokenów w odpowiedzi')
      }

      setAccessToken(newAccessToken)
      setRefreshToken(newRefreshToken)

      return { newAccessToken, newRefreshToken }
    } catch (err) {
      console.error('Refresh token error:', err)
      signOut()
      return null
    }
  }

  const fetchData = useCallback(
    async (
      route: string,
      config: AxiosRequestConfig = {}
    ): Promise<any | null> => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios({
          url: API_URL + route, // POPRAWKA: tu musi być klucz url
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
            ...config.headers,
          },
          ...config,
        })
        setLoading(false)
        return response.data
      } catch (err: any) {
        if (err.response?.status === 401) {
          // Odśwież tokeny i spróbuj ponownie
          const tokens = await refreshTokens()
          if (tokens) {
            try {
              const retryResponse = await axios({
                url: API_URL + route, // POPRAWIONE - wcześniej było "url" nie zdefiniowane
                headers: {
                  Authorization: `Bearer ${tokens.newAccessToken}`,
                  'Content-Type': 'application/json',
                  ...config.headers,
                },
                ...config,
              })
              setLoading(false)
              return retryResponse.data
            } catch (retryErr: any) {
              setError(retryErr.response?.data?.message || retryErr.message)
              setLoading(false)
              return null
            }
          } else {
            setError('Sesja wygasła, zaloguj się ponownie')
            setLoading(false)
            return null
          }
        } else {
          setError(err.response?.data?.message || err.message)
          setLoading(false)
          return null
        }
      }
    },
    [access_token, refresh_token]
  )

  return { fetchData, loading, error }
}
