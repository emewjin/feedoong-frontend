import axios, { type AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

import { getApiEndpoint } from 'envs'
import api from 'services/api'
import { AccessToken, RefreshToken } from 'constants/auth'

export interface UserProfile {
  email: string
  name: string
  profileImageUrl: string
}

export interface SignUpResponse extends UserProfile {
  accessToken: string
  refreshToken: string
}

export const submitAccessToken = (token: string) => {
  return api.post<null, SignUpResponse>(`/users/login/google`, null, {
    params: { accessToken: token },
  })
}

export const getUserInfo = () => {
  return api.get<null, UserProfile>(`/users/me`)
}

export const getUserInfoServerSide = (_api: AxiosInstance) => () => {
  return _api.get<null, UserProfile>(`/users/me`)
}

export const refreshAccessToken = async (axiosError: AxiosError) => {
  const originalRequest = axiosError.config
  const refreshToken = Cookies.get(RefreshToken)

  // TODO: 리프레시 토큰 만료시 로그아웃 처리도 필요
  const { data } = await axios.post<
    SignUpResponse['refreshToken'],
    AxiosResponse<SignUpResponse>
  >(getApiEndpoint() + `/users/token`, {
    refreshToken,
  })

  const newAccessToken = data.accessToken
  const newRefreshToken = data.refreshToken

  Cookies.set(AccessToken, newAccessToken)
  Cookies.set(RefreshToken, newRefreshToken)

  api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`
  originalRequest.headers!.Authorization = `Bearer ${newAccessToken}`
  console.log({ newAccessToken, newRefreshToken })
  // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
  return api(originalRequest)
}
