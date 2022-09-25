import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router'

import * as S from './TopNavBar.style'
import Icons from 'assets/icons'

interface Props {
  openSideBar: () => void
}

const TopNavBar = ({ openSideBar }: Props) => {
  const router = useRouter()

  return (
    <S.TopNavContainer>
      <S.MenuButton onClick={openSideBar}>
        <div style={{ marginRight: '10px' }}>
          <Image
            priority
            src={Icons.MenuIcon}
            alt="close-icon"
            width="12"
            height="12"
          />
        </div>
        MENU
      </S.MenuButton>
      <S.Feedoong onClick={() => router.push('/')}>Feedoong</S.Feedoong>
      <S.MyPageButton onClick={() => router.push('/myPage')}>
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: 'pink',
            marginRight: '8px',
          }}
        ></div>
        홍길동
      </S.MyPageButton>
    </S.TopNavContainer>
  )
}

export default TopNavBar
