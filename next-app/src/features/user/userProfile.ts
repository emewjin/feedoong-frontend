import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { getRefreshTokenFromCookie } from 'features/auth/token'
import type { UserProfile } from 'services/auth'
import { getUserInfo, getUserInfoByUsername } from 'services/auth'
import { CACHE_KEYS } from 'services/cacheKeys'

export const useGetUserProfile = (
  options: UseQueryOptions<UserProfile> = {}
) => {
  return useQuery<UserProfile>(CACHE_KEYS.me, getUserInfo, {
    enabled: !!getRefreshTokenFromCookie(),
    ...options,
  })
}

export const useGetUserProfileByUsername = (
  username: string,
  options: UseQueryOptions<UserProfile> = {}
) => {
  return useQuery<UserProfile>(
    [CACHE_KEYS.user, username],
    () => getUserInfoByUsername(username),
    { ...options }
  )
}

export const useGetUsernameFromPath = () => {
  const router = useRouter()

  return router.query.userName as string
}
