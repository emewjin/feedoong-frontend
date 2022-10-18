import React, { useState } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import InfoRow from './InfoRow'
import Dialog from 'components/common/Dialog'
import * as S from './MyPageContainer.style'
import profile from 'store/atoms/profile'
import Cookies from 'js-cookie'

const MyPageContainer = () => {
  const [isOpenDeleteAccountModal, setIsOpenDeleteAccountModal] =
    useState(false)
  const { name, email } = useRecoilValue(profile)
  const resetProfile = useResetRecoilState(profile)

  const logoutAction = () => {
    Cookies.remove('token')
    resetProfile()
    window.location.href = '/'
  }

  return (
    <S.Container>
      <S.Contents>
        <S.PageTitle>내 정보</S.PageTitle>
        <S.BorderLine />
        <InfoRow title="로그인 계정" value={email} />
        <div style={{ marginBottom: '60px' }}>
          <InfoRow title="이름" value={name} />
        </div>
        <S.BorderLine />
        <S.ButtonWrap>
          <S.Button onClick={() => setIsOpenDeleteAccountModal(true)}>
            회원 탈퇴
          </S.Button>
          <S.Button onClick={() => logoutAction()}>로그아웃</S.Button>
        </S.ButtonWrap>
      </S.Contents>
      <Dialog isOpen={isOpenDeleteAccountModal}>
        <Dialog.Title>정말 탈퇴하시겠습니까?</Dialog.Title>
        <Dialog.Content>
          <p>
            탈퇴하시면 회원님의 모든 기록이 삭제됩니다.<br></br>삭제된 정보는
            복구할 수 없으니<br></br>신중하게 결정해주세요.
          </p>
        </Dialog.Content>
        <Dialog.Actions>
          <button onClick={() => setIsOpenDeleteAccountModal(false)}>
            취소
          </button>
          <button className="secondary">회원탈퇴</button>
        </Dialog.Actions>
      </Dialog>
    </S.Container>
  )
}

export default MyPageContainer
