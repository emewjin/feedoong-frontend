import React, { forwardRef, type Dispatch, type SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { isBrowser } from 'react-device-detect'

import { getUserInfo, type UserProfile } from 'services/auth'
import { CACHE_KEYS } from 'services/cacheKeys'

import * as S from './TopNavBar.style'

import Icons from 'assets/icons'

interface Props {
  setShowSideBar: Dispatch<SetStateAction<boolean | null>>
}

const TopNavBar = forwardRef<HTMLDivElement, Props>(function TopNavBar(
  { setShowSideBar }: Props,
  ref
) {
  const router = useRouter()
  const { data: userProfile } = useQuery<UserProfile>(
    CACHE_KEYS.me,
    getUserInfo,
    {
      enabled: router.pathname !== '/introduce',
    }
  )
  const name = userProfile?.name
  const profileImageUrl = userProfile?.profileImageUrl

  return (
    <S.TopNavContainer ref={ref}>
      <S.LogoButton onClick={() => router.push('/')}>
        <S.LogoImage
          priority
          src={Icons.LogoDesktop}
          alt="close-icon"
          width={32}
          height={32}
        />
        <S.Feedoong>Feedoong</S.Feedoong>
      </S.LogoButton>

      {name ? (
        <S.MyPageButton onClick={() => router.push('/mypage/account')}>
          {isBrowser && <span>{`${name}님, 안녕하세요!`}</span>}
          {profileImageUrl && (
            <S.UserImage
              width={32}
              height={32}
              alt="프로필 사진"
              src={profileImageUrl}
              priority
            />
          )}
        </S.MyPageButton>
      ) : (
        <S.GoToSignUpButton onClick={() => router.push('/signup')}>
          시작하기
        </S.GoToSignUpButton>
      )}
    </S.TopNavContainer>
  )
})

export default TopNavBar
